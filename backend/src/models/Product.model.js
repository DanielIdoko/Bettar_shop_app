import mongoose from "mongoose";
import mongoosePaginate from "mongoose-aggregate-paginate-v2";
import slugify from "slugify";

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
      lowercase: true,
    },
    slug: { type: String, index: true },
    description: { type: String },
    images: [String],
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

// Pre generate slug for products
// Handle slug collisions
ProductSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    let slug = slugify(this.title, { lower: true, strict: true });
    const existing = await this.constructor.findOne({ slug });
    if (existing && existing._id.toString() !== this._id.toString())
      slug = `${slug}-${Date.now()}`;
    this.slug = slug;
  }
  next();
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
