'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-4 flex space-x-6">
        <Link href="/" className="text-gray-800 hover:text-blue-600">Home</Link>
        <Link href="/users" className="text-gray-800 hover:text-blue-600">Users</Link>
        <Link href="/posts" className="text-gray-800 hover:text-blue-600">Posts</Link>
        <Link href="/dashboard" className="text-gray-800 hover:text-blue-600">Dashboard</Link>
        <Link href="/login" className="text-gray-800 hover:text-blue-600">Login</Link>
        <Link href="/register" className="text-gray-800 hover:text-blue-600">Register</Link>
      </nav>
    </header>
  );
}
