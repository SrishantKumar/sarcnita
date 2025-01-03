import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Download, Plus, LogIn, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import CreateNewsletterModal from '../components/newsletter/CreateNewsletterModal';
import { Link } from 'react-router-dom';

interface Newsletter {
  id: string;
  title: string;
  description: string;
  file_url: string;
  created_at: string;
}

const Newsletter: React.FC = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('newsletters')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNewsletters(data || []);
    } catch (error) {
      console.error('Error fetching newsletters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (fileUrl: string) => {
    if (!user) {
      const shouldLogin = window.confirm('Please log in to download newsletters. Would you like to log in now?');
      if (shouldLogin) {
        navigate('/auth');
      }
      return;
    }
    window.open(fileUrl, '_blank');
  };

  const handleDelete = async (newsletterId: string, fileUrl: string) => {
    try {
      if (!profile?.role === 'admin') return;
      
      const confirmDelete = window.confirm('Are you sure you want to delete this newsletter?');
      if (!confirmDelete) return;

      setDeleteLoading(newsletterId);

      // Extract file path from URL
      const filePath = fileUrl.split('/').pop();
      if (!filePath) throw new Error('Invalid file URL');

      // Delete file from storage
      const { error: storageError } = await supabase.storage
        .from('newsletter-files')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete newsletter record
      const { error: dbError } = await supabase
        .from('newsletters')
        .delete()
        .eq('id', newsletterId);

      if (dbError) throw dbError;

      // Update local state
      setNewsletters(newsletters.filter(n => n.id !== newsletterId));
    } catch (error) {
      console.error('Error deleting newsletter:', error);
      alert('Failed to delete newsletter. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleCreateNewsletter = async (title: string, description: string, file: File) => {
    try {
      if (!user) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to storage
      const { error: uploadError, data } = await supabase.storage
        .from('newsletter-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('newsletter-files')
        .getPublicUrl(filePath);

      // Create newsletter record
      const { error: insertError } = await supabase
        .from('newsletters')
        .insert([
          {
            title,
            description,
            file_url: urlData.publicUrl,
            uploaded_by: user.id
          },
        ]);

      if (insertError) throw insertError;

      setIsCreateModalOpen(false);
      fetchNewsletters();
    } catch (error) {
      console.error('Error creating newsletter:', error);
      alert('Failed to create newsletter. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-900">SARC Newsletters</h1>
        </div>
      </div>

      {/* Main Content with proper padding for fixed header */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Latest Newsletters</h2>
                <p className="text-gray-600 mt-1">Stay updated with our latest news and announcements</p>
              </div>
              {profile?.role === 'admin' && (
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap"
                >
                  <Plus className="h-5 w-5" />
                  Create Newsletter
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            </div>
          ) : newsletters.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <p className="text-gray-500">No newsletters available</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {newsletters.map((newsletter) => (
                <motion.div
                  key={newsletter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {newsletter.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{newsletter.description}</p>
                    
                    <div className="mt-auto space-y-4">
                      <span className="text-sm text-gray-500 block">
                        {new Date(newsletter.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <div className="flex gap-2 flex-wrap">
                        {user ? (
                          <button
                            onClick={() => handleDownload(newsletter.file_url)}
                            className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors w-full justify-center"
                          >
                            <Download className="h-5 w-5" />
                            Download
                          </button>
                        ) : (
                          <Link
                            to="/auth"
                            className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors w-full justify-center"
                          >
                            <LogIn className="h-5 w-5" />
                            Login to Download
                          </Link>
                        )}
                        {profile?.role === 'admin' && (
                          <button
                            onClick={() => handleDelete(newsletter.id, newsletter.file_url)}
                            disabled={deleteLoading === newsletter.id}
                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                          >
                            {deleteLoading === newsletter.id ? (
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                              <Trash2 className="h-5 w-5" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isCreateModalOpen && (
        <CreateNewsletterModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateNewsletter}
        />
      )}
    </div>
  );
};

export default Newsletter;