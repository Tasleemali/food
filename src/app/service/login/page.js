"use client"
import { useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from "lucide-react"
import Link from 'next/link'
import { intiallogin } from '@/utils'
import { loginAction } from '@/action'
import { useRouter } from 'next/navigation'
import { GlobalContext } from '@/context'
import { useToast } from '@/hooks/use-toast'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const {toast}= useToast()
  const router = useRouter()
 const [loginData ,setLoginData] = useState(intiallogin)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

const {setIsAuthUser} =useContext(GlobalContext)
 

    async function handleSubmit() {
const result = await loginAction(loginData)
console.log(result)
if(result?.success){

router.push('/')
setIsAuthUser(true)
}
   
    let isValid = true

    

    if (isValid) {
      setLoading(true)
      // Simulate a login request
      setTimeout(() => {
        setLoading(false)
        alert('Login successful!')
      }, 2000)
    }
  }

  return (

    <div className='bg-white'>

   <div className=' mx-auto max-w-screen-xl w-full'>

  
    <div className="  mx-5 flex flex-col min-h-[600px] items-center justify-center bg-white">
      <div className=" w-full max-w-sm p-6 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}>
        
        <form action={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              value={loginData.email}
              onChange={(e) =>setLoginData({...loginData , email:e.target.value})}
              placeholder="Enter your email"
             
            />
          
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData , password:e.target.value})}
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
            {loading ? 'Loading...' : 'Login'}
          </Button>

          <p className='  py-5 text-sky-500 text-center'> new to seeit? <Link href="/service/signup"><span>SignUp</span></Link> </p>
        </form>
        </motion.div>
      </div>
    </div>
    </div>
    </div>
  )
}