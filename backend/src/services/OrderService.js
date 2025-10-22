

const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Address = require("../models/Address");
const User = require("../models/User");
const OrderItem = require("../models/OrderItem");
const OrderError = require("../exceptions/OrderError");
const OrderStatus = require("../domain/OrderStatus");
const PaymentStatus = require("../domain/PaymentStatus");
const mongoose = require("mongoose");
const TransactionService = require("./TransactionService");
const Seller = require("../models/Seller");

class OrderService {
  async createOrder(user, shippingAddress, cart) {
    try {
      if (shippingAddress._id && !user.addresses.includes(shippingAddress._id)) {
        await User.findByIdAndUpdate(user._id, { $addToSet: { addresses: shippingAddress._id } });
      } else if (!shippingAddress._id) {
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
        if (!sellerExists) {
          throw new Error(`A product in your cart belongs to a seller that no longer exists. Please remove this item and try again.`);
        }
        

        const totalOrderPrice = cartItems.reduce((sum, item) => sum + item.sellingPrice, 0);
        const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

        const newOrder = new Order({
          user: user._id,
          seller: sellerId,
          totalMrpPrice: totalOrderPrice,
          totalSellingPrice: totalOrderPrice,
          totalItem: totalItemCount,
          shippingAddress: shippingAddress._id,
          orderStatus: OrderStatus.PENDING,
          paymentDetails: { status: PaymentStatus.PENDING },
          orderItems: [],
        });

        const savedOrderItems = await Promise.all(
          cartItems.map(async (cartItem) => {
            const orderItem = new OrderItem({
              mrpPrice: cartItem.mrpPrice,
              product: cartItem.product._id,
              quantity: cartItem.quantity,
              size: cartItem.size,
              userId: cartItem.userId,
              sellingPrice: cartItem.sellingPrice,
            });
            return await orderItem.save();
          })
        );
        
        newOrder.orderItems = savedOrderItems.map(item => item._id);
        const savedOrder = await newOrder.save();
        await TransactionService.createTransaction(savedOrder._id);
        orders.push(savedOrder);
      }

      return orders;
    } catch (error) {
      console.log("Error in OrderService.createOrder: ", error.message);
      throw new Error(error.message);
    }
  }

  async findOrderById(orderId) {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      throw new OrderError("Invalid Order ID...");
    }
    const order = await Order.findById(orderId).populate([
      { path: "seller" },
      { path: "shippingAddress" },
      { path: "orderItems", populate: { path: "product" } },
    ]);
    if (!order) {
      throw new OrderError(`Order not found with id ${orderId}`);
    }
    return order;
  }

  async findOrderItemById(orderItemId) {
    if (!mongoose.Types.ObjectId.isValid(orderItemId)) {
      throw new OrderError("Invalid Order Item ID...");
    }
    const order = await OrderItem.findById(orderItemId).populate([
      { path: "product", populate: { path: "seller" } },
    ]);
    if (!order) {
      throw new OrderError(`Order item not found with id ${orderItemId}`);
    }
    return order;
  }

  async usersOrderHistory(userId) {
    return await Order.find({ user: userId }).populate([
      { path: "seller" },
      { path: "shippingAddress" },
      { path: "orderItems", populate: { path: "product" } },
    ]);
  }

  async getShopsOrders(sellerId) {
    return await Order.find({ seller: sellerId })
      .sort({ orderDate: -1 })
      .populate([
        { path: "seller" },
        { path: "shippingAddress" },
        { path: "orderItems", populate: { path: "product" } },
      ]);
  }

  async updateOrderStatus(orderId, orderStatus) {
    const order = await this.findOrderById(orderId);
    order.orderStatus = orderStatus;
    return await Order.findByIdAndUpdate(orderId, order, {
      new: true,
      runValidators: true,
    }).populate([
      { path: "seller" },
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

  async cancelOrder(orderId, user) {
    const order = await this.findOrderById(orderId);
    if (user._id.toString() !== order.user.toString()) {
      throw new OrderError(
        `You can't perform this action on order id ${orderId}`
      );
    }
    order.orderStatus = OrderStatus.CANCELLED;
    return await Order.findByIdAndUpdate(orderId, order, { new: true });
  }
}

module.exports = new OrderService();