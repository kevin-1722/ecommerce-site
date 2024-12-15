// header.js
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../components/appContext'
import './header.css'

const Header = () => {
  const { user, isLoggedIn, handleSignOut, cart } = useAppContext();

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-section header-left">
        {isLoggedIn && (
            <div className="user-greeting">
              Welcome, {user.username}!
            </div>
          )}
          {isLoggedIn ? (
            <button 
              onClick={handleSignOut} 
              className="header-link sign-out-button"
            >
              Sign Out
            </button>
          ) : (
            <Link to="/sign-in" className="header-link">
              Sign In
            </Link>
          )}
        </div>
        <div className="header-section header-center">
          <div className="header-logo">Kevin's Shoe Site</div>
        </div>
        <div className="header-section header-right">
          <Link to="/cart" className="header-link">
            Cart
          </Link>
          <div className="header-link">${totalPrice.toFixed(2)}</div>
        </div>
      </div>
    </header>
  )
}

export default Header;