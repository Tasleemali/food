"use client"
import React, { Fragment, useContext, useState } from 'react'
import { menu_list } from '@/utils'
import Image from 'next/image'
import { food_list } from '@/utils'
import SearchItems from '@/components/all-components/search'
import { motion } from 'framer-motion'

import {

  CardContent,
  CardDescription,

} from "@/components/ui/card"
import { GlobalContext } from '@/context'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

function Menu() {

   const  {toast} = useToast()

  const router = useRouter()
const {foodFilter ,setFoodFilter} = useContext(GlobalContext)
const {searchItems ,setSearchItems} = useContext(GlobalContext)
const { addcart } = useContext(GlobalContext)




  return (
    <div className='bg-white py-4 w-full'>

<motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}>

<div className=' mx-auto max-w-screen-xl   '>
  
  <SearchItems/>

<div className=' mx-auto  flex flex-wrap  justify-center items-center gap-10 md:gap-20  '>
{menu_list.map(item => <div onClick={()=>setFoodFilter(prev=> prev === item.menu_name? 'all':item.menu_name)} className=' flex flex-col  justify-center items-center cursor-pointer  '>
     <Image className={`${foodFilter === item.menu_name?"border-2 border-red-500 rounded-[50%]":  ''}  w-[50px] md:w-[100]  h-auto`}  src={item.menu_image}/>
   <p>{item.menu_name}</p>


</div>)}


</div>
{/* foodd list */}
<h1 className=' pt-6 text-center font-serif text-3xl f '>Our Foods</h1>
<div className=" px-5 mt-2 grid grid-cols-2 gap-2 items-start lg:grid-cols-4 lg:gap-8 place-items-center  lg:mt-8">



{food_list.filter((food)=> food.name.toLowerCase().includes(searchItems.toLowerCase())).map((item , index) =>
 { 
  if(foodFilter === 'all'  || foodFilter === item.category ){
return(
<div   key={index}   className=" mt-2 pt-2 h-[300px] md:h-[400px]   border-2 border-gray-100 rounded-md shadow-lg"  >

{/* onClick={()=>router.push(`/client-view/menu/${item.id}`)}  */}
<CardContent >

  <div className="grid w-full items-center  ">

    <div className="flex flex-col space-y-1.5">

      <Image className="w-[100px]  sm:w-[150px] md:w-[300px]" src={item.image} alt='not' />
      <p className=''>{item.name}</p>

      <CardDescription className='h-10 w-[100px]  sm:w-[150px] md:w-[300px]" overflow-hidden overflow-x-hidden'>{item.description}</CardDescription>


      <p > <span className="text-red-500" >${item.price}</span></p>

    </div>
  </div>

{/* 
{!cartItems[item._id] ? <Button onClick={()=>{addinstant(item._id),router.push("/service/cart")}}>+</Button>:
<div>
<Button>-</Button>
<p>{cartItems[item._id]}</p>
  
  <Button onClick={()=>{addinstant(item._id), router.push("/service/cart")}}>+</Button>
  </div>} */}

  <Button  className='bg-green-500 w-full' onClick={()=>{ addcart(item ) ,toast({
   title: "add product ",
  })   ,router.push("/service/cart")}} >
 Add Cart
      </Button>
   


    

</CardContent>







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
