import express from "express";
import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";
import productRouter from "./product.route.js";
import categoryRouter from "./category.route.js";
import orderRouter from "./order.route.js";
import cartRouter from "./cart.route.js";
import wishlistRouter from "./wishlist.route.js";
import reviewRouter from "./review.route.js";
import notificationRouter from "./notification.route.js";
import analyticsRouter from "./analytics.route.js";
import adminRouter from "./admin.route.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/orders", orderRouter);
router.use("/cart", cartRouter);
router.use("/wishlist", wishlistRouter);
router.use("/reviews", reviewRouter);
router.use("/notifications", notificationRouter);
router.use("/analytics", analyticsRouter);
router.use("/admin", adminRouter);

export default router;
