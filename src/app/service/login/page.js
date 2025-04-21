'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { GlobalContext } from "@/context";
import { motion } from 'framer-motion';

const InitialLoginForm = {
  email: '',
  password: ''
};

const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

export default function LoginPage() {
  const { setIsAuthUser } = useContext(GlobalContext);

  const [loginFormData, setLoginFormData] = useState(InitialLoginForm);
  const [loading, setLoading] = useState(true); // Loading state for the form

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    
    setTimeout(() => setLoading(false), 1000); // Adjust loading time
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginFormData),
        headers: { 'Content-Type': 'application/json' },
      });
  
      const data = await res.json();
  
      if (res.ok) {
        sessionStorage.setItem('token', data.token); // Store JWT in localStorage
        alert('Login successful!');
        setIsAuthUser(true); // Update user authentication status
        router.push('/'); // Redirect to home page
        setLoading(false);
      } else {
        setError(data.error || 'Login failed! Please try again.');
        setLoginFormData(InitialLoginForm); // Reset form
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='bg-white text-black'>
      <div className='mx-auto max-w-screen-2xl px-5'>
        <div className="flex items-center justify-center min-h-[600px] bg-white">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg w-96"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}>

            {loading ? (
              <>
                <SkeletonBox className="h-6 w-1/2 mx-auto mb-6" />
                <div className="space-y-4">
                  <SkeletonBox className="h-4 w-full" />
                  <SkeletonBox className="h-4 w-full" />
                  <SkeletonBox className="h-4 w-full" />
                  <SkeletonBox className="h-4 w-full" />
                  <SkeletonBox className="h-10 w-full mt-4" />
                  <SkeletonBox className="h-4 w-1/2 mx-auto mt-2" />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-center mb-6 text-black">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                  <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      value={loginFormData.email}
                      onChange={(e) => setLoginFormData({ ...loginFormData, email: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginFormData.password}
                        onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 text-white py-2 rounded hover:bg-black transition disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                  <a href="/service/forget-password" className="text-blue-500 hover:underline">Forgot password?</a>
                </p>
                <p className="text-center text-sm text-gray-600 mt-4">
                  Don't have an account? <a href="/service/signup" className="text-blue-500 hover:underline">Sign up</a> <br />
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
