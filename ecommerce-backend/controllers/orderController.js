const { Order } = require('../models/schemas');

exports.createOrder = async (req, res) => {
  try {
    // Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Create order with user reference
    const orderData = {
      ...req.body,
      user: req.user._id,
      username: req.user.username
    };

    const order = new Order(orderData);
    await order.save();
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// New method to get user-specific orders
exports.getUserOrders = async (req, res) => {
  try {
    // Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Find orders for the current user
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
