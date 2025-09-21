const CartService = require("../services/CartService");
const CartItemService = require("../services/CartItemService");

class CartController {
  async findUserCartHandler(req, res) {
    try {
      const user = await req.user;
      const cart = await CartService.findUserCart(user);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addItemToCart(req, res) {
    try {
      const user = await req.user;
      const cartItem = await CartService.addCartItem(user, req.body.productId, req.body.size, req.body.quantity);
      res.status(202).json(cartItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCartItemHandler(req, res) {
    try {
      const user = await req.user;
      await CartItemService.removeCartItem(user._id, req.params.cartItemId);
      res.status(202).json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCartItemHandler(req, res) {
    try {
      const user = await req.user;
      const updatedCartItem = await CartItemService.updateCartItem(user._id, req.params.cartItemId, req.body);
      res.status(202).json(updatedCartItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = new CartController();