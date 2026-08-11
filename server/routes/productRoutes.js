const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');

// GET /api/products -> Admin + User
router.get('/', protect, getProducts);

// POST /api/products -> Admin only
router.post('/', protect, authorize('Admin'), createProduct);

// PUT /api/products/:id -> Admin only
router.put('/:id', protect, authorize('Admin'), updateProduct);

// DELETE /api/products/:id -> Admin only
router.delete('/:id', protect, authorize('Admin'), deleteProduct);

module.exports = router;
