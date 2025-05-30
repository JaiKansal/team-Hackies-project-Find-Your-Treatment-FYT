'use client';

import  Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Find My Treatment</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming healthcare accessibility in India through technology and innovation
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 text-lg mb-4">
            At Find My Treatment (FYT), we're on a mission to simplify healthcare access in India. 
            We believe that finding and booking medical appointments should be as easy as ordering food online.
          </p>
          <p className="text-gray-600 text-lg">
            Our platform connects patients with the right hospitals and treatments, making healthcare 
            more accessible, transparent, and efficient for everyone.
          </p>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Our Team</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/team/jai.jpg"
                  alt="Jai Kansal"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Jai Kansal</h3>
              <p className="text-gray-600">Co-Founder & CEO</p>
              <p className="text-gray-500 mt-2">
                Passionate about healthcare technology and improving patient experiences
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/team/manya.jpg"
                  alt="Manya Goel"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Manya Goel</h3>
              <p className="text-gray-600">Co-Founder & CTO</p>
              <p className="text-gray-500 mt-2">
                Expert in building scalable healthcare solutions and user-centric platforms
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessibility</h3>
              <p className="text-gray-600">
                Making healthcare accessible to everyone, everywhere
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Continuously improving our platform with cutting-edge technology
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust</h3>
              <p className="text-gray-600">
                Building trust through transparency and reliability
              </p>
            </div>
          </div>
        </div>

        {/* Join Us Section */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Join Our Mission</h2>
          <p className="text-gray-600 mb-8">
            We're always looking for passionate individuals to join our team
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </main>
    </div>
  );
} 