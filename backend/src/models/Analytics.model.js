// src/models/analytics.model.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const AnalyticsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      default: null,
    },
    action: { type: String, required: true, index: true }, // view, purchase, search, add-to-cart
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      default: null,
      index: true,
    },
    meta: { type: Object }, // device, params, search term, etc.
    ip: { type: String },
  },
  { timestamps: true }
);


const Analytics = mongoose.model("Analytics", AnalyticsSchema);
export default Analytics;
