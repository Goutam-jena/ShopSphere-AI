const CartItem = require("../models/CartItem.js");
const Cart = require("../models/Cart.js");

class CartService {
  async findUserCart(user) {
    let cart = await Cart.findOne({ user: user._id }).populate({
      path: "cartItems",
      populate: { path: "product" },
    });
    if (!cart) {
      cart = new Cart({ user: user._id, cartItems: [] });
      cart = await cart.save();
    }
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    cart.cartItems.forEach((cartItem) => {
      totalPrice += cartItem.mrpPrice;
      totalDiscountedPrice += cartItem.sellingPrice;
      totalItem += cartItem.quantity;
    });

    cart.totalMrpPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.totalSellingPrice = totalDiscountedPrice;
    cart.discount = totalPrice - totalDiscountedPrice;
    return cart;
  }

  async addCartItem(user, product, size, quantity) {
    const cart = await this.findUserCart(user);
    let isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, size });

    if (!isPresent) {
      const cartItem = new CartItem({
        product, quantity, size,
        userId: user._id,
        sellingPrice: quantity * product.sellingPrice,
        mrpPrice: quantity * product.mrpPrice,
        cart: cart._id,
      });
      const createdCartItem = await cartItem.save();
      cart.cartItems.push(createdCartItem);
      await cart.save();
      return createdCartItem;
    }
    return isPresent;
  }
}

module.exports = new CartService();