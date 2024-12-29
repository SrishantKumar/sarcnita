import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, Clock, Filter } from 'lucide-react';
import PostCard from '../components/nitagram/PostCard';
import CreatePostModal from '../components/nitagram/CreatePostModal';
import SpacesSidebar from '../components/nitagram/SpacesSidebar';
import { fadeInUp, staggerContainer } from '../components/animations/variants';

const samplePosts = [
  {
    id: 1,
    author: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      role: 'Alumni (2020)',
      company: 'Google',
    },
    content: 'Excited to share that I\'ll be conducting a workshop on AI/ML next month at NIT Agartala! Looking forward to meeting the bright minds.',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1600',
    likes: 245,
    comments: 32,
    space: 'Events',
    timestamp: '2h ago',
  },
  {
    id: 2,
    author: {
      name: 'Sarah Smith',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
      role: 'Student',
      branch: 'CSE, 4th Year',
    },
    content: 'Just completed my internship at Microsoft! Here are some key learnings and tips for juniors preparing for internships.',
    likes: 189,
    comments: 45,
    space: 'Placements',
    timestamp: '5h ago',
  },
];

const Nitagram: React.FC = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [activeSpace, setActiveSpace] = useState('All');
  const [sortBy, setSortBy] = useState<'trending' | 'recent'>('trending');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 pt-20 pb-12"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar - Spaces */}
          <div className="md:w-64 flex-shrink-0">
            <SpacesSidebar activeSpace={activeSpace} onSpaceChange={setActiveSpace} />
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts, spaces, or users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSortBy('trending')}
                    className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                      sortBy === 'trending'
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Trending
                  </button>
                  <button
                    onClick={() => setSortBy('recent')}
                    className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                      sortBy === 'recent'
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    Recent
                  </button>
                </div>

                <motion.button
                  onClick={() => setIsCreatePostOpen(true)}
                  className="bg-blue-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Post
                </motion.button>
              </div>
            </div>

            {/* Posts */}
            <motion.div 
              className="space-y-6"
              variants={staggerContainer}
            >
              {samplePosts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={fadeInUp}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Sidebar - Trending Topics */}
          <div className="md:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-lg font-semibold mb-4">Trending Topics</h3>
              <div className="space-y-3">
                {['Placements 2024', 'Tech Fest', 'Alumni Meet', 'Research Papers'].map((topic) => (
                  <motion.div
                    key={topic}
                    className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <h4 className="font-medium text-gray-900">{topic}</h4>
                    <p className="text-sm text-gray-600">32 posts</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {isCreatePostOpen && (
          <CreatePostModal onClose={() => setIsCreatePostOpen(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Nitagram;
