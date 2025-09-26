const PaymentOrder = require('../models/PaymentOrder');
const Order = require('../models/Order');
const PaymentStatus = require('../domain/PaymentStatus');
const razorpay = require("../config/razorpayClient");
const OrderStatus = require('../domain/OrderStatus');

class PaymentService {
    async createPaymentOrder(user, orders) {
        const amount = orders.reduce((sum, order) => sum + order.totalSellingPrice, 0);
        const paymentOrder = new PaymentOrder({
            amount,
            user: user._id,
            orders: orders.map(order => order._id)
        });
        return await paymentOrder.save();
    }

    async createRazorpayPaymentLink(user, amount, orderId) {
        try {
            const paymentLinkRequest = {
                amount: amount * 100, // Amount in paise
                currency: 'INR',
                customer: { name: user.fullName, email: user.email },
                notify: { email: true },
                callback_url: `${process.env.FRONTEND_URL}/payment-success/${orderId}`,
                callback_method: 'get'
            };
            const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
            return paymentLink;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async processSuccessfulPayment(paymentOrder, paymentId) {
        if (paymentOrder.status === 'PENDING') {
            const payment = await razorpay.payments.fetch(paymentId);
            if (payment.status === 'captured') {
                await Promise.all(paymentOrder.orders.map(async (orderId) => {
                    await Order.findByIdAndUpdate(orderId, {
                        paymentStatus: PaymentStatus.COMPLETED,
                        orderStatus: OrderStatus.PLACED
                    });
                }));
                paymentOrder.status = 'SUCCESS';
                await paymentOrder.save();
                return true;
            }
            paymentOrder.status = 'FAILED';
            await paymentOrder.save();
        }
        return false;
    }
}
module.exports = new PaymentService();