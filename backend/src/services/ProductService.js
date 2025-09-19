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

    
        if (req.category) {
            const category = await Category.findOne({ categoryId: req.category });
            if (category) {
                filterQuery.category = category._id;
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