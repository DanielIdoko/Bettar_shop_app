import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // don't return by default
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: { type: String },
    phone: { type: String },
    addresses: {
      type: [AddressSchema],
      default: [],
    },
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
  },
  { timestamps: true }
);

// Pre-save: hash password if modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// Instance method: compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Hide sensitive fields when converting to JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject({ virtuals: true });
  delete obj.password;
  if (obj.twoFactor) delete obj.twoFactor.secret;
  return obj;
};

const User = mongoose.model("User", userSchema);
export default User;