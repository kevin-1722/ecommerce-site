import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProductDetails from './productDetails'
import SearchAndFilter from './searchAndFilter'
import './homePage.css'

const HomePage = () => {
  const navigate = useNavigate()

  const handleGoOrderHistory = () => {
    navigate('/order-history')
  }

  return (
    <div className="home-page-container">
      <div>
        <button 
          onClick={handleGoOrderHistory} 
          className="order-history-button"
        >
          Order History
        </button>
      </div>
      <div className="right-content">
        <SearchAndFilter className="search" />
        <ProductDetails />
      </div>
    </div>
  )
}

export default HomePage