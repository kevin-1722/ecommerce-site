import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './appContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, createOrder, totalPrice } = useAppContext();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [shipping, setShipping] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  // Calculate totals whenever cart or shipping changes
  useEffect(() => {
    const calculateTotals = () => {
      // Calculate subtotal from cart
      const subtotal = totalPrice;
      
      // Calculate tax (8% of subtotal + shipping)
      const calculatedTax = (subtotal + shippingCost) * 0.08;
      
      // Calculate total
      const calculatedTotal = subtotal + shippingCost + calculatedTax;
      
      setTax(calculatedTax);
      setTotal(calculatedTotal);
    };

    calculateTotals();
  }, [totalPrice, shippingCost]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleConfirmOrder = () => {
    const shippingDetails = {
      name,
      address,
      creditCard,
      shipping,
      shippingCost,
      tax,
      total
    };

    const order = createOrder(shippingDetails);
    if (order) {
      navigate('/order-history');
    }
  };

  const handleShippingChange = (option) => {
    switch (option) {
      case '1-day':
        setShipping('1-day');
        setShippingCost(15);
        break;
      case '3-day':
        setShipping('3-day');
        setShippingCost(7);
        break;
      case '7-day':
        setShipping('7-day');
        setShippingCost(0);
        break;
      default:
        setShipping('');
        setShippingCost(0);
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="credit-card">Credit Card:</label>
          <input
            type="text"
            id="credit-card"
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shipping">Shipping:</label>
          <select id="shipping" value={shipping} onChange={(e) => handleShippingChange(e.target.value)}>
            <option value="">Select Shipping</option>
            <option value="1-day">1-day ($15)</option>
            <option value="3-day">3-day ($7)</option>
            <option value="7-day">7-day (Free)</option>
          </select>
        </div>
        
        {/* New Total Breakdown Section */}
        <div className="total-breakdown">
          <div className="form-group">
            <label>Subtotal:</label>
            <input type="text" value={`$${totalPrice.toFixed(2)}`} readOnly />
          </div>
          <div className="form-group">
            <label>Shipping:</label>
            <input type="text" value={`$${shippingCost.toFixed(2)}`} readOnly />
          </div>
          <div className="form-group">
            <label>Tax:</label>
            <input type="text" value={`$${tax.toFixed(2)}`} readOnly />
          </div>
          <div className="form-group">
            <label><strong>Total:</strong></label>
            <input type="text" value={`$${total.toFixed(2)}`} readOnly />
          </div>
        </div>
      </div>
      <div className="actions">
        <button onClick={handleGoHome} className="home-button">
          Back Home
        </button>
        <button onClick={handleConfirmOrder} className="confirm-button">
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;