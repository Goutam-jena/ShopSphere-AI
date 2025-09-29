const OrderService = require("../services/OrderService");
const CartService = require("../services/CartService");
const PaymentService = require("../services/PaymentService");

class OrderController {
  async createOrder(req, res) {
    const { shippingAddress } = req.body;
    try {
      const user = await req.user;
      const cart = await CartService.findUserCart(user);
      const orders = await OrderService.createOrder(user, shippingAddress, cart);

      const paymentOrder = await PaymentService.createPaymentOrder(user, orders);

      if (paymentOrder.amount < 1) {
        throw new Error(`The total order amount must be at least ₹1.`);
      }

      const paymentLink = await PaymentService.createRazorpayPaymentLink(
        user,
        paymentOrder.amount,
        paymentOrder._id
      );

      paymentOrder.paymentLinkId = paymentLink.id;
      await paymentOrder.save();

      return res.status(200).json({
        message: "Order created successfully",
        orders,
        payment_link_url: paymentLink.short_url,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error creating order: ${error.message}` });
    }
  }

  async getUserOrderHistory(req, res) {
    try {
      const userId = await req.user._id;
      const orderHistory = await OrderService.usersOrderHistory(userId);
      return res.status(200).json(orderHistory);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  
  async getSellersOrders(req, res) {
    try {
      const sellerId = req.seller._id;
      const orders = await OrderService.getShopsOrders(sellerId);
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { orderId, orderStatus } = req.params;
      const updatedOrder = await OrderService.updateOrderStatus(
        orderId,
        orderStatus
      );
      return res.status(200).json(updatedOrder);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      await OrderService.deleteOrder(orderId);
      return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new OrderController();
