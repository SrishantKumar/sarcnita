import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Trash2, Send } from 'lucide-react';
import { Post } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { User } from '@supabase/supabase-js';

interface PostCardProps {
  post: Post;
  currentUser: User | null;
  onLike: (postId: string) => Promise<void>;
  onComment: (postId: string, content: string) => Promise<void>;
  onDelete?: (postId: string, userId: string) => Promise<void>;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUser,
  onLike,
  onComment,
  onDelete,
}) => {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await onComment(post.id, comment);
    setComment('');
  };

  const isLiked = currentUser && post.likes?.some(like => like.user_id === currentUser.id);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {post.profiles?.avatar_url ? (
            <img
              src={post.profiles.avatar_url}
              alt={post.profiles.username}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-900 font-medium">
                {post.profiles?.username?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{post.profiles?.username}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {onDelete && (
          <button
            onClick={() => onDelete(post.id, post.user_id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Post Content */}
      <div className="px-4 py-2">
        <p className="text-gray-900">{post.content}</p>
      </div>

      {/* Post Media */}
      {post.media_url && (
        <div className="relative">
          {post.media_type === 'image' ? (
            <img
              src={post.media_url}
              alt="Post media"
              className="w-full h-auto"
            />
          ) : (
            <video
              src={post.media_url}
              controls
              className="w-full h-auto"
            />
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onLike(post.id)}
            className={`flex items-center space-x-1 ${
              isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{post.likes_count || 0}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{post.comments?.length || post.comments_count || 0}</span>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 space-y-4">
            {post.comments?.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3">
                {comment.profiles?.avatar_url ? (
                  <img
                    src={comment.profiles.avatar_url}
                    alt={comment.profiles.username}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-900 font-medium">
                      {comment.profiles?.username?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {comment.profiles?.username}
                  </p>
                  <p className="text-gray-600">{comment.content}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}

            {currentUser ? (
              <form onSubmit={handleSubmitComment} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!comment.trim()}
                  className="bg-blue-900 text-white p-2 rounded-lg hover:bg-blue-800 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            ) : (
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-blue-900 mb-2">Log in to join the conversation!</p>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Log In to Comment
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PostCard;
