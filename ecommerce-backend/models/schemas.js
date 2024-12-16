const mongoose = require('mongoose');

// User Model
const userSchema = new mongoose.Schema({
    username: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    }
  });
  
  // Product Model
  const productSchema = new mongoose.Schema({
    id: { 
      type: Number, 
      required: true, 
      unique: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true 
    },
    category: { 
      type: String, 
      required: true 
    },
    image: {
      type: String,
      required: true
    }
  });
  
  // Order Model
  const orderSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    },
    username: String,
    items: [{
      id: Number,
      name: String,
      price: Number,
      selectedSize: String,
      quantity: Number
    }],
    shippingDetails: {
      name: String,
      address: String,
      creditCard: String,
      shipping: String,
      shippingCost: Number,
      tax: Number,
      total: Number
    },
    date: { type: Date, default: Date.now }
  });

module.exports = {
  Product: mongoose.model('Product', productSchema),
  Order: mongoose.model('Order', orderSchema),
  User: mongoose.model('User', userSchema),
};