const bcrypt = require('bcrypt');
const { sendVerificationEmail } = require('../utils/sendEmail');
const generateOTP = require('../utils/generateOtp');
const VerificationCode = require('../models/VerificationCode');
const User = require('../models/User');
const Cart = require('../models/Cart.js');
const jwtProvider = require('../utils/jwtProvider');
const UserError = require('../exceptions/UserError');

class AuthService {
    async sendLoginOtp(email) {
        const SIGNING_PREFIX = "signing_";

        if (email.startsWith(SIGNING_PREFIX)) {
            email = email.substring(SIGNING_PREFIX.length);
            const user = await User.findOne({ email });
            if (!user) throw new UserError("user not found with email : " + email);
        }

        await VerificationCode.deleteOne({ email });

        const otp = generateOTP();
        const verificationCode = new VerificationCode({ otp, email });
        await verificationCode.save();

        const subject = "ShopSphere login/signup OTP";
        const text = `Your login OTP is - ${otp}`;
        await sendVerificationEmail(email, subject, text);
    }

    async createUser(req) {
        const { email, fullName, otp } = req;
        const verificationCode = await VerificationCode.findOne({ email });

        if (!verificationCode || verificationCode.otp !== otp) {
            throw new Error("invalid OTP...");
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                email,
                fullName,
                password: await bcrypt.hash(otp, 10)
            });
            const savedUser = await user.save();
          
            const cart = new Cart({ user: savedUser._id });
            await cart.save();
        }
        
        return jwtProvider.createJwt({ email });
    }

    async signin(req) {
        const { email, otp } = req;
        const user = await User.findOne({ email });

        if (!user) {
            throw new UserError("Invalid username or password");
        }

        const verificationCode = await VerificationCode.findOne({ email });

        if (!verificationCode || verificationCode.otp !== otp) {
            throw new Error("Wrong OTP...");
        }

        const token = jwtProvider.createJwt({ email });

        return {
            message: "Login Success",
            jwt: token,
            role: user.role
        };
    }
}

module.exports = new AuthService();