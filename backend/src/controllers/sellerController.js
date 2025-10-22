


const UserRoles = require("../domain/UserRole");
const SellerError = require("../exceptions/SellerError");
const Seller = require("../models/Seller");
const VerificationCode = require("../models/VerificationCode");
const SellerService = require("../services/SellerService");
const VerificationService = require("../services/VerificationService");
const generateOTP = require("../utils/generateOtp");
const jwtProvider = require("../utils/jwtProvider");
const { sendVerificationEmail } = require("../utils/sendEmail");
// --- FIX: Added required models for the login fix ---
const User = require("../models/User");
const bcryptjs = require("bcryptjs");

class SellerController {
  async getSellerProfile(req, res) {
    try {
      const jwt = req.headers.authorization.split(" ")[1];
      const seller = await SellerService.getSellerProfile(jwt);
      res.status(200).json(seller);
    } catch (err) {
      res
        .status(err instanceof SellerError ? 404 : 500)
        .json({ message: err.message });
    }
  }

  async createSeller(req, res) {
    try {
      const newSeller = await SellerService.createSeller(req.body);
      const otp = generateOTP();
      const verificationCode = await VerificationService.createVerificationCode(
        otp,
        req.body.email
      );
      const subject = " ShopSphere Email Verification Code";
      const text = "Welcome to ShopSphere, verify your account using this link: ";
      const frontendUrl = "http://localhost:3000/verify-seller/" + otp;
      await sendVerificationEmail(
        req.body.email,
        subject,
        text + frontendUrl
      );
      return res
        .status(201)
        .json({
          message: "Seller created successfully, verification email sent.",
        });
    } catch (err) {
      res
        .status(err instanceof SellerError ? 400 : 500)
        .json({ error: err.message });
    }
  }

  async getSellerById(req, res) {
    try {
      const seller = await SellerService.getSellerById(req.params.id);
      res.status(200).json(seller);
    } catch (err) {
      res
        .status(err instanceof SellerError ? 404 : 500)
        .json({ message: err.message });
    }
  }

  async getAllSellers(req, res) {
    try {
      const { status } = req.query;
      const sellers = await SellerService.getAllSellers(status);
      res.status(200).json(sellers);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateSeller(req, res) {
    try {
      const seller = await req.seller;
      const updatedSeller = await SellerService.updateSeller(
        seller,
        req.body
      );
      res.status(200).json(updatedSeller);
    } catch (err) {
      res
        .status(err instanceof SellerError ? 404 : 500)
        .json({ message: err.message });
    }
  }

  async deleteSeller(req, res) {
    try {
      await SellerService.deleteSeller(req.params.id);
      res.status(204).send(); // No Content
    } catch (err) {
      res
        .status(err instanceof SellerError ? 404 : 500)
        .json({ message: err.message });
    }
  }

  async verifyEmail(req, res) {
    try {
      const { email, otp } = req.body; // Expecting email and OTP in request body
      const seller = await SellerService.verifyEmail(email, otp);
      res.status(200).json(seller);
    } catch (err) {
      res
        .status(err instanceof SellerError ? 404 : 500)
        .json({ message: err.message });
    }
  }

  async updateSellerAccountStatus(req, res) {
    try {
      const updatedSeller = await SellerService.updateSellerAccountStatus(
        req.params.id,
        req.params.status
      );
      res.status(200).json(updatedSeller);
    } catch (err) {
      res
        .status(err instanceof SellerError ? 404 : 500)
        .json({ message: err.message });
    }
  }

  // --- FIX: Replaced the entire verifyLoginOtp function with the new version ---
  async verifyLoginOtp(req, res) {
    try {
      const { otp, email } = req.body;

      const seller = await Seller.findOne({ email: { $regex: new RegExp(`^${email.trim()}$`, 'i') } });

      if (!seller) {
        throw new SellerError("Seller not found with this email...");
      }

      let user = await User.findOne({ email: { $regex: new RegExp(`^${email.trim()}$`, 'i') } });

      if (!user) {
        console.log(`[MIGRATION] Creating missing User account for existing seller: ${seller.email}`);
        
        // Generate a random, unusable password to satisfy the schema
        const randomPassword = await bcryptjs.hash(Date.now().toString() + Math.random().toString(), 10);
        
        user = new User({
          fullName: seller.sellerName,
          email: seller.email,
          password: randomPassword, // Use the random password
          role: UserRoles.SELLER,
        });
        await user.save();
        
        if (seller.user !== user._id) {
          seller.user = user._id;
          await seller.save();
        }
      }

      const verificationCode = await VerificationCode.findOne({ email });
      if (!verificationCode || verificationCode.otp !== otp) {
        throw new Error("Wrong OTP...");
      }
      const token = jwtProvider.createJwt({ email: seller.email, role: UserRoles.SELLER });

      const authResponse = {
        message: "Login Success",
        jwt: token,
        role: UserRoles.SELLER,
      };

      return res.status(200).json(authResponse);
    } catch (err) {
      res.status(err instanceof SellerError ? 400 : 500).json({ message: err.message });
    }
  }

  async updateSellerProfilePicture(req, res) {
    try {
        const seller = await req.seller;
        const { imageUrl, publicId } = req.body;
        const updatedSeller = await SellerService.updateSellerProfilePicture(seller._id, imageUrl, publicId);
        res.status(200).json(updatedSeller);
    } catch (err) {
        res.status(err instanceof SellerError ? 404 : 500).json({ message: err.message });
    }
  }
}

module.exports = new SellerController();