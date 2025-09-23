const OrderService = require("../services/OrderService");
const CartService = require("../services/CartService");

class OrderController {
  async createOrder(req, res) {
    const { shippingAddress } = req.body;
    try {
      const user = await req.user;
      const cart = await CartService.findUserCart(user);
      const orders = await OrderService.createOrder(user, shippingAddress, cart);

      // We will add payment logic here in a future commit
      return res.status(200).json({ message: "Order created successfully", orders });

    } catch (error) {
      return res.status(500).json({ message: `Error creating order: ${error.message}` });
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
}
module.exports = new OrderController();