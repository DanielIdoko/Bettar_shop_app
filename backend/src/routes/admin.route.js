import express from "express";
import {
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
  getAllProductsAdmin,
} from "../controllers/admin.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js"; 
const adminRouter = express.Router();

/**
 * @route   GET /api/admin/dashboard
 * @desc    Get dashboard analytics (total users, orders, revenue)
 * @access  Private/Admin
 */
adminRouter.get("/dashboard", protect, adminOnly, getDashboardStats);

/**
 * @route   GET /api/admin/users
 * @desc    Get all users
 * @access  Private/Admin
 */
adminRouter.get("/users", protect, adminOnly, getAllUsers);

/**
 * @route   GET /api/admin/users/:id
 * @desc    Get single user details
 * @access  Private/Admin
 */
adminRouter.get("/users/:id", protect, adminOnly, getSingleUser);

/**
 * @route   PUT /api/admin/users/:id/role
 * @desc    Update user role (e.g. make admin or revoke)
 * @access  Private/Admin
 */
adminRouter.put("/users/:id/role", protect, adminOnly, updateUserRole);

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Delete user account
 * @access  Private/Admin
 */
adminRouter.delete("/users/:id", protect, adminOnly, deleteUser);

/**
 * @route   GET /api/admin/orders
 * @desc    Get all orders
 * @access  Private/Admin
 */
adminRouter.get("/orders", protect, adminOnly, getAllOrders);

/**
 * @route   PUT /api/admin/orders/:id/status
 * @desc    Update order status  ("pending" → "shipped" → "delivered")
 * @access  Private/Admin
 */
adminRouter.put("/orders/:id/status", protect, adminOnly, updateOrderStatus);

/**
 * @route   GET /api/admin/products
 * @desc    Get all products (with stats)
 * @access  Private/Admin
 */
adminRouter.get("/products", protect, adminOnly, getAllProductsAdmin);

export default adminRouter;