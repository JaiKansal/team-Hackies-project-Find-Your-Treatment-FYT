'use client';

import Link from 'next/link';
import  Navbar  from '@/components/Navbar';

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-6">Your appointment has been successfully booked. You will receive a confirmation email shortly.</p>
            
            <div className="space-y-3">
              <Link 
                href="/"
                className="block w-full text-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Return to Home
              </Link>
              
              <Link 
                href="/results"
                className="block w-full text-center py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                Search More Hospitals
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}