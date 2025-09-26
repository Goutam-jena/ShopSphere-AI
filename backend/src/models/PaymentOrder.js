const mongoose = require('mongoose');

const paymentOrderSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
    paymentMethod: { type: String, enum: ['RAZORPAY', 'STRIPE'], default: 'RAZORPAY' },
    paymentLinkId: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
}, { timestamps: true });

const PaymentOrder = mongoose.model('PaymentOrder', paymentOrderSchema);
module.exports = PaymentOrder;