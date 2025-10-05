// src/config.ts
import { config } from "dotenv";
import { resolve } from "path";
import { existsSync, readFileSync } from "fs";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

const envPath = resolve(process.cwd(), envFile);

console.log("Looking for env file at:", envPath);
console.log("File exists:", existsSync(envPath));

if (existsSync(envPath)) {
  console.log("File contents:", readFileSync(envPath, "utf-8"));
}

const result = config({ path: envPath });
console.log("Dotenv result:", result);
