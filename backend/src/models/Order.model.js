// src/models/order.model.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    subtotal: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    items: { type: [OrderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    currency: { type: String, default: "NGN" },
    paymentMethod: {
      type: String,
      enum: ["paystack", "card", "wallet"],
      default: "paystack",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentReference: { type: String, index: true }, // Paystack reference
    shippingAddress: { type: Object, required: true },
    billingAddress: { type: Object },
    deliveryStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
      index: true,
    },
    trackingNumber: { type: String },
    notes: { type: String },
    metadata: { type: Object },
  },
  { timestamps: true }
);

// Indexes for common queries
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ paymentReference: 1 });

const Order = mongoose.model("Order", OrderSchema);
export default Order;
