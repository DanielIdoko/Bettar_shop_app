import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

//  Base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
  withCredentials: true,
});

export default api;
