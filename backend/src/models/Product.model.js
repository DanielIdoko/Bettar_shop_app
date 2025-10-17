import mongoose from "mongoose";
import mongoosePaginate from "mongoose-aggregate-paginate-v2";

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    slug: { type: String, index: true },
    description: { type: String },
    images: [{ type: String }],
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0 }, // percentage or amount based on logic
    stock: { type: Number, default: 0 },
    sku: { type: String, index: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", index: true },
    brand: { type: String },
    tags: [{ type: String, index: true }],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    ratingsAverage: { type: Number, default: 0, min: 0, max: 5 },
    ratingsCount: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    metadata: { type: Object },
  },
  { timestamps: true }
);

// plugin for pagination when using aggregations
ProductSchema.plugin(mongoosePaginate);

// virtual to compute price after discount (not persisted)
ProductSchema.virtual("finalPrice").get(function () {
  if (!this.discount) return this.price;
  // assume discount is percentage 0-100
  const disc = (this.discount / 100) * this.price;
  return Math.round((this.price - disc) * 100) / 100;
});

// toJSON transform
ProductSchema.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    // optionally remove internal fields
    return ret;
  },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;