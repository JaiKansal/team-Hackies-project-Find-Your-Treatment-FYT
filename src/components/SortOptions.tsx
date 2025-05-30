'use client';

import { SortOption } from '../lib/types';

interface SortOptionsProps {
  sortOption: SortOption;
  onChange: (option: SortOption) => void;
  hasLocationData: boolean;
}

export default function SortOptions({ sortOption, onChange, hasLocationData }: SortOptionsProps) {
  const handleSortChange = (field: 'price' | 'rating' | 'distance', direction: 'asc' | 'desc') => {
    onChange({ field, direction });
  };

  const sortOptions = [
    { field: 'price', direction: 'asc', label: 'Price: Low to High' },
    { field: 'price', direction: 'desc', label: 'Price: High to Low' },
    { field: 'rating', direction: 'desc', label: 'Highest Rated' },
    ...(hasLocationData ? [{ field: 'distance', direction: 'asc', label: 'Nearest First' }] : [])
  ] as const;

  return (
    <div 
      className="flex flex-wrap gap-2"
      role="radiogroup"
      aria-label="Sort options"
    >
      {sortOptions.map((option) => {
        const isActive = sortOption.field === option.field && sortOption.direction === option.direction;
        
        return (
          <button
            key={`${option.field}-${option.direction}`}
            onClick={() => handleSortChange(option.field, option.direction)}
            className={`
              px-3 py-1 text-sm rounded-full transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${isActive 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }
            `}
            role="radio"
            aria-checked={isActive}
            aria-label={option.label}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}