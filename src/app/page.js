"use client"
// import header_img from '../utils/frontend_assets/header_img.png'
import Image from "next/image";
import { food_list } from "@/utils";
import { useContext } from "react";
import { GlobalContext } from "@/context";
import SearchItems from "@/components/all-components/search";
import { motion } from "framer-motion";
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
        <div className=" px-4 md:px-10 max-w-screen-2xl ">
          <SearchItems />
          <div className=" mx-5 pt-5 bg-[url('../utils/frontend_assets/header_img.png')]  h-[500px] bg-cover bg-center rounded-md ">
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
          <div className='mt-5 pt-5  grid grid-cols-2 md:grid-cols-4 gap-3 '>
            {food_list.filter((food) => food.name.toLowerCase().includes(searchItems.toLowerCase())).map((item, index) =>

              <div className='mx-3  shadow-sm shadow-slate-300 '>
                <div className='  w-full h-auto max-w-sm '>
                  <div className='  w-full aspect-[4/4]  bg-white relative'>
                    <Image className='w-full h-auto' src={item.image} />
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
