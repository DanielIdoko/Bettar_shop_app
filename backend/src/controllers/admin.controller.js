import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import { getOrSetCache, clearCache } from "../config/redis.js";
const dashboardCacheKey = "admin:dashboard";

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/admin/dashboard
 * @access  Private/Admin
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await getOrSetCache(dashboardCacheKey, async () => {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenueData = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);
    const totalRevenue = totalRevenueData[0]?.total || 0;

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate("user", "name email");

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders,
    };
  });

  res.status(200).json({
    success: true,
    message: "Dashboard stats fetched successfully",
    data: stats,
  });
});

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await getOrSetCache("admin:users", async () => {
    return await User.find().select("-password").sort({ createdAt: -1 });
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

/**
 * @desc    Get single user
 * @route   GET /api/admin/users/:id
 * @access  Private/Admin
 */
export const getSingleUser = asyncHandler(async (req, res) => {
  const user = await getOrSetCache(`admin:user:${req.params.id}`, async () => {
    return await User.findById(req.params.id).select("-password");
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @desc    Update user role (make admin or revoke admin)
 * @route   PUT /api/admin/users/:id/role
 * @access  Private/Admin
 */
export const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.body;

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.isAdmin = isAdmin;
  await user.save();

  await clearCache(`admin:user:${id}`);
  await clearCache("admin:users");

  res.status(200).json({
    success: true,
    message: `User role updated successfully (${isAdmin ? "Admin" : "User"})`,
    data: user,
  });
});

/**
 * @desc    Delete a user
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.deleteOne();

  await clearCache(`admin:user:${id}`);
  await clearCache("admin:users");

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

/**
 * @desc    Get all orders
 * @route   GET /api/admin/orders
 * @access  Private/Admin
 */
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await getOrSetCache("admin:orders", async () => {
    return await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
  });

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders || [],
  });
});

/**
 * @desc    Update order status
 * @route   PUT /api/admin/orders/:id/status
 * @access  Private/Admin
 */
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findById(id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = status;
  await order.save();

  await clearCache("admin:orders");
  await clearCache(dashboardCacheKey);

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    data: order,
  });
});

/**
 * @desc    Get all products for admin
 * @route   GET /api/admin/products
 * @access  Private/Admin
 */
export const getAllProductsAdmin = asyncHandler(async (req, res) => {
  const products = await getOrSetCache("admin:products", async () => {
    return await Product.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });
  });

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});
