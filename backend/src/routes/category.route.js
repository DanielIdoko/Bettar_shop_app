import { Router } from "express";
import {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";
import { cacheMiddleware } from "../middlewares/cacheMiddleware.js";

const categoryRouter = Router();

/**
 * @route   GET /api/categories
 * @desc    Get all categories
 * @access  Public
 */
categoryRouter.get("/", cacheMiddleware("categories"), getAllCategories);

/**
 * @route   GET /api/categories/:slug
 * @desc    Get single category by slug
 * @access  Public
 */
categoryRouter.get("/:slug", cacheMiddleware("category"), getSingleCategory);

/**
 * @route   POST /api/categories
 * @desc    Create a new category
 * @access  Private/Admin
 */
categoryRouter.post("/", protect, adminOnly, createCategory);

/**
 * @route   PUT /api/categories/:id
 * @desc    Update a category
 * @access  Private/Admin
 */
categoryRouter.put("/:id", protect, adminOnly, updateCategory);

/**
 * @route   DELETE /api/categories/:id
 * @desc    Delete a category
 * @access  Private/Admin
 */
categoryRouter.delete("/:id", protect, adminOnly, deleteCategory);

export default categoryRouter;
