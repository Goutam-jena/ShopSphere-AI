const couponService = require("../services/CouponService");

class CouponController {
    
    async applyCoupon(req, res) {
       
    }

   
    async createCoupon(req, res) {
        try {
            const coupon = await couponService.createCoupon(req.body);
            return res.status(201).json(coupon);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteCoupon(req, res) {
        try {
            await couponService.deleteCoupon(req.params.id);
            return res.status(200).json({ message: "Coupon deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllCoupons(req, res) {
        try {
            const coupons = await couponService.getAllCoupons();
            return res.status(200).json(coupons);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new CouponController();