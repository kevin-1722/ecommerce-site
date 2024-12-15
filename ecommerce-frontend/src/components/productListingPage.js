import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from './appContext';
import Shoe1Image from '../pictures/nike1.jpg';
import Shoe2Image from '../pictures/nike2.png';
import Shoe3Image from '../pictures/nike3.png';
import Shoe4Image from '../pictures/nike4.png';
import Shoe5Image from '../pictures/nike5.jpg';
import Shoe6Image from '../pictures/nike6.png';
import './productListingPage.css';

const ProductListingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, addToCart } = useAppContext();

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const selectedShoe = products.find((shoe) => shoe.id === parseInt(id));

  const imageMap = {
    1: Shoe1Image,
    2: Shoe2Image,
    3: Shoe3Image,
    4: Shoe4Image,
    5: Shoe5Image,
    6: Shoe6Image
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addToCart(selectedShoe, selectedSize, quantity);
    navigate('/cart');
  };

  return (
    <div className="product-listing-page">
      <div className="product-image-container">
        <img
          src={imageMap[selectedShoe?.id]}
          alt={selectedShoe?.name}
          className="product-image"
        />
      </div>
      <div className="product-details-container">
        <h2 className="product-name">{selectedShoe?.name}</h2>
        <p className="product-price">${selectedShoe?.price.toFixed(2)}</p>
        
        <div className="size-container">
          <span className="size-label">Size:</span>
          <select 
            className="size-select"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">Select Size</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
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