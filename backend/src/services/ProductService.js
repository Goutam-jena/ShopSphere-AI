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
            const mainCategory = await Category.findOne({ categoryId: req.category });
            if (mainCategory) {
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
    
    
    async createProduct(req, seller) {
        const discountPercentage = Math.round(((req.mrpPrice - req.sellingPrice) / req.mrpPrice) * 100);
        const category1 = await this.createOrGetCategory(req.category, 1);
        const category2 = await this.createOrGetCategory(req.category2, 2, category1._id);
        const category3 = await this.createOrGetCategory(req.category3, 3, category2._id);

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
        });
        return await product.save();
    }

    async createOrGetCategory(categoryId, level, parentId = null) {
        let category = await Category.findOne({ categoryId });
        if (!category) {
            category = new Category({ categoryId, level, parentCategory: parentId });
            await category.save();
        }
        return category;
    }

    async deleteProduct(productId) {
        await Product.findByIdAndDelete(productId);
    }

    async updateProduct(productId, updatedProductData) {
        const product = await Product.findByIdAndUpdate(productId, { $set: updatedProductData }, { new: true });
        if (!product) throw new ProductError("Product not found");
        return product;
    }

    async getProductBySellerId(sellerId) {
        return await Product.find({ seller: sellerId });
    }
    
}

module.exports = new ProductService();