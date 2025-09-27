const mongoose = require("mongoose");
const AccountStatus = require("../domain/AccountStatus");

const sellerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    sellerName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    businessDetails: {
        businessName: { type: String, required: true },
        businessEmail: String,
        businessMobile: String,
        businessAddress: String,
        logo: String,
        banner: String,
    },
    bankDetails: {
        accountNumber: { type: String, required: true },
        accountHolderName: { type: String, required: true },
        ifscCode: { type: String, required: true },
    },
    pickupAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    GSTIN: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    accountStatus: { type: String, enum: Object.values(AccountStatus), default: AccountStatus.PENDING_VERIFICATION },
}, { timestamps: true });

const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;