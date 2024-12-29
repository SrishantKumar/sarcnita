import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Image, Link2, Send } from 'lucide-react';

interface CreatePostModalProps {
  onClose: () => void;
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

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose }) => {
  const [content, setContent] = useState('');
  const [selectedSpace, setSelectedSpace] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle post submission
    onClose();
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
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-60 rounded-lg object-cover"
              />
              <motion.button
                type="button"
                onClick={() => {
                  setSelectedImage(null);
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>
          )}

          {/* Space Selection */}
          <select
            value={selectedSpace}
            onChange={(e) => setSelectedSpace(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a space</option>
            {spaces.map((space) => (
              <option key={space} value={space}>
                {space}
              </option>
            ))}
          </select>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex space-x-2">
              <motion.label
                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Image className="h-5 w-5 text-gray-600" />
              </motion.label>
              <motion.button
                type="button"
                className="p-2 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link2 className="h-5 w-5 text-gray-600" />
              </motion.button>
            </div>

            <motion.button
              type="submit"
              className="bg-blue-900 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!content || !selectedSpace}
            >
              <span>Post</span>
              <Send className="h-4 w-4" />
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreatePostModal;
