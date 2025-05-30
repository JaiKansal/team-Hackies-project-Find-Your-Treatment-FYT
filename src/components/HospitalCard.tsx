'use client';

import Link from 'next/link';
import { Hospital } from '../lib/types';
import { formatPrice } from '../lib/utils';
import { useComparison } from '@/context/ComparisonContext';

interface HospitalCardProps {
  hospital: Hospital;
  onAddToComparison: () => void;
  isInComparison: boolean;
}

export default function HospitalCard({ hospital, onAddToComparison, isInComparison }: HospitalCardProps) {
  const { addToComparison, removeFromComparison, comparisonList } = useComparison();

  // Ensure treatments is always an array
  const treatments = hospital.treatments || [];
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <Link href={`/hospital/${hospital.id}`} className="group">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            {hospital.name}
          </h3>
        </Link>
        <button
          onClick={onAddToComparison}
          className={`px-4 py-2 rounded-lg ${
            isInComparison
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } transition-colors`}
        >
          {isInComparison ? 'Added' : 'Compare'}
        </button>
      </div>

      <p className="text-gray-600 mb-4">{hospital.address}</p>

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
        <span className="text-lg font-semibold text-gray-800">{hospital.price}</span>
        <Link
          href={`/hospital/${hospital.id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}