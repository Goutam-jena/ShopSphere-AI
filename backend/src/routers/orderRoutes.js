const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');
const AuthMiddleware = require('../middlewares/authMiddleware.js');

// Create a new order
router.post('/', AuthMiddleware, orderController.createOrder);


// Get user's order history
router.get('/user', AuthMiddleware, orderController.getUserOrderHistory);


// Cancel an order
router.put('/:orderId/cancel', AuthMiddleware, orderController.cancelOrder);

// Get order by ID
router.get('/:orderId', AuthMiddleware, orderController.getOrderById);

router.get('/item/:orderItemId', AuthMiddleware, orderController.getOrderItemById);

// Delete an order
router.delete('/:orderId', AuthMiddleware, orderController.deleteOrder);

module.exports = router;

