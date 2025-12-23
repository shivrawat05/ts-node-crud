"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const redis_1 = require("redis");
const redisHost = process.env.REDIS_HOST || "127.0.0.1";
const redisPort = Number(process.env.REDIS_PORT || 6379);
// Validate port
if (isNaN(redisPort)) {
    throw new Error(`❌ Invalid REDIS_PORT value: "${process.env.REDIS_PORT}". Make sure your .env file is loaded correctly.`);
}
exports.redisClient = (0, redis_1.createClient)({
    socket: {
        host: redisHost,
        port: redisPort,
    },
});
exports.redisClient.on("connect", () => console.log(`✅ Connected to Redis at ${redisHost}:${redisPort}`));
exports.redisClient.on("error", (err) => console.error("Redis Error:", err));
(async () => {
    try {
        await exports.redisClient.connect();
    }
    catch (err) {
        console.error("❌ Redis connection failed:", err);
    }
})();
