import { config } from "dotenv";

config({ path: `../.env.${process.env.NODE_ENV || "development"}.local` });

// Exports for environment variables
export const {
  PORT,
  NODE_ENV,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  REDIS_URL,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  PAYSTACK_SECRET_KEY,
  PAYSTACK_PUBLIC_KEY,
  PAYSTACK_BASE_URL,
  FCM_SERVER_KEY,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  FROM_EMAIL,
  FROM_NAME,
  FRONTEND_URL,
} = process.env;
