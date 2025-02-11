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
  const router = useRouter()
  const { searchItems, addcart } = useContext(GlobalContext)
  return (
    <div className="bg-white w-full">

      <motion.div
        className="flex flex-col space-y-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}>
        <div className="mx-auto max-w-screen-xl grid grid-cols-1 ">
          <SearchItems />
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
          <div  className="pt-5 flex justify-center items-center  flex-wrap gap-5">

            {food_list.filter((food) => food.name.toLowerCase().includes(searchItems.toLowerCase())).map((item) => {

              return (
                <div key={item.id} className="  mt-2 pt-2 h-[300px] w-auto sm:h-[350px]   md:h-[450px]   border-2 border-gray-100 rounded-md  shadow-lg"    >

                  <CardContent >

                    <div className="grid w-full items-center  ">

                      <div className="flex flex-col space-y-1.5">

                        <Image className="w-[100px]  sm:w-[150px] md:w-[300px]" src={item.image} alt='not' />
                        <p className="text-xs sm:text-sm md:text-lg" >{item.name}</p>

                        <CardDescription className=' w-[100px]  sm:w-[150px] md:w-[300px] text-xs sm:text-sm md:text-lg overflow-clip'>{item.description}</CardDescription>

                        <p > <span className="text-red-500" >${item.price}</span></p>
                      </div>
                    </div>
                    <Button className='bg-green-500 w-full mt-5' onClick={() => {
                      addcart(item), toast({
                        title: "add product ",
                      }), router.push("/service/cart")
                    }} >
                      Add Cart
                    </Button>

                  </CardContent>

                </div>
              )

            }

            )}
          </div>

          <div className=" mx-5 text-center">
            <AppDownload />
          </div>

        </div>
      </motion.div>
    </div>
  );
}

