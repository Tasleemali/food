"use client"
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GlobalContext } from '@/context'
import { Minus, Plus } from "lucide-react"
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useRouter } from 'next/navigation'

export default function CartPage() {
const router = useRouter()
  const { cartItems, addcart, reversecart, removecart, isAuthUser } = useContext(GlobalContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)  // Simulate data fetching time
    return () => clearTimeout(timer)
  }, [])

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) * 1; // Convert to paise

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-screen-xl px-5 '>
        <div className="flex flex-col bg-white">
          <header className="px-4 lg:px-6 h-14 flex items-center border-b">
            <h1 className="text-2xl font-bold">Your Cart</h1>
          </header>
          <main className="flex-1 p-4 lg:p-6">
            {loading ? (
              // Skeleton Loader for Cart Items
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="p-4 bg-gray-200 animate-pulse rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="h-20 w-20 bg-gray-300 rounded"></div>
                      <div className="w-32 h-4 bg-gray-300 rounded"></div>
                      <div className="w-20 h-4 bg-gray-300 rounded"></div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <div className="h-4 w-32 bg-gray-300 rounded"></div>
                      <div className="h-4 w-32 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <Card key={index} className="p-4">
                    <CardHeader className="flex justify-between items-center">
                      <Image src={item.image} className='h-20 w-auto md:h-28 md:w-auto' alt={item.name} />
                      <CardTitle>{item.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" onClick={() => { item.qty > 1 ? reversecart(item) : null }} className='hover:bg-red-700 hover:text-white'>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-bold">{item.qty}</span>
                        <Button variant="outline" size="icon" onClick={() => addcart(item)} className='hover:bg-green-400 hover:text-white'>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div>
                        <Button variant="outline" size="icon" onClick={() => removecart(item._id)} className='hover:bg-red-700 hover:text-white'>
                          X
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="flex justify-between items-center">
                      <CardDescription>Price: ₹{item.price}</CardDescription>
                      <CardDescription>Total: ₹{(item.qty * item.price)}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
                <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Total Price</h2>
                    <p className="text-2xl font-bold">₹{totalAmount}</p>
                  </div>
                </div>
                <div className='w-full'>
                  {isAuthUser?   <button className='px-3 py-2 bg-orange-500 w-24 rounded-md font-semibold' onClick={()=>router.push("/service/checkout")}>Order</button>  :   <button className='px-3 py-2 bg-blue-500 w-28 rounded-md font-semibold ' onClick={()=>router.push("/service/login")}>Login to Order</button> }
                
                   
                </div>
              </div>
            ) : (
              <div className="text-center mt-10">
                <p className="text-xl font-bold">Your cart is empty</p>
                <p className="text-gray-500">Add some items to your cart to get started.</p>
                <Link href='/'><button className='mt-4 w-[200px] bg-black text-white py-1'>Shop Now</button></Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
