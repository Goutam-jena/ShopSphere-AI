
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:paymentId',authMiddleware, paymentController.paymentSuccessHandler);

module.exports = router;
 