'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js router for client-side navigation

{/*In area State Management for form field and error message. It store email input, password input, and error message*/}
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Clean and normalize input values
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (cleanEmail === 'admin@admin.com' && cleanPassword === 'admin123') {
      const adminUser = {
        id: 0,
        name: 'Admin',
        email: 'admin@admin.com',
        isAdmin: true,
      };
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(adminUser));
      setTimeout(() => {
        router.push('/posts');
      }, 100);
      return;
    }

    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    // Find user by email
    const user = users.find((u: any) => u.email.toLowerCase() === cleanEmail);

    // Check if user exists and password matches username
    if (user && cleanPassword === user.username) {
      localStorage.setItem('user', JSON.stringify({ ...user, isAdmin: false }));
      router.push('/myposts');
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        {/*Header section*/}
        <div className="text-center mb-6">

          <h1 className="text-3xl font-bold text-gray-800 mt-2">Welcome Back</h1>
          <p className="text-gray-600 text-sm">Sign in to continue</p>
        </div>

        {/*Login form*/]
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            {/*Email input field*/}
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. user@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/*Password input field*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/*Error message delay*/}
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          {/*Submit button*/}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Log In
            </button>
          </div>

          {/*Registration link*/}
          <div className="text-center mt-4">
            <a href="/register" className="text-blue-600 hover:underline text-sm">
              Don’t have an account? Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
