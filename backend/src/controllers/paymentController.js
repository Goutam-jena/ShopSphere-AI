const PaymentService = require("../services/PaymentService");

const paymentSuccessHandler = async (req, res) => {
  const { paymentId } = req.params;
  const { razorpay_payment_link_id } = req.query;

  try {
    const paymentOrder = await PaymentService.getPaymentOrderByPaymentLinkId(razorpay_payment_link_id);
    const paymentSuccess = await PaymentService.proceedPaymentOrder(paymentOrder, paymentId);

    if (paymentSuccess) {
      return res.status(201).json({ message: "Payment successful and order placed." });
    } else {
      return res.status(400).json({ message: "Payment failed." });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  paymentSuccessHandler,
};