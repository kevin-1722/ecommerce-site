// appContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [authError, setAuthError] = useState(null);
  const [products, setProducts] = useState([]);

  const handleSignIn = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { 
        username, 
        password 
      });
  
      // Set user in context
      setUser({ username: response.data.username });
      // Store token in local storage
      localStorage.setItem('authToken', response.data.token);
      setAuthError(null);
      return true;
    } catch (error) {
      setAuthError('Invalid username or password');
      return false;
    }
  };
  
  const handleSignUp = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', { 
        username, 
        password 
      });
  
      // Automatically sign in after successful registration
      setUser({ username: response.data.username });
      // Store token in local storage
      localStorage.setItem('authToken', response.data.token);
      setAuthError(null);
      return true;
    } catch (error) {
      // Check for specific error (e.g., username already exists)
      setAuthError(error.response?.data?.message || 'Registration failed');
      return false;
    }
  };
  

  const handleSignOut = () => {
    setUser(null);
    setCart([]);
    setAuthError(null);
    localStorage.removeItem('authToken');
  };
  

  // Add a method to fetch products
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/products');
    setProducts(response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Call fetchProducts when component mounts
useEffect(() => {
  fetchProducts();
}, []);

  // Cart Methods (keep existing methods)
  const addToCart = (product, size = 'M', quantity = 1) => {
    const existingItem = cart.find(
      item => item.id === product.id && item.selectedSize === size
    );

    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id && item.selectedSize === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, selectedSize: size, quantity }]);
    }
  };

  const removeFromCart = (productId, size) => {
    setCart(cart.filter(item => 
      !(item.id === productId && item.selectedSize === size)
    ));
  };

  const updateCartItemQuantity = (productId, size, newQuantity) => {
    setCart(cart.map(item => 
      item.id === productId && item.selectedSize === size
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  // In appContext.js
  const fetchUserOrders = async () => {
    try {
      // Only fetch if user is logged in
      if (user) {
        const token = localStorage.getItem('authToken');
  
        const response = await axios.get('http://localhost:5000/api/user-orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrderHistory(response.data);
      }
    } catch (error) {
      console.error('Error fetching user orders:', error);
    }
  };
  

const createOrder = async (shippingDetails) => {
  if (!user) {
    setAuthError('Must be signed in to place order');
    return null;
  }

  try {
    // Get the token from local storage
    const token = localStorage.getItem('authToken');

    const response = await axios.post('http://localhost:5000/api/orders', {
      items: cart,
      shippingDetails
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Update local order history
    const newOrder = response.data;
    setOrderHistory([...orderHistory, newOrder]);
    clearCart();
    return newOrder;
  } catch (error) {
    setAuthError('Failed to create order');
    return null;
  }
};


// Add fetchUserOrders to useEffect when user logs in
useEffect(() => {
  if (user) {
    fetchUserOrders();
  }
}, [user]);


  // Search Methods
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const handleSearch = (term) => {
    setSearchTerm(term);
    // Filter products based on the search term
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };
  const contextValue = {
    // Authentication Props
    user,
    isLoggedIn: !!user,
    products,
    fetchProducts,
    handleSignIn,
    handleSignUp,
    handleSignOut,
    authError,

    // Cart Props
    cart,
    totalItems: cart.reduce((total, item) => total + item.quantity, 0),
    totalPrice: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,

    // Order Props
    orderHistory,
    createOrder,

    // Search Props
    searchTerm,
    filteredProducts,
    handleSearch
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier context consumption
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};