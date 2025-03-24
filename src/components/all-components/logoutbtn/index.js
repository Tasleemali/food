"use client"

import { logoutAction } from '@/action'
import { Button } from '@/components/ui/button'
import { GlobalContext } from '@/context'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

function LogOut() {
    const {isAuthUser ,setIsAuthUser} = useContext(GlobalContext)
    const router = useRouter()
    const logout = () => {
      localStorage.removeItem("token"); // Remove JWT token
      router.push("/service/login"); // Redirect to login page
      setIsAuthUser(false)
    }

  return (
    <div>
        {isAuthUser?
 <Button onClick={logout}>LogOut</Button>:null
        }
     
    </div>
  )
}

export default LogOut
