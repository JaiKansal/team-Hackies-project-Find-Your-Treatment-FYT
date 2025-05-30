'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  initialQuery?: string;
  initialLocation?: string;
}

export default function SearchBar({ initialQuery = '', initialLocation = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!query.trim() && !location.trim()) {
      setError('Please enter either a treatment/disease or location');
      return;
    }

    const searchParams = new URLSearchParams();
    if (query.trim()) searchParams.set('query', query.trim());
    if (location.trim()) searchParams.set('location', location.trim());
    
    router.push(`/hospitals?${searchParams.toString()}`);
  };

  const handleGetCurrentLocation = () => {
    setIsGettingLocation(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Store coordinates in localStorage for future use
        localStorage.setItem('userLocation', JSON.stringify({ lat: latitude, lng: longitude }));
        setLocation('Current Location');
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsGettingLocation(false);
        let errorMessage = 'Unable to retrieve your location. ';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please enable location access in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'Please enter your location manually.';
        }
        
        setError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="card w-full max-w-4xl mx-auto p-8 fade-in">
      {error && (
        <div className="error-message slide-up mb-6" role="alert">
          {error}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 slide-up" style={{ animationDelay: '100ms' }}>
          <label htmlFor="treatment" className="form-label">
            Treatment or Disease
          </label>
          <input
            type="text"
            id="treatment"
            name="treatment"
            placeholder="e.g., Cardiology, Dialysis, Hip Surgery"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-primary"
            aria-label="Search for treatment or disease"
          />
        </div>
        
        <div className="flex-1 slide-up" style={{ animationDelay: '200ms' }}>
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <div className="flex">
            <input
              type="text"
              id="location"
              name="location"
              placeholder="City or Area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-primary rounded-r-none"
              aria-label="Enter location"
            />
            <button 
              type="button" 
              onClick={handleGetCurrentLocation}
              className="bg-gray-100 text-gray-700 px-4 rounded-r-lg border-2 border-l-0 border-gray-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={isGettingLocation}
              aria-label="Use current location"
            >
              {isGettingLocation ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Getting...
                </span>
              ) : (
                <span className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  GPS
                </span>
              )}
            </button>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="btn-primary md:self-end scale-in"
          style={{ animationDelay: '300ms' }}
          aria-label="Search hospitals"
        >
          Search
        </button>
      </div>
    </form>
  );
}