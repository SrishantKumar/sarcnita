import React from 'react';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import { Link } from 'react-router-dom';
import { Users, Image, Mail, Building } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />

      {/* Quick Links Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Quick Links</h2>
            <p className="mt-4 text-xl text-gray-600">Access key resources and information</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/team" className="group">
              <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Users className="h-12 w-12 text-blue-900 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-2">Our Team</h3>
                <p className="text-gray-600">Meet the dedicated individuals behind SARC</p>
              </div>
            </Link>

            <Link to="/nitagram" className="group">
              <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image className="h-12 w-12 text-blue-900 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-2">Nitagram</h3>
                <p className="text-gray-600">Share and explore memories with our community</p>
              </div>
            </Link>

            <Link to="/newsletter" className="group">
              <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Mail className="h-12 w-12 text-blue-900 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-2">Newsletter</h3>
                <p className="text-gray-600">Subscribe to our monthly updates</p>
              </div>
            </Link>

            <Link to="/alumni" className="group">
              <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Building className="h-12 w-12 text-blue-900 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-2">Alumni</h3>
                <p className="text-gray-600">Connect with our distinguished alumni</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;