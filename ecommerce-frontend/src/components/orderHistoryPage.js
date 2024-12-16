import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './appContext';
import './orderHistoryPage.css';

// In orderHistoryPage.js
const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const { orderHistory, user } = useAppContext();

  const handleGoHome = () => {
    navigate('/');
  };

  if (!user) {
    return (
      <div className="order-history-container">
        <p>Please sign in to view your order history.</p>
        <button onClick={() => navigate('/sign-in')} className="sign-in-button">
          Sign In
        </button> <br />
        <button onClick={handleGoHome} className="home-button">
        Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      <h2>{user.username}'s Order History</h2>
      {orderHistory.length === 0 ? (
        <p>You have no previous orders.</p>
      ) : (
        <ul className="order-list">
          {orderHistory.map((order) => (
            <li key={order._id} className="order-item">
              <div>Order# {order._id}</div>
              <div>Date: {new Date(order.date).toLocaleDateString()}</div>
              <div>Total: ${order.shippingDetails.total.toFixed(2)}</div>
              <div className="order-items">
                {order.items.map(item => (
                  <div key={`${item.id}-${item.selectedSize}`}>
                    {item.name} - Size: {item.selectedSize}, Quantity: {item.quantity}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleGoHome} className="home-button">
        Back Home
      </button>
    </div>
  );
};

export default OrderHistoryPage;