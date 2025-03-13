import React from 'react'

function Banner() {
  return (

    <div className="mx-auto max-w-screen-xl ">
            
       <div className=" max-w-screen-2xl h-[500px] bg-cover bg-center rounded-md  " >
          <Image src={header_img} className=" w-full "/> 
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
    </div>
  )
}

export default Banner
