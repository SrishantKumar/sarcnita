import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, Clock, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import PostCard from '../components/nitagram/PostCard';
import CreatePostModal from '../components/nitagram/CreatePostModal';
import { fadeInUp } from '../components/animations/variants';
import { useAuth } from '../context/AuthContext';
import { useNitagramPosts } from '../hooks/useNitagramPosts';
import { Post } from '../lib/supabase';

const Nitagram: React.FC = () => {
  const { user, profile } = useAuth();
  const { posts, loading, error, createPost, deletePost, likePost, addComment } = useNitagramPosts();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'trending' | 'recent'>('recent');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLike = async (postId: string) => {
    if (!user) {
      const shouldLogin = window.confirm('Please log in to like posts. Would you like to log in now?');
      if (shouldLogin) {
        window.location.href = '/auth';
      }
      return;
    }
    await likePost(postId);
  };

  const handleComment = async (postId: string, content: string) => {
    if (!user) {
      const shouldLogin = window.confirm('Please log in to comment on posts. Would you like to log in now?');
      if (shouldLogin) {
        window.location.href = '/auth';
      }
      return;
    }
    await addComment(postId, content);
  };

  const filteredPosts = posts
    .filter(post => {
      if (!searchQuery) return true;
      return post.content.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      const aEngagement = (a.likes_count || 0) + (a.comments_count || 0);
      const bEngagement = (b.likes_count || 0) + (b.comments_count || 0);
      return bEngagement - aEngagement;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-900">NITAGRAM</h1>
        </div>
      </div>

      {/* Main Content with proper padding for fixed header */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Search and Sort Bar */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>

                {/* Sort Options */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSortBy('trending')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      sortBy === 'trending'
                        ? 'bg-blue-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <TrendingUp className="h-5 w-5" />
                    <span className="hidden sm:inline">Trending</span>
                  </button>
                  <button
                    onClick={() => setSortBy('recent')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      sortBy === 'recent'
                        ? 'bg-blue-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Clock className="h-5 w-5" />
                    <span className="hidden sm:inline">Recent</span>
                  </button>
                </div>
              </div>

              {user && (
                <div className="mt-4">
                  <button
                    onClick={() => setIsCreatePostOpen(true)}
                    className="w-full bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    Create Post
                  </button>
                </div>
              )}

              {!user && (
                <div className="mt-4 bg-blue-50 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-blue-900 text-center sm:text-left">Log in to create posts, like, and comment!</p>
                  <Link
                    to="/auth"
                    className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap"
                  >
                    <LogIn className="h-5 w-5" />
                    Log In
                  </Link>
                </div>
              )}
            </div>

            {/* Posts */}
            {error ? (
              <div className="text-center text-red-500 p-4 bg-red-50 rounded-xl">
                <p>Error loading posts: {error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Retry
                </button>
              </div>
            ) : loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center text-gray-500 bg-white p-8 rounded-xl shadow-md">
                No posts found
              </div>
            ) : (
              <motion.div 
                className="space-y-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {filteredPosts.map((post: Post) => (
                  <motion.div key={post.id} variants={fadeInUp}>
                    <PostCard
                      post={post}
                      onLike={handleLike}
                      onComment={handleComment}
                      onDelete={profile?.role === 'admin' ? deletePost : undefined}
                      currentUser={user}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {isCreatePostOpen && (
        <CreatePostModal
          onClose={() => setIsCreatePostOpen(false)}
          onCreate={createPost}
        />
      )}
    </div>
  );
};

export default Nitagram;
