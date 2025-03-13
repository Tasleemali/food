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
import { Minus, Plus, RemoveFormatting } from "lucide-react"
import { useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


export default function CartPage() {
  const router = useRouter()
  const { cartItems, setCartItems, addcart, reversecart, removecart, isAuthUser } = useContext(GlobalContext)
  console.log(cartItems)

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.qty * item.price, 0).toFixed(2)
  }

  return (

    <div className='bg-white'>
      <div className='mx-auto max-w-screen-xl px-5 '>


        <div className="flex flex-col min-h-screen bg-white">
          <header className="px-4 lg:px-6 h-14 flex items-center border-b">
            <h1 className="text-2xl font-bold">Your Cart</h1>
          </header>
          <main className="flex-1 p-4 lg:p-6">
            {!cartItems ? (
              <div className="text-center mt-10">
                <p className="text-xl font-bold">Your cart is empty</p>
                <p className="text-gray-500">Add some items to your cart to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-4">
                    <CardHeader className="flex justify-between items-center">
                      <Image src={item.image} className=' h-20 w-auto  md:h-28 md:w-auto' />
                      <CardTitle>{item.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" onClick={() => { item.qty > 1 ? reversecart(item) : null }} className='hover:bg-red-700 hover:text-white'   >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-bold">{item.qty}</span>
                        <Button variant="outline" size="icon" onClick={() => addcart(item)} className='hover:bg-green-400 hover:text-white' >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div>
                        <Button variant="outline" size="icon" onClick={() => removecart(item._id)} className='hover:bg-red-700 hover:text-white' >
                          X
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="flex justify-between items-center">
                      <CardDescription>Price: ${item.price}</CardDescription>
                      <CardDescription>Total: ${(item.qty * item.price)}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
                <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Total Price</h2>
                    <p className="text-2xl font-bold">${calculateTotalPrice()}</p>
                  </div>
                </div>
              </div>
            )}


          </main>

          {isAuthUser ? <Button onClick={() => router.push('/checkout')}>CheckOut</Button> :
            <Button onClick={() => router.push('/service/login')}>login to go cart</Button>

          }
          <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 lg:px-6 border-t">
            <p className="text-xs text-gray-500">© 2023 Foodie Website. All rights reserved.</p>
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
