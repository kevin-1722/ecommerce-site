// App.js (Updated)
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AppProvider } from './components/appContext'
import './App.css';
import Header from './components/header';
import HomePage from './components/homePage';
import SignInPage from './components/signInPage';
import SignUpPage from './components/signUpPage';
import CartPage from './components/cartPage';
import CheckoutPage from './components/checkoutPage';
import OrderHistoryPage from './components/orderHistoryPage';
import ProductListingPage from './components/productListingPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Header/>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/sign-in" element={<SignInPage/>} />
            <Route path="/sign-up" element={<SignUpPage/>} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/checkout" element={<CheckoutPage/>} />
            <Route path="/order-history" element={<OrderHistoryPage/>} />
            <Route path="/product/:id" element={<ProductListingPage/>} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
