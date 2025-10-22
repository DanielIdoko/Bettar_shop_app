import mongoose from "mongoose";
import { AddressSchema } from "./common.model.js";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
      index: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please fill in a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: { type: String },
    phone: { type: String },
    addresses: [AddressSchema],
    preferences: {
      theme: { type: String, enum: ["light", "dark"], default: "light" },
      language: { type: String, default: "en" },
      emailNotifications: { type: Boolean, default: true },
      pushNotifications: { type: Boolean, default: true },
    },
    twoFactor: {
      enabled: { type: Boolean, default: false },
      // store only TOTP secret encrypted/hashed in production
      secret: { type: String, select: false },
    },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    expoPushTokens: [{ type: String }], // push tokens for notifications
    isEmailVerified: { type: Boolean, default: false },
    meta: {
      lastLoginAt: Date,
      createdVia: { type: String }, // e.g., "email", "google"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
