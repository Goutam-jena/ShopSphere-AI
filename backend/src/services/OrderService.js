const Order = require("../models/Order");
const Address = require("../models/Address");
const User = require("../models/User");
const OrderItem = require("../models/OrderItem");
const Seller = require("../models/seller");
const OrderError = require("../exceptions/OrderError"); // Added this line

class OrderService {
   
    async createOrder(user, shippingAddress, cart) {
        if (!shippingAddress._id) {
            const newAddress = await Address.create(shippingAddress);
            await User.findByIdAndUpdate(user._id, { $addToSet: { addresses: newAddress._id } });
            shippingAddress = newAddress;
        }

        const itemsBySeller = cart.cartItems.reduce((acc, item) => {
            const sellerId = item.product.seller._id.toString();
            acc[sellerId] = acc[sellerId] || [];
            acc[sellerId].push(item);
            return acc;
        }, {});

        const orders = [];

        for (const [sellerId, cartItems] of Object.entries(itemsBySeller)) {
            const sellerExists = await Seller.findById(sellerId);
            if (!sellerExists) throw new Error(`A product in your cart belongs to a seller that no longer exists.`);

            const orderItems = await Promise.all(cartItems.map(async (cartItem) => {
                const orderItem = new OrderItem({
                    product: cartItem.product._id,
                    quantity: cartItem.quantity,
                    size: cartItem.size,
                    mrpPrice: cartItem.mrpPrice,
                    sellingPrice: cartItem.sellingPrice,
                });
                return await orderItem.save();
            }));

            const totalMrpPrice = orderItems.reduce((sum, item) => sum + item.mrpPrice, 0);
            const totalSellingPrice = orderItems.reduce((sum, item) => sum + item.sellingPrice, 0);
            const totalItemCount = orderItems.reduce((sum, item) => sum + item.quantity, 0);

            const newOrder = new Order({
                user: user._id,
                seller: sellerId,
                orderItems: orderItems.map(item => item._id),
                totalMrpPrice,
                totalSellingPrice,
                totalItem: totalItemCount,
                shippingAddress: shippingAddress._id,
            });
            const savedOrder = await newOrder.save();
            orders.push(savedOrder);
        }
        return orders;
    }

    async findOrderById(orderId) {
        const order = await Order.findById(orderId).populate([{ path: "shippingAddress" }, { path: "orderItems", populate: { path: "product" } }]);
        if (!order) throw new Error(`Order not found with id ${orderId}`);
        return order;
    }

    async usersOrderHistory(userId) {
        return await Order.find({ user: userId }).populate([{ path: "orderItems", populate: { path: "product" } }]);
    }
    
   
    async getShopsOrders(sellerId) {
        return await Order.find({ seller: sellerId })
            .sort({ orderDate: -1 })
            .populate([
                { path: "user" },
                { path: "shippingAddress" },
                { path: "orderItems", populate: { path: "product" } },
            ]);
    }

    async updateOrderStatus(orderId, orderStatus) {
        const order = await this.findOrderById(orderId);
        order.orderStatus = orderStatus;
        return await Order.findByIdAndUpdate(orderId, order, { new: true }).populate([
            { path: "user" },
            { path: "shippingAddress" },
            { path: "orderItems", populate: { path: "product" } },
        ]);
    }

    async deleteOrder(orderId) {
        const order = await this.findOrderById(orderId);
        if (!order) {
            throw new OrderError(`Order not found with id ${orderId}`);
        }
        return await Order.deleteOne({ _id: orderId });
    }
}

module.exports = new OrderService();