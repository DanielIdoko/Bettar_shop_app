import express from "express";
import { NODE_ENV, PORT } from "./config/env.config.js";
import cookieParser from "cookie-parser";
import connectToDb from "./database/db.js";

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json({ extended: false }));

app.listen(PORT, async () => {
  console.log(`App running on http://localhost:${PORT} in ${NODE_ENV} mode`);
  await connectToDb();
});
