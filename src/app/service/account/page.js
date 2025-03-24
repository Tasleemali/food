"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { User, Mail } from "lucide-react"

import LogOut from "../../../components/all-components/logoutbtn"
import { useEffect, useState } from "react"


  function UserDetailsPage() {
const [user ,setUser] = useState('')


      useEffect(()=>{
        const fetchUser = async () => {
          try {
            const token = localStorage.getItem("token")
            if(!token) return

            const res = await fetch("/api/auth/me",{
              method:"GET",
              headers: { Authorization: `Bearer ${token}` },

            })
            const data = await res.json()
            if(res.ok){
              setUser(data)
            }
              
          } catch (error) {
            console.error("Error fetching user:", error);
          }
          
        }
        fetchUser()
      },[])

   console.log(user)

  return (

    <div className='bg-white'>
<div className='mx-auto max-w-screen-xl px-5 '>
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <h1 className="text-2xl font-bold">Your Account Details</h1>
      </header>
      <main className="flex-1 p-4 lg:p-6">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>View and update your profile details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>
          {/* logout */}
         <LogOut/>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 lg:px-6 border-t">
       
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
    </div>
    </div>
  )
}

export default UserDetailsPage



