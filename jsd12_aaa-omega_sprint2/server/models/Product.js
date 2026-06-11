const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    sku: { type: String, default: '' },
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['solar', 'inverter', 'battery', 'accessory'],
    },
    description: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
    tags: [{ type: String }],
    price: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, default: 0, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    stockMin: { type: Number, default: 0, min: 0 },
    date: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
