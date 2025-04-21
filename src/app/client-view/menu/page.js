"use client"
import React, { useContext, useEffect, useState } from 'react'
import { menu_list, food_list } from '@/utils'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GlobalContext } from '@/context'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import SearchItems from '@/components/all-components/search'

function Menu() {
  const router = useRouter()
  const { foodFilter, setFoodFilter } = useContext(GlobalContext)
  const { searchItems, setSearchItems } = useContext(GlobalContext)
  const { addcart } = useContext(GlobalContext)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='bg-white text-black w-full'>
      <motion.div
        className="flex flex-col space-y-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className='max-w-screen-2xl px-4 md:px-10'>

          {/* Search Items */}
          <div className='mt-3'>
            {isLoading ? (
              <div className="h-10 w-full md:w-1/2 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <SearchItems />
            )}
          </div>

          {/* Menu List */}
          <div className="w-full mt-4">
            <div className="flex space-x-8 p-4 overflow-x-auto no-scrollbar md:overflow-x-visible justify-around">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2 animate-pulse">
                    <div className="w-10 h-10 md:w-20 md:h-20 bg-gray-200 rounded-full"></div>
                    <div className="h-3 w-12 bg-gray-200 rounded"></div>
                  </div>
                ))
              ) : (
                menu_list.map((item, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      setFoodFilter(prev =>
                        prev === item.menu_name ? 'all' : item.menu_name
                      )
                    }
                    className={`flex flex-col items-center cursor-pointer transition`}
                  >
                    <div className="w-10 h-10 md:w-20 md:h-20 rounded-full overflow-hidden">
                      <Image
                        src={item.menu_image}
                        alt={item.menu_name}
                        className={`${
                          foodFilter === item.menu_name
                            ? 'border-2 border-red-500 rounded-full p-1'
                            : ''
                        } w-full h-full object-cover`}
                      />
                    </div>
                    <p className="text-sm mt-2">{item.menu_name}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Food List */}
          <div className='mt-5 pt-5 grid grid-cols-2 md:grid-cols-4 gap-3 py-10'>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="mx-3 animate-pulse">
                  <div className="w-full h-auto max-w-sm">
                    <div className="w-full aspect-[4/4] bg-gray-200 rounded-lg"></div>
                    <div className="mt-2 space-y-2 px-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="px-2 py-3">
                      <div className="h-8 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              food_list
                .filter((food) =>
                  food.name.toLowerCase().includes(searchItems.toLowerCase())
                )
                .map((item, index) => {
                  if (foodFilter === 'all' || foodFilter === item.category) {
                    return (
                      <div key={index} className='mx-3 shadow-sm shadow-slate-300'>
                        <div className='w-full h-auto max-w-sm'>
                          <div
                            onClick={() =>
                              router.push(`/client-view/menu/${item._id}`)
                            }
                            className='w-full aspect-[4/4] bg-white relative'
                          >
                            <Image
                              className='w-full h-auto'
                              src={item.image}
                              alt={item.name}
                            />
                            <div className='mt-2 text-start'>
                              <h1 className='text-sm px-2'>{item.name}</h1>
                              <p className='text-gray-400 text-sm px-2'>
                                {item.description}
                              </p>
                              <p className='text-sm px-2'>₹{item.price}</p>
                            </div>
                            <div className='px-2 py-3'>
                              <Button
                                className='text-xs bg-green-500 text-white w-full font-semibold'
                                onClick={() => {
                                  addcart(item)
                                  router.push('/service/cart')
                                }}
                              >
                                ADD CART
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Menu
