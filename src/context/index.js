 "use client"
import { createContext, useState } from "react";


export const GlobalContext = createContext(null);


export default  function GlobalState({children}){

const [foodFilter ,setFoodFilter] = useState('all')
const [searchItems ,setSearchItems] =useState('')
const [isAuthUser ,setIsAuthUser] = useState(null);
const [cartItems ,setCartItems] = useState([])


const addcart = (item) =>{
  setCartItems((prev) =>{
    const existitem = prev.find((i) => i._id === item._id)

    if(existitem){
     return    prev.map((i)=> i._id === item._id? {...i , qty:i.qty+1}: i)
    }

    return [...prev ,{...item, qty:1} ]
  } )

}


const reversecart = (item) =>{
  setCartItems((prev) =>{
    const existitem = prev.find((i) => i._id === item._id)

    if(existitem){
     return    prev.map((i)=> i._id === item._id? {...i , qty:i.qty -1}: i)
    }

    return [...prev ,{...item, qty:1} ]
  } )

}
const removecart =(_id)=>{
      setCartItems((prev)=> prev.filter((item)=> item._id !== _id))
}

    return(
<GlobalContext.Provider value={{foodFilter
   ,setFoodFilter ,searchItems ,
   setSearchItems, isAuthUser ,
   setIsAuthUser, cartItems ,
   removecart,
   setCartItems ,addcart ,reversecart }}>
    {children}
</GlobalContext.Provider>

    )
}