import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { getCache, setCache } from "../config/redis.js";
import { clearCache } from "../middlewares/cache.middleware.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

/**
 * @desc Get logged-in user profile
 * @route GET /api/auth/me
 * @access Private
 */

export const getUserProfile = asyncHandler(async (req, res) => {
  const cacheKey = `user:${req.user.id}`;

  // Try to get user profile from cache if it exists yet
  const cachedProfile = await getCache(cacheKey);

  if (cachedProfile) {
    return res.status(200).json({
      success: true,
      source: "cache",
      data: cachedProfile,
    });
  }

  const userProfile = await User.findById(req.user.id).select("-password");

  if (!userProfile) {
    res.status(404);
    throw new Error("User not found");
  }

  // Save to cache for next time
  await setCache(cacheKey, userProfile);

  res.status(200).json({
    success: true,
    source: "dataset",
    data: userProfile,
  });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const cacheKey = `user:${req.user.id}`;

  await clearCache("user");

  // Set new updates to profile
  const updatedProfile = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { ...req.body } },
    { new: true }
  );

  if (!updatedProfile) {
    res.status(404);
    throw new Error("User not found");
  }

  // Save to updated profile to cache
  await setCache(cacheKey, updatedProfile);

  res.status(200).json({
    success: true,
    message: "Profile Successfully updated",
    data: updatedProfile,
  });
});

export const updateUserPassword = asyncHandler(async (req, res) => {
  const cacheKey = `user:${req.user.id}`;

  await clearCache("user");

  const { password } = req.body;

  if (!password) {
    res.status(404);
    throw new Error("Password to update not provided.");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Compare old and new passwords
  const decryptedPassword = bcrypt.compare(password, user.password);
  if (decryptedPassword === password) {
    res.status(400);
    throw new Error("New password must be different from old one.");
  }

  // Hash and set new password as user's password
  const newPassword = await bcrypt.hash(password, 10);
  user.password = newPassword;
  await user.save();

  // Set new user cache
  await setCache(cacheKey, user);

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

export const getUserAddresses = asyncHandler(async (req, res) => {
  const cacheKey = `user:${req.user.id}`;

  // Try to get user profile from cache if it exists yet
  const cachedProfile = await getCache(cacheKey);

  if (cachedProfile) {
    return res.status(200).json({
      success: true,
      source: "cache",
      data: cachedProfile.addresses,
    });
  }

  const userProfile = await User.findById(req.user.id).select("-password");

  if (!userProfile) {
    res.status(404);
    throw new Error("User not found");
  }

  // Save to cache for next time
  await setCache(cacheKey, userProfile);

  res.status(200).json({
    success: true,
    source: "dataset",
    data: userProfile.addresses,
  });
});

export const addUserAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { label, street, city, state, postalCode, country, isDefault, line1 } =
    req.body;

  // Verify that the neccessary inputs are provided
  if (!street || !city || !country) {
    res.status(400);
    throw new Error("Street, city, and country are required.");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const newAddress = {
    id: uuidv4(),
    label,
    street,
    city,
    state,
    postalCode,
    country,
    isDefault: isDefault || user.addresses.length === 0,
    line1
  };

  // If new address is default, set all others to false
  if (newAddress.isDefault) {
    user.addresses.forEach((addr) => (addr.isDefault = false));
  }

  user.addresses.push(newAddress);
  await user.save();

  await clearCache(userId);
  await setCache(userId, user);

  res.status(201).json({
    success: true,
    message: "Address added successfully",
    data: user.addresses,
  });
});

export const deleteUserAddress = asyncHandler(async (req, res) => {});
