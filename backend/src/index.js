require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Routers
const productRouters = require("./routers/productRoutes.js");
const authRouters = require("./routers/authRouters.js");
const adminRouters = require("./routers/adminRouters.js");
const cartRouters = require("./routers/cartRoutes.js");
const revenueRouters = require("./routers/revenueRoutes.js");
const sellerOrderRouters = require("./routers/sellerOrderRoutes.js");
const sellerProductRouters = require("./routers/sellerProductRoutes.js");
const sellerReportRouters = require("./routers/sellerReportRoutes.js");
const sellerRouters = require("./routers/sellerRoutes.js");
const transactionRouters = require("./routers/transactionRoutes.js");
const userRouters = require("./routers/userRoutes.js");
const wishlistRouters = require("./routers/wishlistRoutes.js");
const orderRouters = require("./routers/orderRoutes.js");
const paymentRouters = require("./routers/paymentRoutes.js");
const dealRouters = require("./routers/dealRoutes.js");
const couponRouters = require("./routers/couponRoutes.js");
const homeRouters = require("./routers/homeCategoryRoutes.js");
const chatboatRouters = require("./routers/chatboatRoutes.js");
const reviewRouters = require("./routers/reviewRouters.js");

// Root route
app.get("/", (req, res) => {
    res.send({ message: "Welcome to ShopSphere" });
});

// Use Routers
app.use('/auth', authRouters);
app.use("/api/users", userRouters);
app.use("/sellers", sellerRouters);
app.use("/products", productRouters);
app.use("/api/sellers/product", sellerProductRouters);
app.use("/api/cart", cartRouters);
app.use("/api/orders", orderRouters);
app.use("/api/seller/orders", sellerOrderRouters);
app.use("/api/transactions", transactionRouters);
app.use("/api/wishlist", wishlistRouters);
app.use("/api/sellers/report", sellerReportRouters);
app.use("/api/payment", paymentRouters);
app.use("/home", homeRouters);
app.use("/admin/deals", dealRouters);
app.use("/admin", adminRouters);
app.use("/api/coupons", couponRouters);
app.use("/api/sellers/revenue", revenueRouters);
app.use("/api/reviews", reviewRouters);
app.use("/chat", chatboatRouters);

// Start Server with proper error handling
const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error(" Failed to connect to the database. Server is not starting.", error);
        process.exit(1);
    }
};

startServer();
