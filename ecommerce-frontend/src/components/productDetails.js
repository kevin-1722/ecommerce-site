import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from './appContext';
import Shoe1Image from '../pictures/nike1.jpg';
import Shoe2Image from '../pictures/nike2.png';
import Shoe3Image from '../pictures/nike3.png';
import Shoe4Image from '../pictures/nike4.png';
import Shoe5Image from '../pictures/nike5.jpg';
import Shoe6Image from '../pictures/nike6.png';
import './productDetails.css';

const ProductDetails = () => {
  const { products, searchTerm, filteredProducts } = useAppContext();

  const imageMap = {
    1: Shoe1Image,
    2: Shoe2Image,
    3: Shoe3Image,
    4: Shoe4Image,
    5: Shoe5Image,
    6: Shoe6Image
  };

  const productList = searchTerm ? filteredProducts : products
  return (
    <div className="product-grid">
      {productList.map((product) => (
        <div key={product.id} className="product-card">
          <img 
            src={imageMap[product.id]} 
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