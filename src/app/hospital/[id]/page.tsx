'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import HospitalProfile from '@/components/HospitalProfile';
import { Hospital } from '@/lib/types';
import { filterHospitals } from '@/lib/api/googleSheets';

export default function HospitalPage() {
  const params = useParams();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHospital = async () => {
      try {
        // In a real app, this would be an API call to get a single hospital
        const hospitals = await filterHospitals('', '');
        const foundHospital = hospitals.find(h => h.id === params.id);
        if (foundHospital) {
          setHospital(foundHospital);
        }
      } catch (error) {
        console.error('Error loading hospital:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHospital();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Hospital Not Found</h1>
            <p className="text-gray-600">The hospital you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <HospitalProfile hospital={hospital} />
      </div>
    </div>
  );
} 