import crypto from "crypto";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import sendEmail from "../utils/sendEmail.js";
import {
  JWT_SECRET,
  FRONTEND_URL,
  JWT_EXPIRES_IN,
  NODE_ENV,
} from "../config/env.config.js";
import { error } from "console";

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({
      success: false,
      error: "Sorry, a user with that email already exists.",
    });
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate verification token
  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  // Send verification email
  const verifyUrl = `${FRONTEND_URL}/verify-email?token=${token}`;
  await sendEmail(
    user.email,
    "Verify your account",
    `Welcome to our store, ${user.name}! Please verify your email by clicking the link below:\n\n${verifyUrl}`
  );

  // Cookie setup
  const cookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  res.cookie("token", token, cookieOptions);

  const userResponse = user.toObject();
  delete userResponse.password;
  delete userResponse.__v;

  res.status(201).json({
    success: true,
    message: "User registered successfully. Please verify your email.",
    data: {
      token,
      user: userResponse,
    },
  });
});

/**
 * @desc Verify user email
 * @route GET /api/auth/verify-email
 * @access Public
 */
export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    res.status(400);
    throw new Error("Verification token missing");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (user.isVerified) {
      return res
        .status(200)
        .json({ success: true, message: "Email already verified" });
    }

    user.isVerified = true;

    await user.save();

    await sendEmail(
      user.email,
      "Email Verification Success",
      `Dear ${user.name}, you have successfully verified your email. Thank you for choosing Bettar Shop.`
    );

    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Email verification error:", error.message);
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

/**
 * @desc Login user and get JWT token
 * @route POST /api/auth/login
 * @access Public
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter email and password");
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // if (!user.isVerified) {
  //   res.status(401);
  //   throw new Error("Please verify your email before logging in");
  // }

  // Check password
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // Generate token
  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  // Cookie setup
  const cookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  res.cookie("token", token, cookieOptions);

  const userResponse = user.toObject();
  delete userResponse.password;
  delete userResponse.__v;

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
    },
  });
});

/**
 * @desc Logout user
 * @route POST /api/auth/logout
 * @access Private
 */
export const logoutUser = asyncHandler(async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
  };
  // Clear cookies from browser on logout
  res.clearCookie("token", token, cookieOptions);
  
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
});

/**
 * @desc Get logged-in user profile
 * @route GET /api/auth/me
 * @access Private
 */
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  delete user.__v;

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({ success: true, data: user });
});

/**
 * @desc Send password reset link to user email
 * @route POST /api/auth/forgot-password
 * @access Public
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(404);
    throw new Error("No account found with that email");
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = resetTokenHash;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
  await user.save();

  const resetUrl = `${FRONTEND_URL}/reset-password?token=${resetToken}`;

  await sendEmail(
    user.email,
    "Password Reset Request",
    `You requested a password reset.\n\nClick the link below to reset your password:\n${resetUrl}\n\nThis link expires in 10 minutes.`
  );

  res.status(200).json({
    success: true,
    message: "Password reset link sent successfully to your email.",
  });
});

/**
 * @desc Reset password using verification token
 * @route POST /api/auth/reset-password
 * @access Public
 */
export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    res.status(400);
    throw new Error("Token and new password are required");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired reset token");
  }

  // Update password
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password has been reset successfully. You can now log in.",
  });
});

/**
 * @desc Enable two-factor authentication (2FA)
 * @route POST /api/auth/enable-2fa
 * @access Private
 */
export const enableTwoFactor = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const secret = speakeasy.generateSecret({
    name: `Bettar shop (${user.email})`,
  });

  user.twoFactorSecret = secret.base32;
  user.twoFactorEnabled = true;
  await user.save();

  // Generate QR code for user
  const qrCodeData = qrcode.toDataURL(secret.otpauth_url);

  res.status(200).json({
    success: true,
    message: "2FA setup initiated successfully",
    qrCode: qrCodeData,
    secret: secret.base32,
  });
});

/**
 * @desc Verify OTP / 2FA code for login
 * @route POST /api/auth/verify-2fa
 * @access Private
 */
export const verifyTwoFactor = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(400);
    throw new Error("2FA token is required");
  }

  const user = await User.findById(req.user.id);

  if (!user || !user.twoFactorSecret) {
    res.status(404);
    throw new Error("User not found or 2FA not enabled");
  }

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
    window: 1,
  });

  if (!verified) {
    res.status(400);
    throw new Error("Invalid or expired 2FA code");
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Two-factor authentication verified successfully",
  });
});
