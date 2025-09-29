const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');
const sellerAuthMiddleware = require('../middlewares/sellerAuthMiddleware.js');

router.get('/', sellerAuthMiddleware, orderController.getSellersOrders);
router.patch('/:orderId/status/:orderStatus', sellerAuthMiddleware, orderController.updateOrderStatus);
router.delete('/:orderId', sellerAuthMiddleware, orderController.deleteOrder);

module.exports = router;