const express = require('express');
const router = express.Router();
const { paymentSuccessHandler } = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/success', authMiddleware, paymentSuccessHandler);

module.exports = router;