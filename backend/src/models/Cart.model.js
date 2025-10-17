import mongoose from "mongoose";
import { CartItemSchema } from "./common.model.js";

const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: { type: [CartItemSchema], default: [] },
    currency: { type: String, default: "NGN" },
    updatedAtClient: { type: Date }, // last client update (optional)
  },
  { timestamps: true }
);

// Virtual: total calculation on the fly
CartSchema.virtual("total").get(function () {
  const total = (this.items || []).reduce(
    (sum, it) => sum + it.priceAtPurchase * it.quantity,
    0
  );
  return Math.round(total * 100) / 100;
});

CartSchema.set("toJSON", { virtuals: true });

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
