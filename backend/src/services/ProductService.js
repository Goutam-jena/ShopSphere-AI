const Product = require("../models/Product.js");
const Category = require("../models/category.js");
const mongoose = require("mongoose");
const ProductError = require("../exceptions/ProductError.js");

class ProductService {
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
            $or: [{ title: regex }, { description: regex }, { color: regex }],
        });
        return products;
    }

    async getAllProducts(req) {
        const filterQuery = {};
        // The original code only searched for the exact category ID provided.
        // This new logic now finds all child and grandchild categories
        // to confirm  that filtering by "Men" also returns products from
        // "Men's T-Shirts", "Men's Jeans laptop 
        if (req.category) {
            const mainCategory = await Category.findOne({ categoryId: req.category });
            if (mainCategory) {
                // Find direct children
                const childCategories = await Category.find({ parentCategory: mainCategory._id });
                const childCategoryIds = childCategories.map(cat => cat._id);

                const grandChildCategories = await Category.find({ parentCategory: { $in: childCategoryIds } });
                const grandChildCategoryIds = grandChildCategories.map(cat => cat._id);

              
                const allApplicableCategoryIds = [mainCategory._id, ...childCategoryIds, ...grandChildCategoryIds];

                
                filterQuery.category = { $in: allApplicableCategoryIds };
            } else {
                return { content: [], totalPages: 0, totalElements: 0 };
            }
        }


        if (req.color) { filterQuery.color = req.color; }
        if (req.minPrice) { filterQuery.sellingPrice = { $gte: req.minPrice }; }
        if (req.maxPrice) { filterQuery.sellingPrice = { ...filterQuery.sellingPrice, $lte: req.maxPrice }; }
        if (req.minDiscount) { filterQuery.discountPercent = { $gte: req.minDiscount }; }

        let sortQuery = {};
        if (req.sort === "price_low") {
            sortQuery.sellingPrice = 1;
        } else if (req.sort === "price_high") {
            sortQuery.sellingPrice = -1;
        }

        const page = parseInt(req.pageNumber) || 0;
        const pageSize = parseInt(req.pageSize) || 10;
        const products = await Product.find(filterQuery).sort(sortQuery).skip(page * pageSize).limit(pageSize);
        const totalElements = await Product.countDocuments(filterQuery);
        const totalPages = Math.ceil(totalElements / pageSize);

        return { content: products, totalPages, totalElements };
    }
}
module.exports = new ProductService();