import { createClient } from "redis";
import { REDIS_HOST, REDIS_PASSWORD } from "./env.config.js";

const redisClient = createClient({
  username: "default",
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: 10389,
  },
});

// Connection setup
redisClient.on("connect", () => {
  console.log("Redis connecting...");
});

redisClient.on("ready", () => {
  console.log("✅ Redis connected and ready to use.");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

redisClient.on("end", () => {
  console.log("⚠️ Redis connection closed.");
});

// Connect automatically on startup
(async () => {
  try {
    if (!redisClient.isOpen) await redisClient.connect();
  } catch (err) {
    console.error("Redis connection failed:", err);
  }
})();



// HELPER FUNCTIONS
/**
 * Set a cache entry
 * @param {string} key - Cache key
 * @param {any} value - Value to store (auto-serialized)
 * @param {number} ttl - Time-to-live in seconds (default: 3600 = 1hr)
 */
export async function setCache(key, value, ttl = 3600) {
  try {
    const serialized = JSON.stringify(value);
    await redisClient.set(key, serialized, { EX: ttl });
  } catch (err) {
    console.error("Redis setCache error:", err);
  }
}

/**
 * Get a cache entry
 * @param {string} key - Cache key
 * @returns {any|null} Parsed value or null if not found
 */
export async function getCache(key) {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Redis getCache error:", err);
    return null;
  }
}

/**
 * Delete a cache entry
 * @param {string} key - Cache key
 */
export async function deleteCache(key) {
  try {
    await redisClient.del(key);
  } catch (err) {
    console.error("Redis deleteCache error:", err);
  }
}

/**
 * Clear all Redis keys (⚠️ Admin use only)
 */
export async function clearCache() {
  try {
    await redisClient.flushAll();
    console.log("Redis cache cleared.");
  } catch (err) {
    console.error("Redis clearCache error:", err);
  }
}

/**
 * List all Redis keys (for debugging/admin)
 */
export async function listKeys(pattern = "*") {
  try {
    return await redisClient.keys(pattern);
  } catch (err) {
    console.error("Redis listKeys error:", err);
    return [];
  }
}

// Graceful Shutdown
process.on("SIGINT", async () => {
  await redisClient.quit();
  console.log("Redis client disconnected via app termination.");
  process.exit(0);
});

export default redisClient;
