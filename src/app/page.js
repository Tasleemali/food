"use client"
import Image from "next/image";
// import header_img from '../utils/frontend_assets/header_img.png'

import { food_list } from "@/utils";
import { useContext } from "react";
import { GlobalContext } from "@/context";
import SearchItems from "@/components/all-components/search";
import { motion } from "framer-motion";
import {

  CardContent,
  CardDescription,

} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import AppDownload from "./service/app-download";
import { useRouter } from "next/navigation";

export default function Home() {
  const router  = useRouter()
  const {searchItems, addcart} = useContext(GlobalContext)
  return (
  <div className="bg-white w-full">

<motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}>
    <div className="mx-auto max-w-screen-xl grid grid-cols-1 ">
       <SearchItems/>
    <div className=" mx-5 pt-5 bg-[url('../utils/frontend_assets/header_img.png')]  h-[500px] bg-cover bg-center rounded-md 
    
    
    " >
{/* <Image src={header_img}/> */}
<div className=" pl-10 mt-10 pt-10 text-white" >

        <h1 className=" font-bold text-5xl">Order Your
        Favirote Food</h1>
        <p className=''>
          Lorem ipsum dolor sit amet, consectetur <br />
           adipisicing elit. <br />
           Maiores quas accusamus, <br />
           saepe doloribus architecto
        </p>
<Button className='bg-amber-50 text-black'>View Menu</Button>
        </div >

       </div>
{/* items */}
<h1 className=" mx-5 pt-5 font-serif text-left md:text-3xl  ">Top Dishes Near You</h1>
       <div className=" px-5  grid grid-cols-2 gap-2 items-start lg:grid-cols-4 lg:gap-8 place-items-center py-8 ">
       
       
       
       {food_list.filter((food)=> food.name.toLowerCase().includes(searchItems.toLowerCase())).map((item) =>
        { 
        
       return(
       <div key={item.id} className=" mt-2 pt-2 h-[250px] md:h-[300px] lg:h-[350px]  border-2 border-gray-100 rounded-md shadow-lg"  >
       
       
       <CardContent onClick={() => router.push(``)}>
       
         <div className="grid w-full items-center  ">
       
           <div className="flex flex-col space-y-1.5">
       
             <Image className="w-[100px]  sm:w-[150px] md:w-[300px]" src={item.image} />
             <p className=''>{item.name}</p>
       
             <CardDescription className='h-10 w-[100px]  sm:w-[150px] md:w-[300px]" overflow-hidden overflow-x-hidden'>{item.description}</CardDescription>
       
       
             <p > <span className="text-red-500" >${item.price}</span></p>
       
           </div>
         </div>

          <Button  className='bg-green-500 w-full' onClick={()=>{ addcart(item )  ,router.push("/service/cart")}} >
          Add Cart
               </Button>
       
       </CardContent>
       
       
       
       
       
       
       
       </div>
       )
       
         }
         
         
       )}
       </div>

          <div className= " mx-5 text-center">
            <AppDownload/>
          </div>
 
    </div>
    </motion.div>
  </div>
  );
}
