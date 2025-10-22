// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');

// Import routers
const productRoutes = require('./routers/productRoutes.js');
const authRoutes = require('./routers/authRouters.js');
const adminRoutes = require('./routers/adminRouters.js');
const cartRoutes = require('./routers/CartRoutes.js');
const revenueRoutes = require('./routers/revenueRoutes.js');
const sellerOrderRoutes = require('./routers/sellerOrderRoutes.js');
const sellerProductRoutes = require('./routers/sellerProductRoutes.js');
const sellerReportRoutes = require('./routers/sellerReportRoutes.js');
const sellerRoutes = require('./routers/sellerRoutes.js');
const transactionRoutes = require('./routers/transactionRoutes.js');
const userRoutes = require('./routers/userRoutes.js');
const wishlistRoutes = require('./routers/wishlistRoutes.js');
const orderRoutes = require('./routers/orderRoutes.js');
const paymentRoutes = require('./routers/paymentRoutes.js');
const dealRoutes = require('./routers/dealRoutes.js');
const couponRoutes = require('./routers/couponRoutes.js');
const homeRoutes = require('./routers/homeCategoryRoutes.js');
const chatbotRoutes = require('./routers/chatboatRoutes.js');
const reviewRoutes = require('./routers/reviewRouters.js');

const app = express();

// --- Middleware ---
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173', // local dev
  process.env.CLIENT_URL   // frontend URL from environment variables
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error('CORS policy does not allow access from this origin'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// --- Public Route ---
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ShopSphere' });
});

// --- Routers ---
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/sellers', sellerRoutes);
app.use('/products', productRoutes);
app.use('/api/sellers/product', sellerProductRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/seller/orders', sellerOrderRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/sellers/report', sellerReportRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/home', homeRoutes);
app.use('/admin/deals', dealRoutes);
app.use('/admin', adminRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/sellers/revenue', revenueRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/chat', chatbotRoutes);

// --- Centralized Error Handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected error occurred.'
  });
});

// --- Start Server AFTER DB connection ---
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to DB:', err.message);
    process.exit(1);
  }
};

startServer();
