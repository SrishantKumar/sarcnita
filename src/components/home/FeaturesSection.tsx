import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, BookOpen, Award } from 'lucide-react';

const features = [
  {
    icon: GraduationCap,
    title: 'Mentorship Program',
    description: 'Connect with experienced alumni for career guidance and professional development.'
  },
  {
    icon: Users,
    title: 'Networking Events',
    description: 'Regular meetups and conferences to build meaningful professional relationships.'
  },
  {
    icon: BookOpen,
    title: 'Knowledge Sharing',
    description: 'Access to workshops, webinars, and resources from industry experts.'
  },
  {
    icon: Award,
    title: 'Recognition',
    description: 'Celebrating alumni achievements and contributions to the community.'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900">What We Offer</h2>
          <p className="mt-4 text-xl text-gray-600">Empowering connections that drive success</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <feature.icon className="h-12 w-12 text-blue-900 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;