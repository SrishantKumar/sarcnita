import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "sarc@nita.ac.in",
      link: "mailto:sarc@nita.ac.in"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      content: "+91 8827569820",
      link: "tel:+918827569820"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      content: "NIT Agartala, Tripura, India",
      link: "https://maps.google.com/?q=NIT+Agartala"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#1a355c] mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or want to connect? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="h-6 w-6 text-[#1a355c]" />
              <h2 className="text-2xl font-semibold text-[#1a355c]">Send Message</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                whileTap={{ scale: 0.995 }}
                className="group"
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1a355c] focus:ring-2 focus:ring-[#1a355c] focus:ring-opacity-20 transition-all outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.995 }}
                className="group"
              >
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1a355c] focus:ring-2 focus:ring-[#1a355c] focus:ring-opacity-20 transition-all outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.995 }}
                className="group"
              >
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1a355c] focus:ring-2 focus:ring-[#1a355c] focus:ring-opacity-20 transition-all outline-none resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </motion.div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#1a355c] text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors"
              >
                <Send className="h-5 w-5" />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-6 rounded-2xl shadow-lg flex items-start gap-4 group transition-all hover:shadow-xl"
              >
                <div className="p-3 rounded-xl bg-[#1a355c] bg-opacity-5 group-hover:bg-opacity-10 transition-all">
                  <div className="text-[#1a355c]">
                    {info.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a355c] mb-1">{info.title}</h3>
                  <p className="text-gray-600">{info.content}</p>
                </div>
              </motion.a>
            ))}

            {/* Map */}
            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3642.499978087411!2d91.42608731541383!3d24.076751184418795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375178c3c5c40329%3A0x7e974dea38c2c8e8!2sNational%20Institute%20of%20Technology%20Agartala!5e0!3m2!1sen!2sin!4v1675863187890!5m2!1sen!2sin"
                  className="w-full h-full rounded-lg"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
