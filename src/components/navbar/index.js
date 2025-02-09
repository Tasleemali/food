"use client"

import React, { Fragment, useContext, useState, logoutbtn } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GlobalContext } from '@/context'
import { logoutAction } from '@/action'
import { BaggageClaim, Menu, User } from 'lucide-react'
function Navitem({ menu, setMenu, router, isAuthUser }) {
     const [menuActive ,setMenuActive] = useState('home')
  return (
    <div className={`${menu ? '' : 'hidden'}  top-0  z-30  items-center justify-between w-full  md:flex  md:w-auto `}>
      <ul className=" bg-white flex flex-col justify-start items-center gap-10     absolute left-0 z-30 w-full h-lvh  md:h-auto md:relative   md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row 
       md:space-x-16 md:mt-0 md:border-0 md:bg-white  cursor-pointer">

        <li className={`${menuActive === 'home'? 'border-b-2 border-orange-500' :""}`} value={'home'} onClick={() => { router.push('/'), setMenu(!menu),setMenuActive('home') } } >Home</li>
        <li  className={`${menuActive === 'menu'? 'border-b-2 border-orange-500' :""}`} value={'menu'} onClick={() => { router.push('/client-view/menu'), setMenu(!menu) ,setMenuActive('menu')}}>Menu</li>
        <li className={`${menuActive === 'about'? 'border-b-2 border-orange-500' :""}`} value={'about'} onClick={() => { router.push("/service/about"), setMenu(!menu) ,setMenuActive('about')}}>About Us</li>
        <li  className={`${menuActive === 'contect'? 'border-b-2 border-orange-500' :""}`} value={'contect'} onClick={() => {  router.push("/service/contectUs"), setMenu(!menu) ,setMenuActive('contect')}} >Contect-Us</li>
      
        <ul className=' flex flex-col justify-center items-center  gap-10 md:hidden '    >
           {isAuthUser ? <Fragment>
           <li  className={`${menuActive === 'cart'? 'border-b-2 border-orange-500' :""}`} value={'cart'} onClick={() => {router.push('/service/cart') ,setMenu(!menu) ,setMenuActive('cart'),setMenu(!menu)}} >Cart</li>
           <li  onClick={logoutbtn}>Logout</li>

                          </Fragment> : null}
         </ul>

      </ul>

    </div>)
}








function Navbar() {
  const { isAuthUser, setIsAuthUser } = useContext(GlobalContext)
  const [menu, setMenu] = useState(false)
  const router = useRouter()

  async function logoutbtn() {
    const result = await logoutAction()
    if (result?.success) {
      alert('logout succesful')
      router.push('service/login')
    }

  }

  return (
    <nav className='bg-white sticky w-full z-20 top-0 left-0 border-b border-gray-200 '>
      <div className=' max-w-screen-xl flex flex-wrap  z-30  items-center justify-between mx-auto p-4'>
        <div className=' flex items-center cursor-pointer'>
          <span onClick={() => router.push('/')} className='text-orange-500 self-center text-3xl font-semibold whitespace-nowrap'>Foodie.</span>
        </div>
        <div className=" flex md:order-2 gap-2">
          {isAuthUser ? <Fragment>


            <button className={
              "mt-1.5 hidden md:flex md:flex-col justify-center items-center px-5 py-3 text-xs font-medium upprcase tracking-wide"
            }><BaggageClaim onClick={()=>{router.push("/service/cart") ,setMenu(!menu)}} className='w-10 h-10' /> Cart</button>

            <button onClick={logoutbtn}
              className={
                "mt-1.5 hidden   bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
              }>Logout</button>
          </Fragment> : null}

          {isAuthUser ? (
            <button  onClick={()=>router.push("/service/account")} className={
              "mt-1.5 flex flex-col justify-center items-center  px-5 py-3 text-xs font-medium upprcase tracking-wide "
            } > <User className='md:w-10 md:h-10' />Account  </button>) : <Link href="/service/login"> <button className={
              "mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
            }>Login</button></Link>}
          {/* navbar logo */}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="   inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={() => setMenu(!menu)}

          >
            <Menu className='h-8 w-8' />
            {/* <span className="sr-only">Open main menu</span>
              <svg
                className="w-10 h-10"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  // fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  // clip-rule="evenodd"
                ></path>
              </svg> */}
          </button>

        </div>

        <Navitem logoutbtn={logoutbtn} isAuthUser={isAuthUser} menu={menu} setMenu={setMenu} router={router} />
      </div>
    </nav>
  )
}

export default Navbar

