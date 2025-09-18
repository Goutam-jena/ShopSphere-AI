const mongoose = require("mongoose");
const UserRoles = require("../domain/UserRole");

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    role: {
      type: String,
      enum: [UserRoles.CUSTOMER, UserRoles.SELLER, UserRoles.ADMIN],
      default: UserRoles.CUSTOMER,
    },
    profilePic: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    usedCoupons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;