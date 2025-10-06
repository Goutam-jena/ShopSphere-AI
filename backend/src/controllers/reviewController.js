const ReviewService = require("../services/ReviewService");

class ReviewController {
  async createReview(req, res, next) {
    try {
      const productId = req.params.productId;
      const user = await req.user;
      const review = await ReviewService.createReview(req.body, user, productId);
      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  }

  async getReviewsByProductId(req, res, next) {
    try {
      const reviews = await ReviewService.getReviewsByProductId(req.params.productId);
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReviewController();