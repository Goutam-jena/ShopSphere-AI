



const mongoose = require("mongoose");
const AccountStatus = require("../domain/AccountStatus");

const sellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Link to User model
      required: true,
      unique: true, // One seller profile per us
    },
    sellerName: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    businessDetails: {
      businessName: {
        type: String,
        required: true,
      },
      businessEmail: String,
      businessMobile: String,
      businessAddress: String,
      logo: String,
      banner: String,
    },
    bankDetails: {
      accountNumber: {
        type: String,
        required: true,
      },
      accountHolderName: {
        type: String,
        required: true,
      },
      ifscCode: {
        type: String,
        required: true,
      },
    },
    pickupAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    GSTIN: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    accountStatus: {
      type: String,
      enum: [
        AccountStatus.PENDING_VERIFICATION,
        AccountStatus.ACTIVE,
        AccountStatus.SUSPENDED,
        AccountStatus.DEACTIVATED,
        AccountStatus.BANNED,
        AccountStatus.CLOSED,
      ],
      default: AccountStatus.PENDING_VERIFICATION,
    },
  },
  { timestamps: true }
);

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
