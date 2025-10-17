import mongoose from "mongoose";
import Product from "./product.model.js";

const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, trim: true },
    comment: { type: String },
    images: [{ type: String }],
    helpfulCount: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: true }, // admin moderation
  },
  { timestamps: true }
);

// ensure one review per user per product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

// After saving a review, update product's average rating and count
async function updateProductRating(doc) {
  try {
    const aggregation = await mongoose.model("Review").aggregate([
      { $match: { product: doc.product, isApproved: true } },
      {
        $group: {
          _id: "$product",
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ]);

    if (aggregation && aggregation.length > 0) {
      const { avgRating, count } = aggregation[0];
      await Product.findByIdAndUpdate(doc.product, {
        ratingsAverage: Math.round(avgRating * 10) / 10,
        ratingsCount: count,
      });
    } else {
      // no reviews left
      await Product.findByIdAndUpdate(doc.product, {
        ratingsAverage: 0,
        ratingsCount: 0,
      });
    }
  } catch (err) {
    // log error but don't block
    // eslint-disable-next-line no-console
    console.error("Failed to update product rating:", err);
  }
}

ReviewSchema.post("save", function (doc) {
  updateProductRating(doc);
});

ReviewSchema.post("remove", function (doc) {
  updateProductRating(doc);
});

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
