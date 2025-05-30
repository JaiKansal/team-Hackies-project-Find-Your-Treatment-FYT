'use client';

import { useComparison } from '@/context/ComparisonContext';
import { Hospital } from '@/lib/types';

interface ComparisonButtonProps {
  hospital: Hospital;
  className?: string;
}

export default function ComparisonButton({ hospital, className = '' }: ComparisonButtonProps) {
  const { addToComparison, removeFromComparison, comparisonList } = useComparison();
  const isComparing = comparisonList.some(h => h.id === hospital.id);

  const handleClick = () => {
    if (isComparing) {
      removeFromComparison(hospital);
    } else {
      addToComparison(hospital);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        isComparing
          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      } ${className}`}
      aria-label={isComparing ? 'Remove from comparison' : 'Add to comparison'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${isComparing ? 'text-blue-600' : 'text-gray-600'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={isComparing
            ? "M6 18L18 6M6 6l12 12"
            : "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          }
        />
      </svg>
      {isComparing ? 'Remove from Compare' : 'Add to Compare'}
    </button>
  );
} 