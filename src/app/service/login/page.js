'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Eye  ,EyeOff } from 'lucide-react';
import { GlobalContext } from "@/context";
import { motion } from 'framer-motion';

const IntialLoginForm = {
  email:'',
  password:''
}
export default function LoginPage() {
  const {setIsAuthUser} = useContext(GlobalContext)

const [loginFormData ,setLoginFormData] =useState(IntialLoginForm)
console.log(loginFormData)
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(loginFormData),
        headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (res.ok) {
        localStorage.setItem("token", data.token);
        setLoading(false)
        alert("Login successful!");
        router.push("/");
        
         setIsAuthUser(true)
    } else {
      
        alert(data.error);
        setLoading(false)
        setLoginFormData(IntialLoginForm)
    }
};


  return (
    <div className='bg-white text-black'>

    
    <div className='mx-auto max-w-screen-2xl px-5 '>

   
    <div className="flex items-center justify-center min-h-[600px] bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Login</h2>
        
        <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={loginFormData.email}
              onChange={(e) => setLoginFormData({...loginFormData, email:e.target.value})}
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
                onChange={(e)=>setLoginFormData({...loginFormData , password:e.target.value})}
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
          Don't have an account? <a href="/service/signup" className="text-blue-500 hover:underline">Sign up</a> <br/>
        </p>
       
        </motion.div>
      </div>
      
     
      

    </div>
   
    </div>
    </div>
  );
}
