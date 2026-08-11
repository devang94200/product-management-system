const Product = require('../models/Product');

// @desc    Get all products (Admin + User)
// @route   GET /api/products
// @access  Private (Admin + User)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a product
// @route   POST /api/products
// @access  Private (Admin only)
const createProduct = async (req, res) => {
  try {
    const { name, sku, price, category, description, image, variant } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Product Name is required' });
    }
    if (!sku || !sku.trim()) {
      return res.status(400).json({ message: 'SKU is required' });
    }
    if (price === undefined || price === '' || isNaN(price) || Number(price) < 0) {
      return res.status(400).json({ message: 'A valid Price is required' });
    }
    if (!category || !category.trim()) {
      return res.status(400).json({ message: 'Category is required' });
    }

    // Check SKU uniqueness in MongoDB
    const existingSku = await Product.findOne({ sku: sku.toUpperCase().trim() });
    if (existingSku) {
      return res.status(400).json({ message: 'A product with this SKU already exists' });
    }

    const newProduct = await Product.create({
      name: name.trim(),
      sku: sku.toUpperCase().trim(),
      price: Number(price),
      category: category.trim(),
      description: description ? description.trim() : '',
      image: image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      variant: variant ? variant.trim() : 'Standard',
    });

    res.status(201).json(newProduct);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A product with this SKU already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Admin only)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sku, price, category, description, image, variant } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (name !== undefined) product.name = name.trim();
    if (sku !== undefined) product.sku = sku.toUpperCase().trim();
    if (price !== undefined) product.price = Number(price);
    if (category !== undefined) product.category = category.trim();
    if (description !== undefined) product.description = description.trim();
    if (image !== undefined) product.image = image;
    if (variant !== undefined) product.variant = variant.trim();

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Admin only)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product removed successfully', id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
