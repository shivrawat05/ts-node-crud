import { createClient } from "redis";

const redisHost = process.env.REDIS_HOST || "127.0.0.1";
const redisPort = Number(process.env.REDIS_PORT || 6379);

// Validate port
if (isNaN(redisPort)) {
  throw new Error(
    `❌ Invalid REDIS_PORT value: "${process.env.REDIS_PORT}". Make sure your .env file is loaded correctly.`
  );
}

export const redisClient = createClient({
  socket: {
    host: redisHost,
    port: redisPort,
  },
});

redisClient.on("connect", () =>
  console.log(`✅ Connected to Redis at ${redisHost}:${redisPort}`)
);
redisClient.on("error", (err) => console.error("Redis Error:", err));

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("❌ Redis connection failed:", err);
  }
})();
