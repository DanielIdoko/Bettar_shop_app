import axios from "axios";
import { PAYSTACK_BASE_URL, PAYSTACK_SECRET_KEY } from "./env.config.js";

const paystack = axios.create({
  baseURL: PAYSTACK_BASE_URL,
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

export default paystack;