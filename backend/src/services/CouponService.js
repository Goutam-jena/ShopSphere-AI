const Coupon = require('../models/Coupon');
const User = require('../models/User');
const Cart = require('../models/Cart');
const mongoose = require('mongoose');
const CouponNotValidException = require('../exceptions/CouponNotValidException');

const couponService = {

  async applyCoupon(code, orderValue, user) {
    try {
      
      const coupon = await Coupon.findOne({ code });
      const cart = await Cart.findOne({ user: user._id });

      if (!coupon) {
        throw new CouponNotValidException('Coupon not found');
      }

      if (user.usedCoupons.includes(coupon._id)) {
        throw new CouponNotValidException('Coupon already used');
      }

      if (orderValue <= coupon.minimumOrderValue) {
        throw new CouponNotValidException(
          `Valid for minimum order value ${coupon.minimumOrderValue}`
        );
      }

      const currentDate = new Date();

      if (
        coupon.active &&
        currentDate >= coupon.validityStartDate &&
        currentDate <= coupon.validityEndDate
      ) {
    
        user.usedCoupons.push(coupon._id);
        await user.save();

        
        const discount = Math.round((cart.totalSellingPrice * coupon.discountPercentage) / 100);
        cart.totalSellingPrice -= discount;
        cart.couponCode = code;
        cart.couponPrice = discount;

        return await cart.save();
      }

      throw new CouponNotValidException('Coupon not valid');
    } catch (error) {
      throw new Error(error.message);
    }
  },

 
  async removeCoupon(code, user) {
    try {
      const coupon = await Coupon.findOne({ code });

      if (!coupon) {
        throw new Error('Coupon not found');
      }

      user.usedCoupons = user.usedCoupons.filter((usedCoupon) => !usedCoupon.equals(coupon._id));
      await user.save();

      const cart = await Cart.findOne({ userId: user._id });
      cart.totalSellingPrice += cart.couponPrice; // Add the discount back to the cart's total
      cart.couponCode = null;
      cart.couponPrice = 0;

      return await cart.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  
  async createCoupon(couponData) {
    try {
      const newCoupon = new Coupon(couponData);
      return await newCoupon.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  
  async deleteCoupon(couponId) {
    try {
      await Coupon.findByIdAndDelete(couponId);
    } catch (error) {
      throw new Error(error.message);
    }
  },


  async getAllCoupons() {
    try {
      return await Coupon.find();
    } catch (error) {
      throw new Error(error.message);
    }
  },


  async getCouponById(couponId) {
    try {
      return await Coupon.findById(couponId);
    } catch (error) {
      throw new Error('Coupon not found');
    }
  }
};

module.exports = couponService;
