import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  getUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
  updateUserPreferences,
  deleteUserAccount,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const userRouter = Router();

/**
 * @route   GET /api/users/profile/:id
 * @desc    Get logged-in user's profile
 * @access  Private
 */
userRouter.get(
  "/user-profile/:id",
  protect,
  // cacheMiddleware("user"),
  getUserProfile
);

/**
 * @route   PUT /api/users/profile/:id
 * @desc    Update user profile (name, email, phone, etc.)
 * @access  Private
 */
userRouter.put("profile/:id", protect, updateUserProfile);

/**
 * @route   PUT /api/users/password/:id
 * @desc    Change current user's password
 * @access  Private
 */
userRouter.put("/password/:id", protect, updateUserPassword);

/**
 * @route   GET /api/users/addresses/:id
 * @desc    Fetch all user shipping addresses
 * @access  Private
 */
userRouter.get("/addresses/:id", protect, getUserAddresses);

/**
 * @route   POST /api/users/addresses/:id
 * @desc    Add a new shipping address
 * @access  Private
 */
userRouter.post("/addresses/:id", protect, addUserAddress);

/**
 * @route   POST /api/users/addresses/:id/addressId
 * @desc    Update a shipping address
 * @access  Private
 */
userRouter.put("/addresses/:id/:addressId", protect, updateUserAddress);

/**
 * @route   DELETE /api/users/addresses/:id
 * @desc    Delete a shipping address
 * @access  Private
 */
userRouter.delete("/addresses/:id/:addressId", protect, deleteUserAddress);

/**
 * @route   PUT /api/users/preferences/:id
 * @desc    Update user preferences
 * @access  Private
 */
userRouter.put("/preferences/:id", protect, updateUserPreferences);

/**
 * @route   POST /api/users/delete-account/:id
 * @desc    Delete user account
 * @access  Private
 */
userRouter.post("/delete-account/:id", protect, deleteUserAccount);

export default userRouter;
