const Seller = require("../models/seller.js");
const Address = require("../models/Address.js");
const bcrypt = require("bcrypt");
const SellerError = require("../exceptions/SellerError.js");
const User = require("../models/User.js");
const UserRoles = require("../domain/UserRole.js");
const jwtProvider = require("../utils/jwtProvider.js");

class SellerService {
    async createSeller(sellerData) {
        let user = await User.findOne({ email: sellerData.email });

        if (!user) {
            const hashedPassword = await bcrypt.hash(sellerData.password, 10);
            user = new User({
                fullName: sellerData.sellerName,
                email: sellerData.email,
                password: hashedPassword,
                role: UserRoles.SELLER,
            });
            await user.save();
        } else if (user.role !== UserRoles.SELLER) {
            user.role = UserRoles.SELLER;
            await user.save();
        }

        const existingSeller = await Seller.findOne({ user: user._id });
        if (existingSeller) {
            throw new SellerError("A seller profile already exists for this user.");
        }

        let savedAddress = sellerData.pickupAddress;
        if (savedAddress && !savedAddress._id) {
            savedAddress = await Address.create(savedAddress);
        }

        const newSeller = new Seller({
            user: user._id,
            email: user.email,
            sellerName: sellerData.sellerName,
            GSTIN: sellerData.GSTIN,
            mobile: sellerData.mobile,
            pickupAddress: savedAddress,
            bankDetails: sellerData.bankDetails,
            businessDetails: sellerData.businessDetails,
        });

        return await newSeller.save();
    }

    async getSellerProfile(jwt) {
        const email = jwtProvider.getEmailFromJwt(jwt);
        return this.getSellerByEmail(email);
    }

    async getSellerByEmail(email) {
        const seller = await Seller.findOne({ email }).populate("pickupAddress").populate("user");
        if (!seller) throw new SellerError("Seller not found");
        return seller;
    }

    async updateSeller(existingSeller, sellerData) {
        return await Seller.findByIdAndUpdate(existingSeller._id, sellerData, { new: true })
            .populate("pickupAddress").populate("user");
    }
   
}
module.exports = new SellerService();