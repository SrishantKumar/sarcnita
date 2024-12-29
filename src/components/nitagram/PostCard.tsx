import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, MoreVertical, Send } from 'lucide-react';
import { cardHover } from '../animations/variants';

interface Author {
  name: string;
  avatar: string;
  role: string;
  company?: string;
  branch?: string;
}

interface Post {
  id: number;
  author: Author;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  space: string;
  timestamp: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden"
      variants={cardHover}
      initial="initial"
      whileHover="hover"
    >
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.img
            src={post.author.avatar}
            alt={post.author.name}
            className="h-10 w-10 rounded-full object-cover"
            whileHover={{ scale: 1.1 }}
          />
          <div>
            <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
            <p className="text-sm text-gray-600">
              {post.author.company 
                ? `${post.author.role} at ${post.author.company}`
                : post.author.role
              }
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <span className="text-sm">{post.timestamp}</span>
          <motion.button
            className="p-1 rounded-full hover:bg-gray-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MoreVertical className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-900 mb-3">{post.content}</p>
        {post.image && (
          <motion.img
            src={post.image}
            alt="Post content"
            className="rounded-lg w-full object-cover max-h-96"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex space-x-6">
            <motion.button
              className={`flex items-center space-x-2 ${
                isLiked ? 'text-red-500' : 'text-gray-600'
              }`}
              onClick={handleLike}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{post.likes}</span>
            </motion.button>
            <motion.button
              className="flex items-center space-x-2 text-gray-600"
              onClick={() => setShowComments(!showComments)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MessageCircle className="h-5 w-5" />
              <span>{post.comments}</span>
            </motion.button>
            <motion.button
              className="flex items-center space-x-2 text-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="h-5 w-5" />
            </motion.button>
          </div>
          <motion.span
            className="text-sm font-medium text-blue-900 px-3 py-1 bg-blue-50 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            {post.space}
          </motion.span>
        </div>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            className="border-t border-gray-100"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="p-4 space-y-4">
              {/* Comment Input */}
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <motion.button
                  className="text-blue-900"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Sample Comments */}
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <img
                      src={`https://i.pravatar.cc/40?img=${i}`}
                      alt="Commenter"
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg px-3 py-2">
                        <p className="font-medium text-sm text-gray-900">User {i}</p>
                        <p className="text-sm text-gray-600">Great post! Looking forward to more updates.</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <button className="hover:text-blue-900">Like</button>
                        <button className="hover:text-blue-900">Reply</button>
                        <span>2h ago</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PostCard;
