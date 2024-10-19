import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiSearch, FiMapPin, FiUser, FiShoppingCart, FiX } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [phNo, setPhNo] = useState('')
  const navigate = useNavigate()
  const { user, login, signup, logout } = useAuth()

  const handleCartClick = () => {
    navigate('/cart')
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isLogin) {
      const success = await login(email, password)
      if (success) {
        setIsModalOpen(false)
      } else {
        // Show error message
        alert('Login failed. Please check your credentials.')
      }
    } else {
      if (password !== confirmPassword) {
        alert('Passwords do not match')
        return
      }
      const success = await signup(name, email, email, password, phNo)
      if (success) {
        setIsModalOpen(false)
        alert('Signup successful! Please log in.')
        setIsLogin(true)
      } else {
        // Show error message
        alert('Signup failed. Please try again.')
      }
    }
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <header className="bg-black p-4 flex items-center justify-between text-white">
        <button className="flex items-center">
          <FiMenu className="mr-2" />
          Menu
        </button>
        <div className="flex-grow mx-4 relative">
          <input
            type="text"
            placeholder="What are you looking for ?"
            className="w-full p-2 pl-10 rounded-md bg-white text-black"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex items-center">
          {/* <div className="flex items-center mr-4">
            <FiMapPin className="mr-2" />
            <span>Pune, 411008</span>
          </div> */}
            <button className="flex items-center mr-4" onClick={user ? handleLogout : toggleModal}>
              <FiUser size={24} />
              {user ? 'Logout' : 'Login'}
            </button>
            
          <button className="relative" onClick={handleCartClick}>
            <FiShoppingCart size={24} />
          </button>
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md relative">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FiX size={24} />
            </button>
            <div className="flex justify-center mb-6">
              <button
                className={`px-4 py-2 ${isLogin ? 'text-white border-b-2 border-green-500' : 'text-gray-400'
                  }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`px-4 py-2 ${!isLogin ? 'text-white border-b-2 border-green-500' : 'text-gray-400'
                  }`}
                onClick={() => setIsLogin(false)}
              >
                Create Account
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                      Your name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phNo" className="block text-sm font-medium text-gray-400 mb-1">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      id="phNo"
                      value={phNo}
                      onChange={(e) => setPhNo(e.target.value)}
                      className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      placeholder="1234567890"
                      required
                    />
                  </div>
                </>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  {isLogin ? 'Email ID or Phone number' : 'Your email'}
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  placeholder={isLogin ? 'Enter your Email ID or phone number' : 'name@company.com'}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              {!isLogin && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              )}
              {isLogin && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="keepSignedIn"
                    className="mr-2"
                  />
                  <label htmlFor="keepSignedIn" className="text-sm text-gray-400">
                    Keep me signed in
                  </label>
                </div>
              )}
              {!isLogin && (
                <div className="flex items-center">
                  <input type="checkbox" id="terms" className="mr-2" required />
                  <label htmlFor="terms" className="text-sm text-gray-400">
                    I accept the{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
              >
                {isLogin ? 'Login' : 'Create an account'}
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-400 text-center">
              {isLogin ? (
                <>
                  Don't have an account?{' '}
                  <button className="text-blue-500 hover:underline" onClick={() => setIsLogin(false)}>
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button className="text-blue-500 hover:underline" onClick={() => setIsLogin(true)}>
                    Login here
                  </button>
                </>
              )}
            </p>
            <p className="mt-4 text-xs text-gray-500 text-center">
              By continuing you agree to our{' '}
              <a href="#" className="text-blue-500 hover:underline">
                Terms of Use
              </a>{' '}
              &{' '}
              <a href="#" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  )
}
