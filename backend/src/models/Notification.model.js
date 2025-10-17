// src/models/notification.model.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    }, // null = broadcast
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, default: "system" }, // e.g., order, promotion
    data: { type: Object }, // extra payload for client
    isRead: { type: Boolean, default: false },
    channel: {
      type: String,
      enum: ["push", "email", "inapp"],
      default: "push",
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
