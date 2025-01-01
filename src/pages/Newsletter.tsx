import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Trash2, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface Newsletter {
  id: string;
  title: string;
  description: string;
  file_url: string;
  created_at: string;
}

const Newsletter: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

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
      alert('Failed to fetch newsletters');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !user) return;

    try {
      setUploading(true);

      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('newsletters')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('newsletters')
        .getPublicUrl(filePath);

      // Create newsletter record
      const { error: dbError } = await supabase.from('newsletters').insert([
        {
          title,
          description,
          file_url: data.publicUrl,
          uploaded_by: user.id,
        },
      ]);

      if (dbError) throw dbError;

      setTitle('');
      setDescription('');
      setFile(null);
      fetchNewsletters();
      alert('Newsletter uploaded successfully!');
    } catch (error) {
      console.error('Error uploading newsletter:', error);
      alert('Failed to upload newsletter');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, fileUrl: string) => {
    if (!isAdmin) return;
    
    try {
      // Delete from storage
      const filePath = fileUrl.split('/').pop();
      if (filePath) {
        await supabase.storage
          .from('newsletters')
          .remove([filePath]);
      }

      // Delete from database
      const { error } = await supabase
        .from('newsletters')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchNewsletters();
      alert('Newsletter deleted successfully!');
    } catch (error) {
      console.error('Error deleting newsletter:', error);
      alert('Failed to delete newsletter');
    }
  };

  const handleDownload = async (fileUrl: string, title: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading newsletter:', error);
      alert('Failed to download newsletter');
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            SARC Newsletters
          </h2>
          <p className="mt-3 text-xl text-gray-500">
            {isAdmin
              ? 'Upload and manage newsletters'
              : 'Download and read our latest newsletters'}
          </p>
        </div>

        {isAdmin && (
          <div className="max-w-2xl mx-auto mb-12 bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  File (PDF, max 10MB)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="mt-1 block w-full"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={uploading || !file || !title}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {uploading ? (
                  'Uploading...'
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Newsletter
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            </div>
          ) : newsletters.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No newsletters available
            </div>
          ) : (
            newsletters.map((newsletter) => (
              <div
                key={newsletter.id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <FileText className="w-8 h-8 text-blue-900" />
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(newsletter.id, newsletter.file_url)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {newsletter.title}
                  </h3>
                  {newsletter.description && (
                    <p className="mt-2 text-sm text-gray-500">
                      {newsletter.description}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-400">
                    {new Date(newsletter.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(newsletter.file_url, newsletter.title)}
                  className="mt-4 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Newsletter;