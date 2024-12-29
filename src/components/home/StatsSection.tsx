import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Calendar, Building2 } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Alumni Network', value: '10,000+' },
  { icon: Award, label: 'Success Stories', value: '500+' },
  { icon: Calendar, label: 'Annual Events', value: '20+' },
  { icon: Building2, label: 'Partner Companies', value: '100+' },
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-900 rounded-full mb-4">
                <stat.icon className="h-6 w-6" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;