import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cardHover, imageHover } from './animations/variants';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date, author, image }) => {
  return (
    <motion.article
      className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
      variants={cardHover}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        className="relative h-48 overflow-hidden"
        variants={imageHover}
      >
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />
      </motion.div>

      <motion.div className="p-6 flex-grow flex flex-col">
        <motion.div 
          className="flex items-center text-sm text-gray-600 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <time dateTime={date} className="font-medium">
            {new Date(date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
          <span className="mx-2">•</span>
          <span className="font-medium">{author}</span>
        </motion.div>

        <motion.h3 
          className="text-xl font-bold text-gray-900 mb-3 line-clamp-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.h3>

        <motion.p 
          className="text-gray-600 mb-4 line-clamp-3 flex-grow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {excerpt}
        </motion.p>

        <motion.div
          className="mt-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="inline-flex items-center text-blue-900 font-medium hover:text-blue-700 transition-colors group"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Read More
            <motion.span 
              className="ml-2"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.article>
  );
};

export default BlogCard;