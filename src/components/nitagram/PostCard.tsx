import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Trash2, Send, X } from 'lucide-react';
import { Post } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import LoginPromptModal from './LoginPromptModal';

interface PostCardProps {
  post: Post;
  currentUser: User | null;
  onLike: (postId: string) => Promise<void>;
  onComment: (postId: string, content: string) => Promise<void>;
  onDelete?: (postId: string, userId: string) => Promise<void>;
  profile: any;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUser,
  onLike,
  onComment,
  onDelete,
  profile,
}) => {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState<'like' | 'comment' | null>(null);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    if (!currentUser) {
      setLoginPrompt('comment');
      return;
    }

    await onComment(post.id, comment);
    setComment('');
  };

  const handleLike = async () => {
    if (!currentUser) {
      setLoginPrompt('like');
      return;
    }

    setIsLikeAnimating(true);
    await onLike(post.id);
    setTimeout(() => setIsLikeAnimating(false), 1000);
  };

  const isLiked = currentUser && post.likes?.some(like => like.user_id === currentUser.id);

  return (
    <>
      <motion.div
        className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        {/* Post Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="relative">
              {post.profiles?.avatar_url ? (
                <img
                  src={post.profiles.avatar_url}
                  alt={post.profiles.username}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center ring-2 ring-white">
                  <span className="text-white font-medium">
                    {post.profiles?.username?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{post.profiles?.username}</p>
              <p className="text-xs text-gray-500">
                {new Date(post.created_at).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          {currentUser && onDelete && (currentUser.id === post.user_id || profile?.role === 'admin') && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(post.id, post.user_id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
              title={currentUser.id === post.user_id ? "Delete your post" : "Delete as admin"}
            >
              <Trash2 className="h-5 w-5" />
            </motion.button>
          )}
        </div>

        {/* Post Content */}
        <div className="px-4 py-3">
          <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
        </div>

        {/* Post Media */}
        {post.media_url && (
          <div className="relative">
            {post.media_type === 'image' ? (
              <img
                src={post.media_url}
                alt="Post media"
                className="w-full h-auto"
                loading="lazy"
              />
            ) : (
              <video
                src={post.media_url}
                controls
                className="w-full h-auto"
                preload="metadata"
              />
            )}
          </div>
        )}

        {/* Post Actions */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={handleLike}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex items-center space-x-1.5 ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <motion.div
                animate={isLikeAnimating ? {
                  scale: [1, 1.2, 0.9, 1.1, 1],
                  rotate: [0, -15, 15, -10, 0],
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <Heart 
                  className={`h-6 w-6 ${isLiked ? 'fill-current' : 'stroke-2'}`}
                />
              </motion.div>
              <span className="font-medium">{post.likes_count || 0}</span>
            </motion.button>

            <button
              onClick={() => {
                if (!currentUser) {
                  setLoginPrompt('comment');
                } else {
                  setShowComments(!showComments);
                }
              }}
              className="flex items-center space-x-1.5 text-gray-500 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="h-6 w-6 stroke-2" />
              <span className="font-medium">{post.comments?.length || post.comments_count || 0}</span>
            </button>
          </div>

          {/* Comments Section */}
          <AnimatePresence>
            {showComments && currentUser && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 space-y-4 overflow-hidden"
              >
                <div className="max-h-96 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {post.comments?.map((comment) => (
                    <motion.div 
                      key={comment.id} 
                      className="flex items-start space-x-3 bg-gray-50 p-3 rounded-xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {comment.profiles?.avatar_url ? (
                        <img
                          src={comment.profiles.avatar_url}
                          alt={comment.profiles.username}
                          className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center ring-2 ring-white">
                          <span className="text-white font-medium text-sm">
                            {comment.profiles?.username?.[0]?.toUpperCase() || 'U'}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 text-sm">
                            {comment.profiles?.username}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(comment.created_at).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <p className="text-gray-700 text-sm">{comment.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <form onSubmit={handleSubmitComment} className="flex items-center space-x-2 mt-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    {comment && (
                      <button
                        type="button"
                        onClick={() => setComment('')}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={!comment.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 disabled:text-gray-300 transition-colors"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Login Prompt Modal */}
      <LoginPromptModal
        isOpen={loginPrompt !== null}
        onClose={() => setLoginPrompt(null)}
        action={loginPrompt || 'like'}
      />
    </>
  );
};

export default PostCard;
