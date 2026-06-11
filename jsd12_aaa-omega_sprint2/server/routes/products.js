const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products - Admin fetch all products in store
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create new product - Admin save new product to store
router.post('/', async (req, res) => {
  try {
    const { name, description, price, stock, category, tags, sku, salePrice, stockMin, image, date } = req.body;

    const productId = `p${Date.now()}`;
    const product = new Product({
      productId,
      sku: sku || '',
      name,
      category,
      description,
      image: image || '',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []),
      price: Number(price),
      salePrice: Number(salePrice) || 0,
      stock: Number(stock),
      stockMin: Number(stockMin) || 0,
      date: new Date(date),
      isActive: true,
    });

    const saved = await product.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT update product - Admin change product within system
router.put('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;

    if (updates.tags && !Array.isArray(updates.tags)) {
      updates.tags = updates.tags.split(',').map(t => t.trim()).filter(Boolean);
    }
    if (updates.price !== undefined) updates.price = Number(updates.price);
    if (updates.salePrice !== undefined) updates.salePrice = Number(updates.salePrice);
    if (updates.stock !== undefined) updates.stock = Number(updates.stock);
    if (updates.stockMin !== undefined) updates.stockMin = Number(updates.stockMin);

    const product = await Product.findOneAndUpdate(
      { productId },
      updates,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE product - Admin remove product from system
router.delete('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOneAndDelete({ productId });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
