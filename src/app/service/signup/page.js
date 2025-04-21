'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

const IntialSignUpForm = {
  username: '',
  email: '',
  address: '',
  password: '',
};

const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

export default function SignUpPage() {
  const [signUpFormData, setSignUpFormData] = useState(IntialSignUpForm);
  const [loading, setLoading] = useState(true); // Form loading on mount
  const [submitting, setSubmitting] = useState(false); // Form submission state
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Simulate loading (e.g., fetching something)
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(signUpFormData),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (res.ok) {
        alert('Signup successful! Please login.');
        setSignUpFormData(IntialSignUpForm);
        router.push('/service/login');
      } else {
        setError(data.error || 'Signup failed! Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-black">
      <div className="mx-auto max-w-screen-2xl px-5">
        <div className="flex items-center justify-center min-h-[600px] bg-white">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
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
                <h2 className="text-2xl font-bold text-center mb-6 text-black">SignUp</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                  <div>
                    <label className="block text-gray-700">Username</label>
                    <input
                      type="text"
                      value={signUpFormData.username}
                      onChange={(e) =>
                        setSignUpFormData({ ...signUpFormData, username: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      value={signUpFormData.email}
                      onChange={(e) =>
                        setSignUpFormData({ ...signUpFormData, email: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">Address</label>
                    <input
                      type="text"
                      value={signUpFormData.address}
                      onChange={(e) =>
                        setSignUpFormData({ ...signUpFormData, address: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signUpFormData.password}
                        onChange={(e) =>
                          setSignUpFormData({ ...signUpFormData, password: e.target.value })
                        }
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
                    disabled={submitting}
                  >
                    {submitting ? 'Signing up...' : 'Sign Up'}
                  </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                  Already have an account?{' '}
                  <a href="/service/login" className="text-blue-500 hover:underline">
                    Login
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
