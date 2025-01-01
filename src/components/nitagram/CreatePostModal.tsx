import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Image, Link2, Send, Loader2 } from 'lucide-react';

interface CreatePostModalProps {
  onClose: () => void;
  onCreatePost: (content: string, mediaFile?: File) => Promise<void>;
}

const spaces = [
  'Placements',
  'Tech Corner',
  'Events',
  'Alumni Stories',
  'Research',
  'Academics',
  'Achievements',
];

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onCreatePost }) => {
  const [content, setContent] = useState('');
  const [selectedSpace, setSelectedSpace] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        setError('Only image and video files are allowed');
        return;
      }

      setSelectedMedia(file);
      setError(null);

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setMediaPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        // For video, we can use the video URL
        setMediaPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await onCreatePost(content.trim(), selectedMedia || undefined);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Create Post</h2>
          <motion.button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isSubmitting}
          >
            <X className="h-6 w-6" />
          </motion.button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          {/* Media Preview */}
          {mediaPreview && (
            <div className="relative">
              {selectedMedia?.type.startsWith('image/') ? (
                <img
                  src={mediaPreview}
                  alt="Preview"
                  className="max-h-60 rounded-lg object-cover"
                />
              ) : (
                <video
                  src={mediaPreview}
                  className="max-h-60 rounded-lg"
                  controls
                />
              )}
              <motion.button
                type="button"
                onClick={() => {
                  setSelectedMedia(null);
                  setMediaPreview(null);
                }}
                className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={isSubmitting}
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaChange}
                  className="hidden"
                  disabled={isSubmitting}
                />
                <Image className="h-6 w-6 text-gray-600" />
              </label>
            </div>

            <div className="flex space-x-3">
              <motion.button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                className={`px-4 py-2 bg-blue-900 text-white rounded-lg flex items-center space-x-2 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-800'
                }`}
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                disabled={isSubmitting || !content.trim()}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Post</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreatePostModal;
