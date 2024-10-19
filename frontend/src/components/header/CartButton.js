import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function CartButton() {
  const navigate = useNavigate()

  const handleCartClick = () => {
    navigate('/cart')
  }

  return (
    <button className="relative" onClick={handleCartClick}>
      <FiShoppingCart size={24} />
    </button>
  )
}
