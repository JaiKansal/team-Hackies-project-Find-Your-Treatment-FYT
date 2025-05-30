'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BookingForm from '@/components/BookingForm';
import { getHospitalById } from '@/app/lib/api/googleSheets';
import { Hospital } from '@/lib/types';

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hospitalId = searchParams.get('hospital');
  
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function loadHospital() {
      if (!hospitalId) {
        setError('No hospital selected');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const data = await getHospitalById(hospitalId);
        if (!data) {
          setError('Hospital not found');
        } else {
          setHospital(data);
        }
      } catch (error) {
        console.error('Error loading hospital details:', error);
        setError('Failed to load hospital details');
      } finally {
        setLoading(false);
      }
    }
    
    loadHospital();
  }, [hospitalId]);
  
  const handleClose = () => {
    router.push('/results');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Book an Appointment</h1>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => router.push('/results')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Search
                </button>
              </div>
            ) : hospital ? (
              <BookingForm
                hospital={hospital}
                onClose={handleClose}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}