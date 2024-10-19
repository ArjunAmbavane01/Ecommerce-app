import React from 'react'
import { FiSearch } from 'react-icons/fi'

export default function SearchBar() {
  return (
    <div className="flex-grow mx-4 relative">
      <input
        type="text"
        placeholder="What are you looking for ?"
        className="w-full p-2 pl-10 rounded-md bg-white text-black"
      />
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  )
}
