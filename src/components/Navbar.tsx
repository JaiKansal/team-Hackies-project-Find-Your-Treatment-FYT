'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">FYT</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/hospitals" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-blue-500">
                Hospitals
              </Link>
              <Link href="/compare" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-blue-500">
                Compare
              </Link>
              <Link href="/about" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-blue-500">
                About
              </Link>
              <Link href="/contact" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-blue-500">
                Contact
              </Link>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="text-gray-900 hover:text-blue-600">
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-900 hover:text-blue-600"
                >
                  Sign Out
                </button>
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    {session.user?.name?.[0] || 'U'}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-900 hover:text-blue-600">
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/hospitals" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">
              Hospitals
            </Link>
            <Link href="/compare" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">
              Compare
            </Link>
            <Link href="/about" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">
              About
            </Link>
            <Link href="/contact" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">
              Contact
            </Link>
            {session ? (
              <>
                <Link href="/profile" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">
                  Sign In
                </Link>
                <Link href="/register" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}