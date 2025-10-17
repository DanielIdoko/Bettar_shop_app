import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.config.js";

/**
 * @desc Protect routes - only accessible by authenticated users
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Find user (without password)
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        res.status(401);
        throw new Error("User not found or unauthorized");
      }

      req.user = user; // attach user object to request
      next();
    } catch (error) {
      console.error("Auth error:", error.message);
      res.status(401).json({ message: "Not authorized, token invalid" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
});
