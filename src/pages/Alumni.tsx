import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AlumniCard from '../components/AlumniCard';
import { FolderOpen, ChevronLeft, Search, X } from 'lucide-react';
import { alumniData } from '../data/alumniData';

const Alumni: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get filtered alumni and relevant years based on search
  const { filteredAlumni, relevantYears, yearWiseCount } = useMemo(() => {
    const filtered = alumniData.filter(alumni => {
      const matchesYear = selectedYear ? alumni.batch === selectedYear : true;
      const matchesSearch = searchQuery
        ? alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alumni.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alumni.position.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesYear && matchesSearch;
    });

    // Get unique years from filtered alumni
    const relevantYears = searchQuery
      ? [...new Set(filtered.map(alumni => parseInt(alumni.batch)))]
          .sort((a, b) => b - a)
      : [...new Set(alumniData.map(alumni => parseInt(alumni.batch)))].sort((a, b) => b - a);

    // Count alumni per year in filtered results
    const yearWiseCount: Record<string, number> = filtered.reduce((acc, alumni) => {
      const year = alumni.batch;
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});

    return { filteredAlumni: filtered, relevantYears, yearWiseCount };
  }, [searchQuery, selectedYear]);

  const YearFolder: React.FC<{ year: number }> = ({ year }) => {
    const count = yearWiseCount[year.toString()] || 0;
    if (searchQuery && count === 0) return null;

    return (
      <motion.div
        className="cursor-pointer bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedYear(year.toString())}
      >
        <div className="flex items-center space-x-3">
          <FolderOpen className="w-8 h-8" style={{ color: '#1a355c' }} />
          <div>
            <h3 className="text-lg font-semibold">Batch {year}</h3>
            <p className="text-sm text-gray-500">
              {count} {count === 1 ? 'Alumni' : 'Alumni'}
              {searchQuery && count > 0 && ' matched'}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-28 md:pt-32 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Alumni Directory</h1>
                <p className="mt-2 text-gray-600">Explore our alumni network and their achievements</p>
              </div>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, company, or position..."
                  className="pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedYear(null);
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedYear(null);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {selectedYear ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                key="alumni-list"
              >
                <div className="flex items-center mb-6">
                  <button
                    onClick={() => setSelectedYear(null)}
                    className="flex items-center text-[#1a355c] hover:text-opacity-80 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Back to Years
                  </button>
                  <h2 className="text-2xl font-semibold ml-4">
                    Batch {selectedYear}
                    {searchQuery && (
                      <span className="text-lg text-gray-500 ml-2">
                        ({filteredAlumni.length} matches)
                      </span>
                    )}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAlumni.map((alumni, index) => (
                    <motion.div
                      key={`${alumni.name}_${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <AlumniCard {...alumni} />
                    </motion.div>
                  ))}
                </div>
                
                {filteredAlumni.length === 0 && (
                  <div className="text-center text-gray-500 mt-8">
                    {searchQuery 
                      ? "No alumni found for the selected criteria"
                      : "No alumni data available for this batch yet"}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                key="year-folders"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {relevantYears.map(year => (
                  <YearFolder key={year} year={year} />
                ))}
                {searchQuery && filteredAlumni.length === 0 && (
                  <div className="col-span-full text-center text-gray-500 mt-8">
                    No alumni found matching "{searchQuery}"
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Alumni;