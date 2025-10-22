

const Transaction = require('../models/Transaction');
const Seller = require('../models/Seller');
const Order = require('../models/Order');

class TransactionService {
    // Create a new transaction from an order
    async createTransaction(orderId) {
        // Find the order by ID without populating first
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error(`Order not found with ID: ${orderId}`);
        }

        // Now, safely find the seller using the ID from the order
        const seller = await Seller.findById(order.seller);
        if (!seller) {
            throw new Error(`Seller not found for order ID: ${orderId}`);
        }

        // Create a new transaction
        const transaction = new Transaction({
            seller: seller._id,
            customer: order.user,
            order: order._id,
        });

        // Save and return the transaction
        return await transaction.save();
    }

    // Get transactions by seller ID
    async getTransactionsBySellerId(sellerId) {
        return await Transaction.find({ seller: sellerId }).populate('order customer');
    }

    // Get all transactions
    async getAllTransactions() {
        return await Transaction.find().populate('seller order customer');
    }
}

module.exports = new TransactionService();