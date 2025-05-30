'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface EnhancedSearchProps {
  initialTreatment?: string;
  initialLocation?: string;
  className?: string;
}

export default function EnhancedSearch({ initialTreatment = '', initialLocation = '', className = '' }: EnhancedSearchProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(initialTreatment);
  const [location, setLocation] = useState(initialLocation);
  const [showTreatmentSuggestions, setShowTreatmentSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Common treatments for autocomplete
  const commonTreatments = [
    'Cardiology', 'Orthopedics', 'Neurology', 'Pediatrics',
    'Oncology', 'Dermatology', 'Gynecology', 'Dental',
    'Ophthalmology', 'ENT', 'Gastroenterology', 'Urology',
    'Endocrinology', 'Rheumatology', 'Pulmonology', 'Nephrology'
  ];

  // Common locations for autocomplete
  const locations = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata',
    'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
  ];

  // Filter suggestions based on input
  const treatmentSuggestions = commonTreatments.filter(treatment =>
    treatment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const locationSuggestions = locations.filter(loc =>
    loc.toLowerCase().includes(location.toLowerCase())
  );

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowTreatmentSuggestions(false);
        setShowLocationSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/results?treatment=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`);
    }
  };

  return (
    <div className={`w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 ${className}`} ref={searchRef}>
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <label htmlFor="treatment" className="block text-gray-700 font-medium mb-2">
            What treatment are you looking for?
          </label>
          <input
            type="text"
            id="treatment"
            placeholder="e.g., Cardiology, Dialysis, Hip Surgery"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowTreatmentSuggestions(true);
            }}
            onFocus={() => setShowTreatmentSuggestions(true)}
            required
          />
          {showTreatmentSuggestions && treatmentSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
              {treatmentSuggestions.map((treatment) => (
                <button
                  key={treatment}
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  onClick={() => {
                    setSearchQuery(treatment);
                    setShowTreatmentSuggestions(false);
                  }}
                >
                  {treatment}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
            Select Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="Enter city name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setShowLocationSuggestions(true);
            }}
            onFocus={() => setShowLocationSuggestions(true)}
          />
          {showLocationSuggestions && locationSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
              {locationSuggestions.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  onClick={() => {
                    setLocation(loc);
                    setShowLocationSuggestions(false);
                  }}
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 flex items-center"
            onClick={() => {
              // In a real app, this would use the browser's geolocation API
              alert('This would use your current location in a real app');
              setLocation('Current Location');
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Use my current location
          </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
          >
            Search Hospitals
          </button>
        </div>
      </form>
    </div>
  );
} 