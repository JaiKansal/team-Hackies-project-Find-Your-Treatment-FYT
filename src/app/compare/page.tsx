'use client';

import { useComparison } from '@/context/ComparisonContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function ComparePage() {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison();

  if (comparisonList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">No Hospitals Selected for Comparison</h1>
            <p className="text-gray-600 mb-6">Add hospitals to your comparison list to see them side by side.</p>
            <Link
              href="/hospitals"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Browse Hospitals
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Compare Hospitals</h1>
          <button
            onClick={clearComparison}
            className="px-4 py-2 text-red-600 hover:text-red-700 font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisonList.map((hospital) => (
            <div key={hospital.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{hospital.name}</h2>
                <button
                  onClick={() => removeFromComparison(hospital)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Type</h3>
                  <p className="mt-1 text-gray-900">{hospital.type}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Rating</h3>
                  <div className="mt-1 flex items-center">
                    <span className="text-gray-900">{hospital.rating}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Price Range</h3>
                  <p className="mt-1 text-gray-900">{hospital.price}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Treatments</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {hospital.treatments.map((treatment, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        {treatment}
                      </span>
                    ))}
                  </div>
                </div>

                {hospital.facilities && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Facilities</h3>
                    <ul className="mt-2 space-y-1">
                      {hospital.facilities.map((facility, index) => (
                        <li key={index} className="flex items-center text-gray-900">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {facility}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4">
                  <Link
                    href={`/hospital/${hospital.id}`}
                    className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}