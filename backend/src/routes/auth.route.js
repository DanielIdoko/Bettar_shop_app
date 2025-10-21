import express, { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  verifyEmail,
  forgotPassword,
  resetPassword,
  enableTwoFactor,
  verifyTwoFactor,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
authRouter.post("/register", registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Login user & get JWT token
 * @access  Public
 */
authRouter.post("/login", loginUser);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (invalidate session / token)
 * @access  Private
 */
authRouter.post("/logout", protect, logoutUser);

/**
 * @route   GET /api/auth/me
 * @desc    Get currently logged-in user
 * @access  Private
 */
authRouter.get("/me", protect, getUserProfile);

/**
 * @route   POST /api/auth/verify-email
 * @desc    Verify user email using token sent to mail
 * @access  Public
 */
authRouter.post("/verify-email", verifyEmail);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Send password reset link to user email
 * @access  Public
 */
authRouter.post("/forgot-password", forgotPassword);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password using verification token
 * @access  Public
 */
authRouter.post("/reset-password", resetPassword);

/**
 * @route   POST /api/auth/enable-2fa
 * @desc    Enable two-factor authentication for user
 * @access  Private
 */
  authRouter.post("/enable-2fa/:id", protect, enableTwoFactor);

/**
 * @route   POST /api/auth/verify-2fa
 * @desc    Verify OTP / 2FA code for login
 * @access  Private
 */
authRouter.post("/verify-2fa/:id", protect, verifyTwoFactor);

export default authRouter;
