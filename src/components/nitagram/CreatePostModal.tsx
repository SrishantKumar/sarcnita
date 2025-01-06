import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Image, Link2, Send, Loader2, Trash2 } from 'lucide-react';

interface MediaFile {
  file: File;
  preview: string;
  type: 'image' | 'video';
}

interface CreatePostModalProps {
  onClose: () => void;
  onCreatePost: (content: string, mediaFiles: File[]) => Promise<void>;
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
  const [selectedMedia, setSelectedMedia] = useState<MediaFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Check if adding these files would exceed the limit
    if (selectedMedia.length + files.length > 10) {
      setError('Maximum 10 files allowed');
      return;
    }

    const newMediaFiles: MediaFile[] = [];

    files.forEach(file => {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('Each file must be less than 10MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        setError('Only image and video files are allowed');
        return;
      }

      const type = file.type.startsWith('image/') ? 'image' : 'video';
      const preview = type === 'image' 
        ? URL.createObjectURL(file)
        : URL.createObjectURL(file);

      newMediaFiles.push({
        file,
        preview,
        type
      });
    });

    setSelectedMedia([...selectedMedia, ...newMediaFiles]);
    setError(null);
  };

  const removeMedia = (index: number) => {
    const newMedia = [...selectedMedia];
    URL.revokeObjectURL(newMedia[index].preview);
    newMedia.splice(index, 1);
    setSelectedMedia(newMedia);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await onCreatePost(content.trim(), selectedMedia.map(m => m.file));
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

        <form onSubmit={handleSubmit} className="p-4">
          <textarea
            className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
          />

          {/* Media Preview Grid */}
          {selectedMedia.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {selectedMedia.map((media, index) => (
                <div key={index} className="relative group">
                  {media.type === 'image' ? (
                    <img
                      src={media.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ) : (
                    <video
                      src={media.preview}
                      className="w-full h-40 object-cover rounded-lg"
                      controls
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removeMedia(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                  onChange={handleMediaChange}
                  disabled={isSubmitting}
                />
                <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                  <Image className="h-5 w-5" />
                  <span>Add Media</span>
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50"
              disabled={isSubmitting || !content.trim()}
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              Post
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreatePostModal;
