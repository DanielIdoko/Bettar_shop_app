import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  getUserAddresses,
  addUserAddress,
  deleteUserAddress,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const userRouter = Router();

/**
 * @route   GET /api/users/profile
 * @desc    Get logged-in user's profile
 * @access  Private
 */
userRouter.get("/profile", protect, getUserProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile (name, email, phone, etc.)
 * @access  Private
 */
userRouter.put("/profile", protect, updateUserProfile);

/**
 * @route   PUT /api/users/password
 * @desc    Change current user's password
 * @access  Private
 */
userRouter.put("/password", protect, updateUserPassword);

/**
 * @route   GET /api/users/addresses
 * @desc    Fetch all user shipping addresses
 * @access  Private
 */
userRouter.get("/addresses", protect, getUserAddresses);

/**
 * @route   POST /api/users/addresses
 * @desc    Add a new shipping address
 * @access  Private
 */
userRouter.post("/addresses", protect, addUserAddress);

/**
 * @route   DELETE /api/users/addresses/:id
 * @desc    Delete a shipping address
 * @access  Private
 */
userRouter.delete("/addresses/:id", protect, deleteUserAddress);

export default userRouter;
