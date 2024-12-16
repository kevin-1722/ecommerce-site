import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from './appContext';
import './productDetails.css';

const ProductDetails = () => {
  const { 
    products, 
    searchTerm, 
    filteredProducts,
    handleFilterAndSort 
  } = useAppContext();

  // State to manage the current displayed products
  const [displayProducts, setDisplayProducts] = useState([]);

  // Effect to update displayed products based on search and filtering
  useEffect(() => {
    // If there's a search term or filtered products, use those
    if (searchTerm || filteredProducts.length > 0) {
      setDisplayProducts(filteredProducts);
    } else {
      // Otherwise, use all products
      setDisplayProducts(products);
    }
  }, [searchTerm, filteredProducts, products]);

  return (
    <div className="product-grid">
      {displayProducts.map((product) => (
        <div key={product.id} className="product-card">
          <img 
            src={`http://localhost:5000${product.image}`} 
            alt={product.name} 
            className="product-image-big"
          />
          <div className="product-details">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <Link 
              to={`/product/${product.id}`} 
              className="select-button"
            >
              Select
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductDetails