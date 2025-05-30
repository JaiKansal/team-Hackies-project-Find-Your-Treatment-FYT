'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import  Navbar  from '@/components/Navbar';
import BookingForm  from '@/components/BookingForm';
import { Hospital } from '@/lib/types';
import { getHospitalById } from '@/app/lib/api/googleSheets';

export default function HospitalDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([
    { id: 1, name: 'John D.', rating: 4.5, comment: 'Great service and professional staff.', date: '2023-10-15' },
    { id: 2, name: 'Sarah M.', rating: 5, comment: 'Excellent facilities and caring doctors.', date: '2023-09-22' },
    { id: 3, name: 'Robert K.', rating: 4, comment: 'Good experience overall, but waiting time was a bit long.', date: '2023-11-05' },
  ]);

  useEffect(() => {
    async function loadHospital() {
      setLoading(true);
      try {
        const data = await getHospitalById(id);
        setHospital(data);
      } catch (error) {
        console.error('Error loading hospital details:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadHospital();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Hospital Not Found</h1>
            <p className="mb-4">Sorry, we couldn't find the hospital you're looking for.</p>
            <Link href="/results" className="text-blue-600 hover:underline">
              ← Back to search results
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/results" className="text-blue-600 hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to search results
          </Link>
        </div>
        
        {/* Hospital Details Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800">{hospital.name}</h1>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                {hospital.type}
              </span>
            </div>
            
            <p className="text-gray-600 mt-2 text-lg">{hospital.location}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-700">{hospital.description}</p>
                
                // In the treatments section
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Treatments Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {hospital.treatments ? (
                      hospital.treatments.map((treatment, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">
                          {treatment}
                        </span>
                      ))
                    ) : hospital.treatment ? (
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">
                        {hospital.treatment}
                      </span>
                    ) : (
                      <span className="text-gray-500">No treatments listed</span>
                    )}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Starting Price</h3>
                  <p className="text-2xl font-bold text-gray-800">₹{hospital.price.toLocaleString()}</p>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Rating</h3>
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < Math.floor(hospital.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-700">{hospital.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                  {/* Google Maps Embed */}
                  <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    allowFullScreen 
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(hospital.name + ' ' + hospital.location)}&center=${hospital.lat},${hospital.long}`} 
                  ></iframe>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <p className="text-gray-700">Phone: +91 XXXXXXXXXX</p>
                  <p className="text-gray-700">Email: contact@{hospital.name.toLowerCase().replace(/\s+/g, '')}hospital.com</p>
                </div>
                
                <div className="mt-6">
                  <Link 
                    href={`/booking?hospital=${hospital.id}`}
                    className="block w-full text-center py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Reviews & Ratings</h2>
            
            <div className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{review.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-600">{review.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="mt-3 text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}