const Transaction = require('../models/Transaction');
const Order = require('../models/Order');

class TransactionService {

    async createTransaction(orderId) {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error(`Order not found with ID: ${orderId}`);
        }
        const transaction = new Transaction({
            seller: order.seller,
            customer: order.user,
            order: order._id,
        });
        return await transaction.save();
    }

   
    async getTransactionsBySellerId(sellerId) {
        return await Transaction.find({ seller: sellerId }).populate('order customer');
    }
}

module.exports = new TransactionService();