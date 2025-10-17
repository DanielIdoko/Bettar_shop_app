import redisClient from "../config/redis.js";

/**
 * @desc Cache middleware for GET routes
 * @param {string} prefix - Redis key prefix (e.g. "categories", "products")
 * @param {number} ttl - Time to live (seconds), default 10 minutes
 */
export const cacheMiddleware = (prefix, ttl = 600) => {
  return async (req, res, next) => {
    try {
      // Build unique cache key
      const key =
        prefix +
        (req.params.id ? `:${req.params.id}` : "") +
        (req.params.slug ? `:${req.params.slug}` : "") +
        (req.originalUrl.includes("?")
          ? `:${req.originalUrl.split("?")[1]}`
          : "");

      const cached = await redisClient.get(key);

      if (cached) {
        console.log(`Cache hit → ${key}`);
        return res.status(200).json(JSON.parse(cached));
      }

      // Hook into res.json to save response
      const originalJson = res.json.bind(res);
      res.json = async (data) => {
        try {
          await redisClient.setEx(key, ttl, JSON.stringify(data));
          console.log(`Cached → ${key}`);
        } catch (err) {
          console.error("Redis cache set error:", err.message);
        }
        return originalJson(data);
      };

      next();
    } catch (error) {
      console.error("Cache middleware error:", error.message);
      next(); // continue even if cache fails
    }
  };
};

/**
 * @desc Manually clear cache by prefix
 * @param {string} prefix - Redis key prefix to clear
 */
export const clearCache = async (prefix) => {
  try {
    const keys = await redisClient.keys(`${prefix}*`);
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`Cleared cache for prefix: ${prefix}`);
    }
  } catch (error) {
    console.error("Cache clear error:", error.message);
  }
};
