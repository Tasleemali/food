"use client"
import Image from "next/image";
import { food_list } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import SearchItems from "@/components/all-components/search";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AppDownload from "../components/all-components/app-download";
import { useRouter } from "next/navigation";

// Import the header image
import header_img from "../utils/frontend_assets/header_img.png";

export default function Home() {
  const router = useRouter();
  const { searchItems, addcart } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // Simulating loading delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white w-full">
      <motion.div
        className="flex flex-col space-y-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="px-4 md:px-10 max-w-screen-2xl">
          {/* Search Section */}
          <div className="mt-3">
            {isLoading ? (
              <div className="h-10 w-full md:w-1/2 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <SearchItems />
            )}
          </div>

          {/* Header Section */}
          <div className="mx-5 pt-5 h-[500px] relative">
            {isLoading ? (
              <div className="w-full h-full bg-gray-200 rounded-md animate-pulse relative">
                <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white space-y-4">
                  <div className="h-10 w-3/4 bg-gray-300 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                  <div className="h-10 w-32 bg-gray-300 rounded"></div>
                </div>
              </div>
            ) : (
              <>
                {/* Header Image */}
                <Image
                  src={header_img}
                  alt="Header Image"
                  className="object-cover w-full h-full rounded-md"
                />
                {/* Overlay Text */}
                <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
                  <h1 className="font-bold text-5xl">Order Your Favorite Food</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur <br />
                    adipisicing elit. <br />
                    Maiores quas accusamus, <br />
                    saepe doloribus architecto
                  </p>
                  <Button className="bg-amber-50 text-black">View Menu</Button>
                </div>
              </>
            )}
          </div>

          {/* Food List Section */}
          <h1 className="mx-5 pt-10 text-2xl md:text-3xl font-bold">
            {isLoading ? (
              <div className="h-6 w-3/4 bg-gray-200 rounded-md animate-pulse"></div> // Skeleton for Heading
            ) : (
              "Top Dishes Near You"
            )}
          </h1>
          <div className="mt-5 pt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
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
                  if(item.top === true ){
                    return(
                      <div key={index} className="mx-3 shadow-sm shadow-slate-300">
                    <div className="w-full h-auto max-w-sm">
                      <div
                        onClick={() => router.push(`/client-view/menu/${item._id}`)}
                        className="w-full aspect-[4/4] bg-white relative"
                      >
                        <Image
                          className="w-full h-auto"
                          src={item.image}
                          alt={item.name}
                        />
                        <div className="mt-2 text-start">
                          <h1 className="text-sm px-2">{item.name}</h1>
                          <p className="text-gray-400 text-sm px-2">{item.description}</p>
                          <p className="text-sm px-2">
                            <span className="text-green-500">₹</span>{item.price}
                          </p>
                        </div>
                        <div className="px-2 py-3">
                          <Button
                            className="text-xs bg-green-500 text-white w-full font-semibold"
                            onClick={() => {
                              addcart(item);
                              router.push("/service/cart");
                            }}
                          >
                            ADD TO CART
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

          {/* App Download Section */}
          <div className="mx-5 text-center mt-10">
            {isLoading ? (
              <div className="flex flex-col items-center space-y-4 animate-pulse">
                <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-5 w-1/2 bg-gray-200 rounded"></div>
                <div className="flex space-x-4 mt-4">
                  <div className="h-12 w-32 bg-gray-300 rounded-lg"></div>
                  <div className="h-12 w-32 bg-gray-300 rounded-lg"></div>
                </div>
              </div>
            ) : (
              <AppDownload />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
