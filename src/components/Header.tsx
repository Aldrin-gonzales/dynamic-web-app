'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  if (['/login', '/register', '/'].includes(pathname)) return null;

  const navLinks = (
    <>
      <Link href="/" className="block text-white hover:bg-green-600 px-4 py-2 transition duration-300 rounded">Home</Link>
      <Link href="/users" className="block text-white hover:bg-green-600 px-4 py-2 transition duration-300 rounded">Users</Link>
      <Link href="/posts" className="block text-white hover:bg-green-600 px-4 py-2 transition duration-300 rounded">Posts</Link>
      <Link href="/chart" className="block text-white hover:bg-green-600 px-4 py-2 transition duration-300 rounded">Dashboard</Link>
    </>
  );

  return (
<header className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md z-[9999]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo or title (optional) */}
          <div className="text-white text-xl font-bold">AppDev</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            {pathname !== '/myposts' && navLinks}
            {user && (
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-600 transition font-medium"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-md px-4 py-4 space-y-2">
          {pathname !== '/myposts' && navLinks}
          {user && (
            <button
              onClick={handleLogout}
              className="block w-full text-left text-red-400 hover:text-red-600 font-medium"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
