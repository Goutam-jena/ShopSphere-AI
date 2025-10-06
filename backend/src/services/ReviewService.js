const Review = require("../models/Review");
const ProductService = require("./ProductService");
const createError = require("http-errors");

class ReviewService {
  async createReview(reqBody, user, productId) {
    const product = await ProductService.findProductById(productId);

    const review = new Review({
      user: user._id,
      product: product._id,
      rating: reqBody.rating,
      reviewText: reqBody.reviewText,
      productImages: reqBody.productImages || [],
    });

    const savedReview = await review.save();
    return Review.findById(savedReview._id).populate("user");
  }

  async getReviewsByProductId(productId) {
    const reviews = await Review.find({ product: productId }).populate("user");
    return reviews;
  }
}

module.exports = new ReviewService();