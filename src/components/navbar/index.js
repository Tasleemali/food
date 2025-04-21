"use client"

import React, { Fragment, useContext, useState, logoutbtn } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GlobalContext } from '@/context'
import { BaggageClaim, CircleUser, Menu, ShoppingCart, User } from 'lucide-react'
function Navitem({ menu, setMenu, router, isAuthUser ,menuActive ,setMenuActive }) {
    
  return (
    <div className={`${menu ? '' : 'hidden'}  top-0  z-30  items-center justify-between w-full  md:flex  md:w-auto `}>
      <ul className=" px-5 pt-10  bg-white flex flex-col justify-start items-start gap-10     absolute left-0 z-30 w-full h-lvh  md:h-auto md:relative   md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row 
       md:space-x-16 md:mt-0 md:border-0 md:bg-white  cursor-pointer">

        <li className={`${menuActive === 'home'? 'border-b-2 border-orange-500' :""}`} value={'home'} onClick={() => { router.push('/'), setMenu(!menu),setMenuActive('home') } } >Home</li>
        <li  className={`${menuActive === 'menu'? 'border-b-2 border-orange-500' :""}`} value={'menu'} onClick={() => { router.push('/client-view/menu'), setMenu(!menu) ,setMenuActive('menu')}}>Menu</li>
        <li className={`${menuActive === 'about'? 'border-b-2 border-orange-500' :""}`} value={'about'} onClick={() => { router.push("/service/about"), setMenu(!menu) ,setMenuActive('about')}}>About Us</li>
        <li  className={`${menuActive === 'contact'? 'border-b-2 border-orange-500' :""}`} value={'contact'} onClick={() => {  router.push("/service/contactUs"), setMenu(!menu) ,setMenuActive('contact')}} >Contact-Us</li>
        {/* <li  className={`${menuActive === 'admin'? 'border-b-2 border-orange-500' :""}`}value={'admin'} onClick={() => {router.push('/admin/orderpage') ,setMenu(!menu) ,setMenuActive('admin'),setMenu(!menu)}} >Admin</li> */}
          
        {/* <ul className=' flex flex-col justify-center items-center  gap-10 md:hidden '    > */}
           {isAuthUser ? <Fragment>
            <li  className={`${menuActive === 'orders'? 'border-b-2 border-orange-500' :""}`} value={'orders'} onClick={() => {  router.push("/service/order"), setMenu(!menu) ,setMenuActive('orders')}} >Orders</li>
       
           <li  className={`${menuActive === 'cart'? 'border-b-2 border-orange-500' :""}`}value={'cart'} onClick={() => {router.push('/service/cart') ,setMenu(!menu) ,setMenuActive('cart'),setMenu(!menu)}} >Cart</li>
          

                          </Fragment> : null}
         {/* </ul> */}

      </ul>

    </div>)
}








function Navbar() {
  const { isAuthUser, setIsAuthUser } = useContext(GlobalContext)
  const [menu, setMenu] = useState(false)
  const [menuActive ,setMenuActive] = useState('home')
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
      <div className='  max-w-screen-2xl flex flex-wrap  z-30  items-center justify-between mx-auto p-4'>
        <div className=' flex items-center cursor-pointer'>
          <span onClick={() => {router.push('/') , setMenuActive("home")}} className='text-orange-500 self-center text-3xl font-semibold whitespace-nowrap'>Foodie.</span>
        </div>
        <div className=" flex md:order-2 gap-2">
          {isAuthUser ? <Fragment>


            <button className={
              " hidden md:flex md:flex-col justify-center items-center px-5 py-3 text-xs font-medium upprcase tracking-wide"
            }><ShoppingCart onClick={()=>{router.push("/service/cart") ,setMenu(!menu)}} className='w-8 h-8' /> </button>

            <button onClick={logoutbtn}
              className={
                " hidden   bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
              }>Logout</button>
          </Fragment> : null}

          {/* {isAuthUser ?  */}
          {isAuthUser?
            <button  onClick={()=>{router.push("/service/account") ,setMenu(false)}} className=''><CircleUser className='h-8 w-8' /></button>:
           <Link href="/service/login"><button  onClick={()=>{ setMenu(false)}}  className=  "mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white">Login</button></Link>}
         
          {/* navbar logo */}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
              aria-controls="navbar-sticky"
            aria-expanded="false"
          className='md:hidden'
          >
            <Menu
            onClick={() => setMenu(!menu)}
             className='h-8 w-8' />
           
          </button>

        </div>

        <Navitem menuActive={menuActive} setMenuActive={setMenuActive} logoutbtn={logoutbtn} isAuthUser={isAuthUser} menu={menu} setMenu={setMenu} router={router} />
      </div>
    </nav>
  )
}

export default Navbar

