import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Loader2 } from 'lucide-react';
import PostCard from '../components/nitagram/PostCard';
import CreatePostModal from '../components/nitagram/CreatePostModal';
import { useAuth } from '../context/AuthContext';
import { useNitagramPosts } from '../hooks/useNitagramPosts';

const Nitagram: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, profile } = useAuth();
  const { posts, loading: isLoading, error, createPost, deletePost, likePost, addComment } = useNitagramPosts();

  const handleLike = async (postId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    await likePost(postId);
  };

  const handleComment = async (postId: string, content: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    await addComment(postId, content);
  };

  const handleDelete = async (postId: string, postUserId: string) => {
    if (!user) return;
    if (user.id !== postUserId && profile?.role !== 'admin') return;

    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      await deletePost(postId);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nitagram</h1>
            <p className="text-gray-600 mt-1">Share your moments with the NITA community</p>
          </div>
          {user && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-900 text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-colors shadow-sm"
            >
              <Plus className="h-5 w-5" />
              <span>Create Post</span>
            </motion.button>
          )}
        </div>

        {/* Posts Grid */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-900" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600">
                {user
                  ? "Be the first one to share a post!"
                  : "Log in to start sharing your moments"}
              </p>
            </div>
          ) : (
            <motion.div
              initial={false}
              className="space-y-6"
            >
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <PostCard
                    post={post}
                    currentUser={user}
                    onLike={handleLike}
                    onComment={handleComment}
                    onDelete={handleDelete}
                    profile={profile}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <CreatePostModal
            onClose={() => setIsModalOpen(false)}
            onCreatePost={createPost}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Nitagram;
