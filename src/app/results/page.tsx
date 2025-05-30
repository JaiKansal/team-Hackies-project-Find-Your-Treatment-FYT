'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { filterHospitals } from '@/lib/api/googleSheets';
import { Hospital } from '@/lib/types';
import HospitalCard from '@/components/HospitalCard';
import HospitalCardSkeleton from '@/components/HospitalCardSkeleton';
import Navbar from '@/components/Navbar';
import { useComparison } from '@/context/ComparisonContext';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('rating-high');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  const [hospitalType, setHospitalType] = useState('all');
  const { addToComparison, comparisonList } = useComparison();
  
  // Handle initial mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load hospitals data
  useEffect(() => {
    if (!mounted) return;

    async function loadHospitals() {
      setLoading(true);
      try {
        const treatment = searchParams.get('treatment') || '';
        const location = searchParams.get('location') || '';
        const data = await filterHospitals(treatment, location);
        const mappedData = data.map(hospital => ({
          ...hospital,
          treatments: hospital.treatments.map((t: string) => t.trim()),
          address: hospital.address,
          contact: 'N/A',
          facilities: []
        }));
        setHospitals(mappedData);
      } catch (error) {
        console.error('Error loading hospitals:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadHospitals();
  }, [mounted, searchParams]);
  
  // Apply filters
  const filteredHospitals = hospitals.filter(hospital => {
    // Price filter
    const hospitalPrice = parseFloat(hospital.price.toString());
    if (isNaN(hospitalPrice)) {
      console.warn(`Invalid price for hospital ${hospital.name}: ${hospital.price}`);
      return false;
    }
    if (hospitalPrice < priceRange[0] || hospitalPrice > priceRange[1]) {
      return false;
    }
    
    // Rating filter
    if (hospital.rating < minRating) {
      return false;
    }
    
    // Hospital type filter
    if (hospitalType !== 'all' && hospital.type !== hospitalType) {
      return false;
    }
    
    return true;
  });
  
  // Apply sorting
  const sortedHospitals = [...filteredHospitals].sort((a, b) => {
    // Ensure price is treated as a string to avoid NaN issues
    const priceA = parseFloat(a.price.toString());
    const priceB = parseFloat(b.price.toString());
    
    switch (sortOption) {
      case 'price-low':
        return priceA - priceB;
      case 'price-high':
        return priceB - priceA;
      case 'rating-high':
        return b.rating - a.rating;
      case 'distance':
        return 0;
      case 'best-value':
        const valueA = a.rating / priceA;
        const valueB = b.rating / priceB;
        return valueB - valueA;
      default:
        return 0;
    }
  });

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Panel */}
          <div className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Filters</h2>
            
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-3">Price Range</label>
              <div className="flex items-center justify-between mb-2 text-gray-600">
                <span className="font-medium">₹{priceRange[0].toLocaleString()}</span>
                <span className="font-medium">₹{priceRange[1].toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-blue-600"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-3">Minimum Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              >
                <option value="0">Any Rating</option>
                <option value="3">3+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-3">Hospital Type</label>
              <select
                value={hospitalType}
                onChange={(e) => setHospitalType(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              >
                <option value="all">All Types</option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
                <option value="Clinic">Clinic</option>
              </select>
            </div>
          </div>
          
          {/* Results */}
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                {loading ? 'Loading results...' : 
                  `${sortedHospitals.length} ${sortedHospitals.length === 1 ? 'result' : 'results'} found`}
              </h2>
              
              <div className="flex items-center gap-4">
                <Link
                  href="/compare"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Compare ({comparisonList.length})
                </Link>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                >
                  <option value="rating-high">Highest Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="best-value">Best Value</option>
                  <option value="distance">Distance</option>
                </select>
              </div>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 gap-6">
                {[...Array(3)].map((_, index) => (
                  <HospitalCardSkeleton key={index} />
                ))}
              </div>
            ) : sortedHospitals.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {sortedHospitals.map((hospital) => (
                  <HospitalCard 
                    key={hospital.id} 
                    hospital={hospital}
                    onAddToComparison={() => addToComparison(hospital)}
                    isInComparison={comparisonList.some(h => h.id === hospital.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-3">No hospitals found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any hospitals matching your search criteria. Try adjusting your filters or search terms.
                </p>
                <Link 
                  href="/"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Back to Search
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}