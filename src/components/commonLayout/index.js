import React from 'react'
import Navbar from '../navbar'
import GlobalState from '@/context'
import SearchItems from '../all-components/search'
import Footer from '../footer'

function CommonLayOut({children}) {
  return (
    <div>

      <GlobalState>
      <Navbar/>
     
      {children}
      <Footer/>
      </GlobalState>
     
    </div>
  )
}

export default CommonLayOut