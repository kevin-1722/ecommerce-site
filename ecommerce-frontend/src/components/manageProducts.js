import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './appContext';
import SearchAndFilter from './searchAndFilter';

const ManageProducts = () => {
  // State for form inputs
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  
  // State to track which product is being edited
  const [editingProduct, setEditingProduct] = useState(null);

  const navigate = useNavigate();
  const { products, searchTerm, 
    filteredProducts, addProduct, updateProduct, deleteProduct } = useAppContext();

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

  // Handle form submission for creating or updating products
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const productData = {
      id,
      name,
      price: parseFloat(price),
      category,
      image
    };

    try {
      if (editingProduct) {
        // Update existing product
        await updateProduct(editingProduct._id, productData);
      } else {
        // Create new product
        await addProduct(productData);
      }

      // Reset form
      resetForm();
    } catch (error) {
      console.error('Error creating/updating product:', error);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setId('');
    setName('');
    setPrice('');
    setCategory('');
    setImage(null);
    setEditingProduct(null);
  };

  // Prepare product for editing
  const handleEditProduct = (product) => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    setEditingProduct(product);
    setId(product.id);
    setName(product.name);
    setPrice(product.price.toString());
    setCategory(product.category);
    setImage(null); // Clear image input
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div>
      <h1 className='admin-text'>Admin Product Management</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
          placeholder="Product ID" 
          required 
        />
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Product Name" 
          required 
        />
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          placeholder="Price" 
          required 
          step="0.01"
        />
        <input 
          type="text" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          placeholder="Category" 
          required 
        />
        <input 
          type="file" 
          onChange={(e) => setImage(e.target.files[0])} 
          accept="image/*" 
        />
        <button type="submit">
          {editingProduct ? 'Update Product' : 'Create Product'}
        </button> <br/>
        {editingProduct && (
          <button type="button" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>
      <button onClick={handleGoHome} className="home-button-manage">
        Back Home
      </button>
      <SearchAndFilter/>
    
      <div>
        {displayProducts.map((product) => (
          <div key={product._id} className="product-card">
            <img 
              src={`http://localhost:5000${product.image}`} 
              alt={product.name} 
              className="product-image-small"
            />
            <div className="product-details">
              <h3 className="product-name">Name: {product.name}</h3>
              <p className="product-price">Price: ${product.price.toFixed(2)}</p>
              <p>Category: {product.category}</p>
              <p>ID: {product.id}</p>
              <button onClick={() => handleEditProduct(product)}>
                Edit
              </button>
              <button onClick={() => handleDeleteProduct(product._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;