const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/product/:productId", authMiddleware, reviewController.createReview);


router.get("/product/:productId", reviewController.getReviewsByProductId);

module.exports = router;