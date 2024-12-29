import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { staggerContainer, fadeInUp, buttonHover } from '../components/animations/variants';

const blogPosts = [
  {
    id: 1,
    title: "Alumni Spotlight: Innovation in Tech",
    excerpt: "Discover how our alumni are making waves in the tech industry with groundbreaking innovations and startups.",
    category: "Success Stories",
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1600",
    author: "SARC Team",
    tags: ["Technology", "Alumni", "Success"]
  },
  {
    id: 2,
    title: "Annual Alumni Meet 2024",
    excerpt: "Join us for a day of networking, celebration, and reconnecting with your alma mater. Special keynote speakers and workshops planned.",
    category: "Events",
    date: "2024-03-10",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1600",
    author: "Events Team",
    tags: ["Events", "Networking", "Community"]
  },
  {
    id: 3,
    title: "From Campus to Corporate: A Journey",
    excerpt: "An inspiring story of how our alumni transitioned from academic excellence to corporate leadership.",
    category: "Career",
    date: "2024-03-05",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600",
    author: "Alumni Office",
    tags: ["Career", "Corporate", "Growth"]
  },
  {
    id: 4,
    title: "Research Breakthroughs by Alumni",
    excerpt: "Highlighting the groundbreaking research and innovations by our distinguished alumni across the globe.",
    category: "Research",
    date: "2024-03-01",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1600",
    author: "Research Team",
    tags: ["Research", "Innovation", "Science"]
  }
];

const categories = ["All", ...new Set(blogPosts.map(post => post.category))];

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div 
      className="py-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SARC Blog</h1>
          <p className="text-xl text-gray-600">
            Stay updated with the latest alumni news, stories, and achievements
          </p>
        </motion.div>
        
        <motion.div 
          className="mb-12 space-y-6"
          variants={fadeInUp}
        >
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                whileHover="hover"
                whileTap="tap"
                variants={buttonHover}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-600 py-12"
            >
              No posts found matching your criteria
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  author={post.author}
                  image={post.image}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Blog;