const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/', authMiddleware, orderController.createOrder);
router.get('/user', authMiddleware, orderController.getUserOrderHistory);

module.exports = router;