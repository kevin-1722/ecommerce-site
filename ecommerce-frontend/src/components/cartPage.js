import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from './appContext'
import './cartPage.css'

const CartPage = () => {
  const navigate = useNavigate()
  const { 
    cart, 
    removeFromCart, 
    updateCartItemQuantity, 
    totalPrice, 
    totalItems 
  } = useAppContext()

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoCheckout = () => {
    navigate('/checkout')
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is currently empty.</p>
          <button 
            onClick={handleGoHome} 
            className="home-button-empty"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="cart-item-image" 
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Size: {item.selectedSize}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  
                  <div className="quantity-control">
                    <button 
                      onClick={() => updateCartItemQuantity(
                        item.id, 
                        item.selectedSize, 
                        Math.max(1, item.quantity - 1)
                      )}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateCartItemQuantity(
                        item.id, 
                        item.selectedSize, 
                        item.quantity + 1
                      )}
                    >
                      +
                    </button>
                  </div>
                  
                  <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                  
                  <button 
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                    className="remove-item-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
          
          <div className="cart-actions">
            <button 
              onClick={handleGoHome} 
              className="home-button"
            >
              Continue Shopping
            </button>
            <button 
              onClick={handleGoCheckout} 
              className="checkout-button"
              disabled={cart.length === 0}
            >
              Check Out
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage