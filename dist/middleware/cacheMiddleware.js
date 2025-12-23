"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheMiddleware = void 0;
const redis_1 = require("../conn/redis");
const cacheMiddleware = async (req, res, next) => {
    const key = req.originalUrl;
    const cached = await redis_1.redisClient.get(key);
    if (cached) {
        console.log("📦 Returning cached data");
        return res.json(JSON.parse(cached));
    }
    // Override res.json to cache response
    const originalJson = res.json.bind(res);
    res.json = (data) => {
        redis_1.redisClient.setEx(key, 60, JSON.stringify(data)); // cache for 60s
        return originalJson(data);
    };
    next();
};
exports.cacheMiddleware = cacheMiddleware;
