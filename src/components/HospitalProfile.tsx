'use client';

import { useState } from 'react';
import { Hospital } from '@/lib/types';
import { useComparison } from '@/context/ComparisonContext';
import BookingForm from './BookingForm';

interface HospitalProfileProps {
  hospital: Hospital;
}

export default function HospitalProfile({ hospital }: HospitalProfileProps) {
  const { addToComparison, removeFromComparison, comparisonList } = useComparison();
  const isInComparison = comparisonList.some(h => h.id === hospital.id);
  const [showBookingForm, setShowBookingForm] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white">{hospital.name}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Hospital Information</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">{hospital.address || 'Address not available'}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">{hospital.type}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Rating: {hospital.rating}/5</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Price Range: {hospital.price}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-gray-600">{hospital.contact || 'Contact not available'}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-gray-600">{hospital.email || 'Email not available'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Treatments */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Available Treatments</h2>
            <div className="flex flex-wrap gap-2">
              {hospital.treatments?.map((treatment, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {treatment}
                </span>
              ))}
            </div>
          </div>

          {/* Facilities */}
          {hospital.facilities && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Facilities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hospital.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center pt-6 border-t">
            <button
              onClick={() => isInComparison ? removeFromComparison(hospital) : addToComparison(hospital)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isInComparison
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {isInComparison ? 'Remove from Comparison' : 'Add to Comparison'}
            </button>

            <button
              onClick={() => setShowBookingForm(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {showBookingForm && (
        <BookingForm
          hospital={hospital}
          onClose={() => setShowBookingForm(false)}
        />
      )}
    </>
  );
} 