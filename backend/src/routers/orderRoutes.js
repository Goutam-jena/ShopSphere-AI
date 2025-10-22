const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController.js");
const AuthMiddleware = require("../middlewares/authMiddleware.js");

router.post("/", AuthMiddleware, orderController.createOrder);

router.get("/user", AuthMiddleware, orderController.getUserOrderHistory);

router.put("/:orderId/cancel", AuthMiddleware, orderController.cancelOrder);

router.get("/:orderId", AuthMiddleware, orderController.getOrderById);

router.get(
  "/item/:orderItemId",
  AuthMiddleware,
  orderController.getOrderItemById
);

router.delete("/:orderId", AuthMiddleware, orderController.deleteOrder);

module.exports = router;
