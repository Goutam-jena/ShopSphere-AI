const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    mrpPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    discountPercent: { type: Number, required: true },
    quantity: { type: Number },
    color: { type: String, required: true },
    images: { type: [String], default: [] },
    numRatings: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
    createdAt: { type: Date, default: Date.now },
    sizes: { type: String, required: false },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review', default: [] }]
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;