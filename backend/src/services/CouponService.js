const Coupon = require('../models/Coupon');
const Cart = require('../models/cart');
const CouponNotValidException = require('../exceptions/CouponNotValidException');

const couponService = {
  
  async applyCoupon(code, orderValue, user) {
    // Placeholder logic for now
    console.log(`Attempting to apply coupon ${code} for user ${user.id}`);
    return {};
  },

  
  async createCoupon(couponData) {
    const newCoupon = new Coupon(couponData);
    return await newCoupon.save();
  },

  async deleteCoupon(couponId) {
    const result = await Coupon.findByIdAndDelete(couponId);
    if (!result) throw new Error("Coupon not found");
    return result;
  },

  async getAllCoupons() {
    return await Coupon.find();
  }
};
module.exports = couponService;