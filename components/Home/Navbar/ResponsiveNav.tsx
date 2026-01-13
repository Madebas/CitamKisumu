'use client'

import React, { useCallback, useEffect, useState } from 'react'
import MobileNav from './MobileNav'
import MainNav from './MainNav'
import FaithSearchOverlay from '@/components/Home/Search/FaithSearchOverlay'
import GiveDrawer from '@/components/Home/Give/GiveDrawer'

const ResponsiveNav = () => {
    const [showMainNav, setShowMainNav] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isGiveOpen, setIsGiveOpen] = useState(false)

    const handMainNavShow = () => setShowMainNav(true)
    const handleCloseMainNav = () => setShowMainNav(false)

    const openSearch = () => setIsSearchOpen(true)
    const closeSearch = useCallback(() => setIsSearchOpen(false), [])

    const openGive = () => setIsGiveOpen(true)
    const closeGive = useCallback(() => setIsGiveOpen(false), [])

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setShowMainNav(false)
          setIsSearchOpen(false)
          setIsGiveOpen(false)
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

  return (
    <div>
        <MainNav openMainNav={handMainNavShow} openSearch={openSearch} openGive={openGive} isGiveOpen={isGiveOpen}/>
        <MobileNav showMainNav={showMainNav} closeMainNav={handleCloseMainNav} openSearch={openSearch} openGive={openGive}/>
        <FaithSearchOverlay isOpen={isSearchOpen} onClose={closeSearch}/>
        <GiveDrawer isOpen={isGiveOpen} onClose={closeGive}/>
    </div>
  )
}

export default ResponsiveNav