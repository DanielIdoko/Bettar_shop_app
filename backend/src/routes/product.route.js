// import { Router } from "express";
// import {
//   getAllProducts,
//   getFeaturedProducts,
//   getSingleProduct,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from "../controllers/product.controller.js";
// import { protect } from "../middlewares/authMiddleware.js";
// import { adminOnly } from "../middlewares/adminMiddleware.js";
// import { cacheMiddleware } from "../middlewares/cacheMiddleware.js";

// const productRouter = Router();

// /**
//  * @route   GET /api/products
//  * @desc    Get all products with pagination, search, filters, and sorting
//  * @access  Public
//  */
// productRouter.get("/", cacheMiddleware("products"), getAllProducts);

// /**
//  * @route   GET /api/products/featured
//  * @desc    Get featured or trending products
//  * @access  Public
//  */
// productRouter.get(
//   "/featured",
//   cacheMiddleware("featured_products"),
//   getFeaturedProducts
// );

// /**
//  * @route   GET /api/products/:slug
//  * @desc    Get a single product by slug
//  * @access  Public
//  */
// productRouter.get("/:slug", cacheMiddleware("product"), getSingleProduct);

// /**
//  * @route   POST /api/products
//  * @desc    Create a new product (Admin only)
//  * @access  Private/Admin
//  */
// productRouter.post("/", protect, adminOnly, createProduct);

// /**
//  * @route   PUT /api/products/:id
//  * @desc    Update product details (Admin only)
//  * @access  Private/Admin
//  */
// productRouter.put("/:id", protect, adminOnly, updateProduct);

// /**
//  * @route   DELETE /api/products/:id
//  * @desc    Delete a product (Admin only)
//  * @access  Private/Admin
//  */
// productRouter.delete("/:id", protect, adminOnly, deleteProduct);

// export default productRouter;
