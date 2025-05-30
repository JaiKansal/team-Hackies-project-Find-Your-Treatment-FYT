'use client';

import { useState, useEffect } from 'react';
import { FilterOptions } from '../lib/types';

interface FilterPanelProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
  maxPrice: number;
}

export default function FilterPanel({ filters, onChange, maxPrice }: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);
  const [isOpen, setIsOpen] = useState(false);

  // Update local state when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handlePriceChange = (value: [number, number]) => {
    // Ensure min price doesn't exceed max price
    const [min, max] = value;
    const adjustedMin = Math.min(min, max);
    const adjustedMax = Math.max(min, max);
    
    setLocalFilters(prev => ({
      ...prev,
      priceRange: [adjustedMin, adjustedMax]
    }));
  };

  const handleRatingChange = (value: number) => {
    setLocalFilters(prev => ({
      ...prev,
      minRating: value
    }));
  };

  const handleTypeChange = (type: 'Government' | 'Private' | 'Clinic') => {
    setLocalFilters(prev => {
      const newTypes = prev.hospitalType.includes(type)
        ? prev.hospitalType.filter(t => t !== type)
        : [...prev.hospitalType, type];
      
      return {
        ...prev,
        hospitalType: newTypes
      };
    });
  };

  const applyFilters = () => {
    onChange(localFilters);
  };

  const resetFilters = () => {
    const resetFilters: FilterOptions = {
      priceRange: [0, maxPrice],
      minRating: 0,
      hospitalType: ['Government', 'Private', 'Clinic']
    };
    setLocalFilters(resetFilters);
    onChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <button 
          className="flex justify-between items-center w-full md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="filter-content"
        >
          <h3 className="text-lg font-medium">Filters</h3>
          <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
        </button>
        <h3 className="text-lg font-medium hidden md:block">Filters</h3>
      </div>

      <div 
        id="filter-content"
        className={`p-4 space-y-6 ${isOpen ? 'block' : 'hidden md:block'}`}
      >
        {/* Price Range Filter */}
        <div>
          <h4 className="font-medium mb-2">Price Range</h4>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="min-price" className="sr-only">Minimum Price</label>
                <input 
                  type="number"
                  id="min-price"
                  min={0}
                  max={maxPrice}
                  value={localFilters.priceRange[0]}
                  onChange={(e) => handlePriceChange([parseInt(e.target.value), localFilters.priceRange[1]])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Minimum price"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="max-price" className="sr-only">Maximum Price</label>
                <input 
                  type="number"
                  id="max-price"
                  min={0}
                  max={maxPrice}
                  value={localFilters.priceRange[1]}
                  onChange={(e) => handlePriceChange([localFilters.priceRange[0], parseInt(e.target.value)])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Maximum price"
                />
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>₹{localFilters.priceRange[0].toLocaleString()}</span>
              <span>₹{localFilters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h4 className="font-medium mb-2">Minimum Rating</h4>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`w-8 h-8 flex items-center justify-center rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  localFilters.minRating >= rating ? 'bg-yellow-400 text-white' : 'bg-gray-200'
                }`}
                aria-pressed={localFilters.minRating >= rating}
                aria-label={`${rating} stars`}
              >
                {rating}
              </button>
            ))}
            <button 
              onClick={() => handleRatingChange(0)}
              className="text-xs text-blue-600 ml-2 hover:text-blue-700 focus:outline-none focus:underline"
              aria-label="Clear rating filter"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Hospital Type Filter */}
        <div>
          <h4 className="font-medium mb-2">Hospital Type</h4>
          <div className="space-y-2">
            {(['Government', 'Private', 'Clinic'] as const).map((type) => (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  id={`type-${type}`}
                  checked={localFilters.hospitalType.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor={`type-${type}`} className="ml-2 text-gray-700">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-2 pt-4">
          <button
            onClick={applyFilters}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}