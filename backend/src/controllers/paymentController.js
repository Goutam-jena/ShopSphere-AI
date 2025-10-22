

const PaymentService = require("../services/PaymentService");
const OrderService = require("../services/OrderService");
const SellerService = require("../services/SellerService");
const SellerReportService = require("../services/SellerReportService");
const TransactionService = require("../services/TransactionService");
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");

const paymentSuccessHandler = async (req, res) => {
  const { paymentId } = req.params;
  const { paymentLinkId } = req.query;

  console.log("--- Payment Success Handler Triggered ---");

  try {
    const user = await req.user;
    console.log(`[DEBUG] User found: ${user._id}`);

    const paymentOrder = await PaymentService.getPaymentOrderByPaymentId(paymentLinkId);
    const paymentSuccess = await PaymentService.proceedPaymentOrder(paymentOrder, paymentId, paymentLinkId);

    if (paymentSuccess) {
      console.log("[DEBUG] Payment confirmed as successful by service.");
      
      for (let orderId of paymentOrder.orders) {
        const order = await OrderService.findOrderById(orderId);
        await TransactionService.createTransaction(order);
        const seller = await SellerService.getSellerById(order.seller);
        const sellerReport = await SellerReportService.getSellerReport(seller);
        sellerReport.totalOrders += 1;
        sellerReport.totalEarnings += order.totalSellingPrice;
        sellerReport.totalSales += order.orderItems.length;
        await SellerReportService.updateSellerReport(sellerReport);
      }

      // --- Cart Clearing Logic with Logging ---
      console.log("[DEBUG] Starting cart clearing process...");
      const cart = await Cart.findOne({ user: user._id });

      if (cart) {
        console.log(`[DEBUG] Found cart with ID: ${cart._id}`);
        
        // Delete all CartItem documents associated with this cart
        const deleteResult = await CartItem.deleteMany({ cart: cart._id });
        console.log(`[DEBUG] Deleted ${deleteResult.deletedCount} cart item documents.`);

        // Reset the cart's fields
        cart.cartItems = [];
        cart.totalSellingPrice = 0;
        cart.totalMrpPrice = 0;
        cart.totalItem = 0;
        cart.discount = 0;
        await cart.save();
        console.log("[DEBUG] Cart document successfully reset and saved.");
      } else {
        console.log("[DEBUG] No cart found for this user to clear.");
      }
      
      return res.status(201).json({ message: "Payment successful" });
    } else {
      console.log("[DEBUG] Payment failed according to service.");
      return res.status(400).json({ message: "Payment failed" });
    }
  } catch (err) {
    console.error("--- ERROR in Payment Success Handler ---", err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  paymentSuccessHandler,
};