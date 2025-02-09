"use client"

import { logoutAction } from '@/action'
import { Button } from '@/components/ui/button'
import { GlobalContext } from '@/context'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

function LogOut() {
    const {isAuthUser} = useContext(GlobalContext)
    const router = useRouter()
async function logoutbtn() {
      const result = await logoutAction()
        if (result?.success) {
          alert('logout succesful')
          router.push('service/login')
        }
}

  return (
    <div>
        {isAuthUser?
 <Button onClick={logoutbtn}>LogOut</Button>:null
        }
     
    </div>
  )
}

export default LogOut
