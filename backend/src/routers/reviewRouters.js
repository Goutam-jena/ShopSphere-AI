const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const reviewController = require("../controllers/reviewController");
router.post("/product/:productId", authMiddleware, reviewController.createReview);

router.get("/product/:productId", reviewController.getReviewsByProductId);

router.put("/:reviewId", authMiddleware, reviewController.updateReview);
router.delete("/:reviewId", authMiddleware, reviewController.deleteReview);

module.exports = router;

