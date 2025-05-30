'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useComparison } from '@/context/ComparisonContext';
import { Hospital } from '@/lib/types';
import { filterHospitals } from '@/lib/api/googleSheets';

export default function HospitalsPage() {
  const router = useRouter();
  const { addToComparison, comparisonList } = useComparison();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortOption, setSortOption] = useState('name');

  useEffect(() => {
    async function loadHospitals() {
      setLoading(true);
      try {
        const data = await filterHospitals('', '');
        setHospitals(data);
      } catch (error) {
        console.error('Error loading hospitals:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadHospitals();
  }, []);

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hospital.treatments.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || hospital.type === selectedType;
    return matchesSearch && matchesType;
  });

  const sortedHospitals = [...filteredHospitals].sort((a, b) => {
    switch (sortOption) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return parseFloat(a.price.toString()) - parseFloat(b.price.toString());
      default:
        return 0;
    }
  });

  const handleAddToComparison = (hospital: Hospital) => {
    addToComparison(hospital);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Browse Hospitals</h1>
          <button
            onClick={() => router.push('/compare')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Comparison ({comparisonList.length})
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search hospitals or treatments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
              </select>
            </div>
            <div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hospitals List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedHospitals.map((hospital) => (
              <div key={hospital.id} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{hospital.name}</h3>
                <p className="text-gray-600 mb-4">{hospital.address}, {hospital.city}</p>
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(hospital.rating) ? 'fill-current' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600">{hospital.rating.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">₹{parseInt(hospital.price.toString()).toLocaleString()}</span>
                  <button
                    onClick={() => handleAddToComparison(hospital)}
                    disabled={comparisonList.some(h => h.id === hospital.id)}
                    className={`px-4 py-2 rounded-lg ${
                      comparisonList.some(h => h.id === hospital.id)
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    } transition-colors`}
                  >
                    {comparisonList.some(h => h.id === hospital.id) ? 'Added' : 'Add to Compare'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && sortedHospitals.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No hospitals found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
} 