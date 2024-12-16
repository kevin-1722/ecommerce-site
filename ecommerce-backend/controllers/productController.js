const { Product } = require('../models/schemas');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 

// Ensure uploads/products directory exists
const uploadDir = path.join(__dirname, '../uploads/products');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  // Specify destination directory for uploaded files
  destination: function (req, file, cb) {
    cb(null, uploadDir) // Use the absolute path
  },
  // Generate unique filename for each uploaded image
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

// Configure upload middleware with file size and type restrictions
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Only allow specific image types
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Product creation with image upload
exports.createProductWithImage = async (req, res) => {
  try {
    // Validate file upload
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // Prepare product data
    const productData = {
      id: req.body.id,
      name: req.body.name,
      price: parseFloat(req.body.price), // Ensure price is a number
      category: req.body.category,
      image: `/uploads/products/${req.file.filename}` // Store image path
    };

    // Create and save new product
    const product = new Product(productData);
    const newProduct = await product.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Export upload middleware separately
exports.upload = upload;


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the updateProduct method
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = {
      id: req.body.id,
      name: req.body.name,
      price: parseFloat(req.body.price),
      category: req.body.category
    };

    // Handle image update if a new image is uploaded
    if (req.file) {
      updateData.image = `/uploads/products/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId, 
      updateData, 
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};