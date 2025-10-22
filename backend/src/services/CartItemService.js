const CartItem = require("../models/CartItem");
const User = require("../models/User");
const CartItemError = require("../exceptions/CartItemErrror");
const UserError = require("../exceptions/UserError");

class CartItemService {
  async updateCartItem(userId, id, cartItemData) {
    const cartItem = await this.findCartItemById(id);

  

    if (cartItem.userId.toString() === userId.toString()) {
      const updatedFields = {
        quantity: cartItemData.quantity,
        mrpPrice: cartItemData.quantity * cartItem.product.mrpPrice,
        sellingPrice: cartItemData.quantity * cartItem.product.sellingPrice,
      };

      
      return await CartItem.findByIdAndUpdate(id, updatedFields, {
        new: true,
      }).populate("product");
    } else {
      throw new CartItemError("You can't update another user's cart item");
    }
  }

  
  async removeCartItem(userId, cartItemId) {
    

   
    const cartItem = await this.findCartItemById(cartItemId);


    if (cartItem.userId.toString() === userId.toString()) {
      // Delete the cart item
      await CartItem.deleteOne({ _id: cartItem._id });
    } else {
      throw new UserError("You can't remove another user's item");
    }
  }

  // Find a cart item by its ID
  async findCartItemById(cartItemId) {
    const cartItem = await CartItem.findById(cartItemId).populate("product");

    if (!cartItem) {
      throw new CartItemError(`Cart item not found with id: ${cartItemId}`);
    }

    return cartItem;
  }
}

module.exports = new CartItemService();
