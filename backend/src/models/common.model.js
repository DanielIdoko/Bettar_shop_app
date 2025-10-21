import mongoose from "mongoose";

const { Schema } = mongoose;

export const AddressSchema = new Schema(
  {
    id: String,
    label: { type: String },
    fullName: { type: String },
    phone: { type: String },
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    street: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false }
);

export const CartItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    priceAtPurchase: { type: Number, required: true }, // store price snapshot
  },
  { _id: false }
);
