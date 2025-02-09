"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from "lucide-react"
import Link from 'next/link'
import { intialSignup } from '@/utils'
import { SinupAction } from '@/action'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
export default function SignUpPage() {
const router = useRouter()
 const [signUpData ,setSingnUpData] = useState(intialSignup)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  

   console.log(signUpData)

  async function handleSubmit(e){
 const result = await SinupAction(signUpData)
 console.log(result)
 if(result?.success){
      router.push("/service/login")
 }

    e.preventDefault()
    let isValid = true
    

    if (isValid) {
      setLoading(true)
      // Simulate a login request
      setTimeout(() => {
        setLoading(false)
        alert('signup successful!')
      }, 2000)
    }
  }

  return (

    <div className='bg-white'>

   <div className=' mx-auto max-w-screen-xl w-full'>

  
    <div className="  mx-5 flex flex-col min-h-[600px] items-center justify-center bg-white">
      <div className=" w-full max-w-sm p-6 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">SignUp</h2>

        <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}>
        <form action={handleSubmit}>

        <div className="space-y-2">
            <label htmlFor="username">Username</label>
            <Input
              id="username"
              type="text"
            value={signUpData.username}
            onChange={(e)=>setSingnUpData({...signUpData , username:e.target.value})}
              placeholder="Enter your username"

            
            />
            
          </div>


          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              value={signUpData.email}
            onChange={(e)=>setSingnUpData({...signUpData , email:e.target.value})}
              placeholder="Enter your email"
              
            />
           
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={signUpData.password}
                onChange={(e)=>setSingnUpData({...signUpData , password:e.target.value})}
                placeholder="Enter your password"
               
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
          <Button type="submit" disabled={loading} className=" mt-5 w-full">
            {loading ? 'Loading...' : 'signUp'}
          </Button>

          <p className='  py-5 text-sky-500 text-center'> new to seeit? <Link href="/login"><span>SignUp</span></Link> </p>
        </form>
        </motion.div>
      </div>
    </div>
    </div>
    </div>
  )
}