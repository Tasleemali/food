"use client"
import { useState ,useEffect, useContext } from 'react';
import React from 'react'
import Link from 'next/link';
import { GlobalContext } from '@/context';
import { Mail, User } from 'lucide-react';
import LogOut from '@/components/all-components/logoutbtn';
  function Account() {
    const {isAuthUser} = useContext(GlobalContext)
  const [user, setUser] = useState(null);
  const [loading ,setLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }finally{
        setLoading(false)
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="bg-white text-black">
        <div className="mx-auto max-w-screen-xl px-5">
          <div className="flex flex-col bg-white">
            {/* Skeleton Header */}
            <header className="px-4 lg:px-6 h-14 flex items-center border-b">
              <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
            </header>

            {/* Skeleton Content */}
            <main className="flex-1 p-4 lg:p-6">
              <div className="space-y-8">
                {/* Skeleton for Name and Email */}
                <div className="flex items-center space-x-4 animate-pulse">
                  <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                  <div className="w-32 h-6 bg-gray-300 rounded"></div>
                </div>
                <div className="flex items-center space-x-4 animate-pulse">
                  <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                  <div className="w-32 h-6 bg-gray-300 rounded"></div>
                </div>
                {/* Skeleton Logout Button */}
                <div className="h-10 w-32 bg-gray-300 rounded-md animate-pulse"></div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='bg-white text-black'>
    <div className='mx-auto max-w-screen-xl px-5 '>
      <div className="flex flex-col  bg-white">
        {isAuthUser ?
          <div> <header className="px-4 lg:px-6 h-14 flex items-center border-b">
            <h1 className="text-2xl font-bold">Your Account Details</h1>
          </header>
            <main className="flex-1 p-4 lg:p-6">
              <div className="space-y-8">

                <div className="flex items-center space-x-4">
                  <User className="h-6 w-6" />
                  <div>
                    <p className="text-lg font-bold">Name</p>
                    <p className="text-gray-500">{user?.username}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6" />
                  <div>
                    <p className="text-lg font-bold">Email</p>
                    <p className="text-gray-500">{user?.email}</p>
                  </div>
                
                </div>
               
                <LogOut />
              </div>
            </main>  </div> : <div className=" h-[400px] grid place-content-center "> <Link href="/service/login"> <button className=" bg-black text-white px-10 py-3 rounded-md">Get Your Account</button> </Link></div>}

      </div>
    </div>
  </div>
  )
}

export default Account
