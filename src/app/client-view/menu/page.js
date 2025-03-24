"use client"
import React, { useContext, } from 'react'
import { menu_list } from '@/utils'
import Image from 'next/image'
import { food_list } from '@/utils'
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
  return (
    <div className='bg-white text-black w-full'>

      <motion.div
        className="flex flex-col space-y-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}>

        <div className=' max-w-screen-2xl px-4 md:px-10 '>
          {/* search items */}
          <div className='mt-3'>
            <SearchItems />
          </div>
          {/* menu list */}
          <div className="w-full ">
            <div className="flex space-x-8 p-4 overflow-x-auto no-scrollbar md:overflow-x-visible justify-around">
              {menu_list.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setFoodFilter(prev => prev === item.menu_name ? 'all' : item.menu_name)}
                  className={`flex flex-col items-center cursor-pointer transition `} >
                  <div className="w-10 h-10 md:w-20 md:h-20 rounded-full overflow-hidden">
                    <Image src={item.menu_image} alt={item.menu_name}   className={` ${foodFilter === item.menu_name ? "border-2 border-red-500 rounded-full p-1" : ""
                      }w-full h-full object-cover`} />
                  </div>
                  <p className="text-sm mt-2">{item.menu_name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* food list */}
          <div className='mt-5 pt-5  grid grid-cols-2 md:grid-cols-4 gap-3 py-10 '>
            {food_list.filter((food) => food.name.toLowerCase().includes(searchItems.toLowerCase())).map((item, index) => {
              if (foodFilter === 'all' || foodFilter === item.category) {
                return (
                  <div key={index} className='mx-3  shadow-sm shadow-slate-300 '>
                    <div className='  w-full h-auto max-w-sm '>
                      <div  onClick={()=> router.push(`/client-view/menu/${item._id}`)} className='  w-full aspect-[4/4]  bg-white relative'>
                        <Image className='w-full h-auto' src={item.image} alt={item.name} />
                        <div className=' mt-2  text-start'>
                          <h1 className='text-sm px-2'>{item.name}</h1>
                          <p className='text-gray-400 text-sm px-2'>{item.description}</p>
                          <p className='text-sm px-2'><span className='text-green-500'>$</span>{item.price}</p>
                         </div>
                        <div className='px-2 py-3'>
                          <Button className=' text-xs bg-slate bg-green-500 ext-white w-full font-semibold '
                            onClick={() => { addcart(item), router.push("/service/cart") }} >
                            ADD CART
                          </Button>
                        
                        </div>

                      </div>

                    </div>
                  </div>
                )
              }
            })}

          </div>

        </div>

      </motion.div>
    </div>
  )
}

export default Menu


