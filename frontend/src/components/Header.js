import React, { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import AuthButtons from './header/AuthButtons'
import SearchBar from './header/SearchBar'
import CartButton from './header/CartButton'
import Sidebar from './header/Sidebar'

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <>
      <header className="bg-black py-3 px-4 flex items-center justify-between text-white">
        <button className="flex items-center" onClick={toggleSidebar}>
          <FiMenu className="mr-2" />
          Menu
        </button>
        <SearchBar />
        <div className="flex items-center">
          <AuthButtons />
          <CartButton />
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  )
}
