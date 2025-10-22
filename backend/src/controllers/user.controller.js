import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { getCache, setCache } from "../config/redis.js";
import { clearCache } from "../middlewares/cache.middleware.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

/**
 * @desc Get logged-in user profile
 * @route GET /api/users/profile
 * @access Private
 */
export const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const cacheKey = `user:${userId}`;

  // Try to get user profile from cache if it exists yet
  const cachedProfile = await getCache(cacheKey);

  if (cachedProfile) {
    return res.status(200).json({
      success: true,
      source: "cache",
      data: cachedProfile,
    });
  }

  const userProfile = await User.findById(userId).select("-password");

  if (userProfile._id !== userId) {
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

/**
 * @desc update user profile (name, email, phone, avatar)
 * @route POST /api/users/profile/:id
 * @access Private
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const cacheKey = `user:${userId}`;

  await clearCache(userId);

  // Set new updates to profile
  const updatedProfile = await User.findByIdAndUpdate(
    userId,
    { $set: { ...req.body } },
    { new: true }
  )
    .populate("name email phone avatar")
    .select("-password");

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

/**
 * @desc Change current user's password
 * @route PUT /api/users/password/:id
 * @access Private
 */
export const updateUserPassword = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const cacheKey = `user:${userId}`;

  await clearCache(userId);

  const { password } = req.body;

  if (!password) {
    res.status(404);
    throw new Error("Password to update not provided.");
  }

  const user = await User.findById(userId);

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

/**
 * @route   GET /api/users/addresses/:id
 * @desc    Fetch all user shipping addresses
 * @access  Private
 */
export const getUserAddresses = asyncHandler(async (req, res) => {
  const cacheKey = `user:${req.user.id}`;
  const userId = req.user.id;

  // Try to get user profile from cache if it exists yet
  const cachedProfile = await getCache(cacheKey);

  if (cachedProfile) {
    return res.status(200).json({
      success: true,
      source: "cache",
      data: cachedProfile.addresses,
    });
  }

  const userProfile = await User.findById(userId).select("-password");

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

/**
 * @route   POST /api/users/addresses/:id
 * @desc    Add a new shipping address
 * @access  Private
 */
export const addUserAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { label, street, city, state, postalCode, country, isDefault, line1 } =
    req.body;

  // Find and verify user
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
    line1,
  };

  // If new address is default, set all others to false
  if (newAddress.isDefault)
    user.addresses.forEach((address) => (address.isDefault = false));

  user.addresses.unshift(newAddress);
  await user.save();

  const cacheKey = `user:${userId}`;

  await clearCache(userId);
  await setCache(cacheKey, user);

  res.status(201).json({
    success: true,
    message: "Address added successfully",
    data: user.addresses,
  });
});

/**
 * @route   POST /api/users/addresses/:id
 * @desc    Update a shipping address
 * @access  Private
 */
export const updateUserAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const addressId = req.params.addressId;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  // Match by id field
  const addressToUpdate = user.addresses.find(
    (addr) => addr.id?.toString() === addressId?.toString()
  );

  if (!addressToUpdate) {
    res.status(404);
    throw new Error("Address not found or may have been deleted.");
  }

  const updatableFields = [
    "label",
    "fullName",
    "phone",
    "line1",
    "line2",
    "city",
    "country",
    "street",
    "postalCode",
    "isDefault",
  ];

  updatableFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      addressToUpdate[field] = req.body[field];
    }
  });

  if (req.body.isDefault === true) {
    user.addresses.forEach((addr) => {
      addr.isDefault = addr.id.toString() === addressToUpdate.id.toString();
    });
  }

  await user.save();

  const cacheKey = `user:${userId}`;
  await clearCache(userId);
  await setCache(cacheKey, user);

  res.status(200).json({
    success: true,
    message: "Address updated successfully",
    data: user.addresses,
  });
});

/**
 * @route   DELETE /api/users/addresses/:id
 * @desc    Delete a shipping address
 * @access  Private
 */
export const deleteUserAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const addressId = req.params.addressId;
  const cacheKey = `user:${req.user.id}`;

  if (!userId) {
    res.status(404);
    throw new Error("User not found.");
  }

  // Clear cache
  await clearCache(userId);

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const updatedAddresses = user.addresses.filter(
    (address) => address.id.toString() !== addressId.toString()
  );

  user.addresses = updatedAddresses;

  // Save new addresses array
  await user.save();

  // Save to cache
  await setCache(cacheKey, user);

  res.status(200).json({
    success: true,
    message: "Address has been successfully removed.",
  });
});

/**
 * @route   Delete a shipping address
 * @desc    Update user preferences
 * @access  Private
 */
export const updateUserPreferences = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const cacheKey = `user:${req.user.id}`;

  if (!userId) {
    res.status(404);
    throw new Error("User not found.");
  }

  // clear cache
  await clearCache(userId);

  const { theme, language, emailNotifications, pushNotifications } = req.body;

  // Update properties under preferences object
  const user = await User.findByIdAndUpdate(
    userId,
    {
      preferences: {
        theme,
        language,
        emailNotifications,
        pushNotifications,
      },
    },
    { new: true }
  );

  // Save to cache
  await setCache(cacheKey, user);

  res.status(200).json({
    success: true,
    message: "Preferences updated successfully.",
  });
});

/**
 * @desc Delete a user's account
 * @route GET /api/users/delete-account/:id
 * @access Private
 */
export const deleteUserAccount = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    res.status(404);
    throw new Error("User not found.");
  }

  // Delete from cache
  await clearCache(userId);

  res.clearCookie("token", { sameSite: true, secure: true, httpOnly: true });
  // Delete from db
  await User.findByIdAndDelete(userId);

  res.status(200).json({
    success: true,
    message: "User account deleted.",
  });
});
