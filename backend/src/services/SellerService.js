




const Seller = require("../models/Seller");       
const Address = require("../models/Address");     
const jwtProvider = require("../utils/jwtProvider");
const bcryptjs = require("bcryptjs");
const SellerError = require("../exceptions/SellerError");
const User = require("../models/User");          
const UserRoles = require("../domain/UserRole");  

class SellerService {
  async getSellerProfile(jwt) {
    const email = jwtProvider.getEmailFromJwt(jwt);
    return this.getSellerByEmail(email);
  }

  async createSeller(sellerData) {
    let user = await User.findOne({ email: sellerData.email });

    
    if (!user) {
      const hashedPassword = await bcryptjs.hash(sellerData.password, 10);
      user = new User({
        fullName: sellerData.sellerName,
        email: sellerData.email,
        password: hashedPassword,
        role: UserRoles.SELLER,
      });
      await user.save();
    }
    
    else if (user.role !== UserRoles.SELLER) {
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
      user: user._id, // link with user
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

  async getSellerById(id) {
    const seller = await Seller.findById(id).populate("pickupAddress").populate("user");
    if (!seller) {
      throw new SellerError("Seller not found");
    }
    return seller;
  }

  async getSellerByEmail(email) {
    const seller = await Seller.findOne({ email })
      .populate("pickupAddress")
      .populate("user");
    if (!seller) {
      throw new SellerError("Seller not found");
    }
    return seller;
  }

  async getAllSellers(status) {
    return await Seller.find({ accountStatus: status }).populate("user");
  }

  async updateSeller(existingSeller, sellerData) {
    return await Seller.findByIdAndUpdate(existingSeller._id, sellerData, {
      new: true,
    })
      .populate("pickupAddress")
      .populate("user");
  }

  async deleteSeller(id) {
    const exists = await Seller.exists({ _id: id });
    if (!exists) {
      throw new SellerError("Seller not found with id " + id);
    }
    await Seller.deleteOne({ _id: id });
  }

  async verifyEmail(email, otp) {
    const seller = await this.getSellerByEmail(email);
    seller.isEmailVerified = true;
    return await seller.save();
  }

  async updateSellerAccountStatus(sellerId, status) {
    const seller = await this.getSellerById(sellerId);
    seller.accountStatus = status;
    return await seller.save();
  }
}

module.exports = new SellerService();
