// src/config.ts
import { config } from "dotenv";
import { resolve } from "path";
import { existsSync } from "fs";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

const envPath = resolve(process.cwd(), envFile);

if (!existsSync(envPath)) {
  console.error(`❌ Env file not found: ${envPath}`);
  process.exit(1); // fail fast
}

const result = config({ path: envPath });

if (result.error) {
  console.error("❌ Failed to load env file", result.error);
  process.exit(1);
}

console.log(`✅ Loaded environment: ${envFile}`);
