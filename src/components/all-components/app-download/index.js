"use client"
import { assets } from "@/utils/frontend_assets/assets"
import Image from "next/image"
function AppDownload() {
  return (
    <div className="bg-white ">
      <div className="  mx-auto max-w-screen-xl w-full">
      <div className=" my-10 py-5 flex flex-col justify-center items-center">
<h1 className="font-bold text-3xl">For Better Expriance Download </h1>
<h1 className=" font-bold text-3xl">Foodie.</h1>
<div className=" flex justify-center items-center gap-2">
    <Image className=" w-40 md:w-auto hover:scale-x-110 md:hover:scale-x-105 "  src={assets.play_store} alt="" />
    <Image className=" w-40 md:w-auto  hover:scale-x-110 md:hover:scale-x-105"  src={assets.app_store} alt="" />
</div>

    </div>

      </div>
    </div>
  )
}

export default AppDownload
