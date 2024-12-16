import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from './appContext';
import './productListingPage.css';

const ProductListingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, addToCart } = useAppContext();

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const selectedItem = products.find((shoe) => shoe.id === parseInt(id));

  // Dynamic size options based on product category
  const getSizeOptions = () => {
    switch (selectedItem.category) {
      case 'shoe':
        return [
          { value: '6', label: '6' },
          { value: '7', label: '7' },
          { value: '8', label: '8' },
          { value: '9', label: '9' },
          { value: '10', label: '10' },
          { value: '11', label: '11' },
          { value: '12', label: '12' }
        ];
      case 'shirt':
        return [
          { value: 'S', label: 'Small' },
          { value: 'M', label: 'Medium' },
          { value: 'L', label: 'Large' },
          { value: 'XL', label: 'Extra Large' }
        ];
        case 'sock':
        return [
          { value: 'S', label: 'Small' },
          { value: 'M', label: 'Medium' },
          { value: 'L', label: 'Large' },
          { value: 'XL', label: 'Extra Large' }
        ];
      default:
        return [
          { value: '', label: 'Select Size' }
        ];
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addToCart(selectedItem, selectedSize, quantity);
    navigate('/cart');
  };

  return (
    <div className="product-listing-page">
      <div className="product-image-container">
        <img
          src={`http://localhost:5000${selectedItem.image}`} 
          alt={selectedItem?.name}
          className="product-image"
        />
      </div>
      <div className="product-details-container">
        <h2 className="product-name">{selectedItem?.name}</h2>
        <p className="product-price">${selectedItem?.price.toFixed(2)}</p>
        
        <div className="size-container">
          <span className="size-label">Size:</span>
          <select 
            className="size-select"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">Select Size</option>
            {getSizeOptions().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="quantity-container">
          <span className="quantity-label">Quantity:</span>
          <input 
            type="number" 
            min="1" 
            value={quantity} 
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="quantity-input"
          />
        </div>

        <button 
          onClick={handleAddToCart} 
          className="add-to-cart-button"
          disabled={!selectedSize}
        >
          Add to Cart
        </button> <br/>
        <button onClick={handleGoHome} className="home-button">
          Back Home
        </button>
      </div>
    </div>
  );
};

export default ProductListingPage;