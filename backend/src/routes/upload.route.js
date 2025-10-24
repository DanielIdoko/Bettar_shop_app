import express from "express";
import { uploadImage } from "../controllers/upload.controller.js";
import upload from "../middlewares/upload.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const uploadRouter = express.Router();

uploadRouter.post("/", protect, adminOnly, upload.single("image"), uploadImage);

export default uploadRouter;
