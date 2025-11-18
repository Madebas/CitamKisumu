'use client'

import React, { useState } from 'react'
import MobileNav from './MobileNav'
import MainNav from './MainNav'

const ResponsiveNav = () => {
    const [showMainNav, setShowMainNav] = useState(false)
    const handMainNavShow = () => setShowMainNav(true)
    const handleCloseMainNav = () => setShowMainNav(false)
  return (
    <div>
        <MainNav openMainNav={handMainNavShow}/>
        <MobileNav showMainNav={showMainNav} closeMainNav={handleCloseMainNav}/>
    </div>
  )
}

export default ResponsiveNav