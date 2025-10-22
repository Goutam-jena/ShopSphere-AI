


const Product = require("../models/Product.js");
const Category = require("../models/Category.js");
const mongoose = require("mongoose");
const ProductError = require("../exceptions/ProductError.js");

const calculateDiscountPercentage = (mrpPrice, sellingPrice) => {
  if (mrpPrice <= 0) {
    throw new Error("MRP must be greater than zero");
  }
  const discount = mrpPrice - sellingPrice;
  return Math.round((discount / mrpPrice) * 100);
};

class ProductService {
  async createProduct(req, seller) {
    try {
      const discountPercentage = calculateDiscountPercentage(
        req.mrpPrice,
        req.sellingPrice
      );

      const category1 = await this.createOrGetCategory(req.category, 1);
      const category2 = await this.createOrGetCategory(
        req.category2,
        2,
        category1._id
      );
      const category3 = await this.createOrGetCategory(
        req.category3,
        3,
        category2._id
      );

      const product = new Product({
        seller: seller._id,
        category: category3._id,
        title: req.title,
        color: req.color,
        description: req.description,
        discountPercent: discountPercentage,
        sellingPrice: req.sellingPrice,
        images: req.images,
        mrpPrice: req.mrpPrice,
        sizes: req.sizes,
        createdAt: new Date(),
      });

      return await product.save();
    } catch (error) {
      throw new ProductError(error.message);
    }
  }

  async createOrGetCategory(categoryId, level, parentId = null) {
    let category = await Category.findOne({ categoryId });
    if (!category) {
      category = new Category({
        categoryId,
        level,
        parentCategory: parentId,
      });
      await category.save();
    }
    return category;
  }

  async deleteProduct(productId) {
    try {
      const product = await this.findProductById(productId);
      await Product.findByIdAndDelete(product._id);
    } catch (error) {
      throw new ProductError(error.message);
    }
  }

  async updateProduct(productId, updatedProductData) {
    try {
      const product = await Product.findByIdAndUpdate(
        productId,
        { $set: updatedProductData },
        { new: true }
      );
      if (!product) throw new ProductError("Product not found");
      return product;
    } catch (error) {
      throw new ProductError(error.message);
    }
  }

  async findProductById(productId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ProductError("Invalid product ID...");
      }
      const product = await Product.findById(productId).populate("seller");
      if (!product) throw new ProductError("Product not found");
      return product;
    } catch (error) {
      throw new ProductError(error.message);
    }
  }

  async searchProduct(query) {
    const regex = new RegExp(query, "i");
    const products = await Product.find({
      $or: [
        { title: regex },
        { description: regex },
        { color: regex },
      ],
    });
    return products;
  }

  async getAllProducts(req) {
    const filterQuery = {};

    // --- THIS IS THE CORRECTED LOGIC ---
    if (req.category) {
      const mainCategory = await Category.findOne({ categoryId: req.category });

      if (mainCategory) {
        // Find all child and grandchild categories
        const childCategories = await Category.find({ parentCategory: mainCategory._id });
        const childCategoryIds = childCategories.map(cat => cat._id);

        const grandChildCategories = await Category.find({ parentCategory: { $in: childCategoryIds } });
        const grandChildCategoryIds = grandChildCategories.map(cat => cat._id);

        // Combine all relevant category IDs
        const allApplicableCategoryIds = [mainCategory._id, ...childCategoryIds, ...grandChildCategoryIds];

        // Use the $in operator to find products in any of these categories
        filterQuery.category = { $in: allApplicableCategoryIds };
      } else {
        // If no category is found at all, return an empty result
        return { content: [], totalPages: 0, totalElements: 0 };
      }
    }
    // --- END OF CORRECTION ---

    if (req.color) {
      filterQuery.color = req.color;
    }
    if (req.size) {
      filterQuery.size = req.size;
    }
    if (req.minPrice) {
      filterQuery.sellingPrice = { $gte: req.minPrice };
    }
    if (req.maxPrice) {
      filterQuery.sellingPrice = {
        ...filterQuery.sellingPrice,
        $lte: req.maxPrice,
      };
    }
    if (req.minDiscount) {
      filterQuery.discountPercent = { $gte: req.minDiscount };
    }
    if (req.stock) {
      filterQuery.stock = req.stock;
    }

    let sortQuery = {};
    if (req.sort === "price_low") {
      sortQuery.sellingPrice = 1;
    } else if (req.sort === "price_high") {
      sortQuery.sellingPrice = -1;
    }

    const page = parseInt(req.pageNumber) || 0;
    const pageSize = parseInt(req.pageSize) || 10;

    const products = await Product.find(filterQuery)
      .sort(sortQuery)
      .skip(page * pageSize)
      .limit(pageSize);

    const totalElements = await Product.countDocuments(filterQuery);
    const totalPages = Math.ceil(totalElements / pageSize);

    const res = {
      content: products,
      totalPages,
      totalElements,
    };

    return res;
  }

  async recentlyAddedProduct() {
    return await Product.find().sort({ createdAt: -1 }).limit(10);
  }

  async getProductBySellerId(sellerId) {
    return await Product.find({ seller: sellerId });
  }
}

module.exports = new ProductService();


