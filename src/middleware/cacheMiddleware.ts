import { Request, Response, NextFunction } from "express";
import { redisClient } from "../conn/redis";

export const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.originalUrl;

  const cached = await redisClient.get(key);
  if (cached) {
    console.log("📦 Returning cached data");
    return res.json(JSON.parse(cached));
  }

  // Override res.json to cache response
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    redisClient.setEx(key, 60, JSON.stringify(data)); // cache for 60s
    return originalJson(data);
  };

  next();
};
