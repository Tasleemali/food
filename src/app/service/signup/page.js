'use client';



import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Eye  ,EyeOff } from 'lucide-react';

import { motion } from 'framer-motion';

const IntialSignUpForm = {
  username:'',
  email:'',
  password:'',
  mobile: ""
}
export default function SignUpPage() {

const [signUpFormData ,setSignUpFormData] =useState(IntialSignUpForm)
console.log(signUpFormData)
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter();


  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(signUpFormData),
        headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
  if (res.ok) {
    setLoading(false)
      alert("Signup successful! Please login.");
      setSignUpFormData(IntialSignUpForm)
      router.push("/service/login");
      
  } else {
      alert(data.error);
      setLoading(false);
      setSignUpFormData(IntialSignUpForm)
  }
};


  return (
    <div className='bg-white text-black'>

    
    <div className='mx-auto max-w-screen-2xl px-5 '>

   
    <div className="flex items-center justify-center min-h-[600px] bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">SignUp</h2>
        
        <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="test"
              value={signUpFormData.username}
              onChange={(e) => setSignUpFormData({...signUpFormData, username:e.target.value})}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={signUpFormData.email}
              onChange={(e) => setSignUpFormData({...signUpFormData, email:e.target.value})}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="tel"
              value={signUpFormData.number}
              onChange={(e) => setSignUpFormData({...signUpFormData, mobile:e.target.value})}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
            
                type={showPassword ? 'text' : 'password'}
                value={signUpFormData.password}
                onChange={(e)=>setSignUpFormData({...signUpFormData , password:e.target.value})}
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
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account? <a href="/service/login" className="text-blue-500 hover:underline">Login</a> <br/>
        </p>
       
        </motion.div>
      </div>
      
     
      

    </div>
   
    </div>
    </div>
  );
}
