// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// // src/config.ts
// const dotenv_1 = require("dotenv");
// const path_1 = require("path");
// const fs_1 = require("fs");
// const envFile = process.env.NODE_ENV === "production"
//     ? ".env.production"
//     : ".env.development";
// const envPath = (0, path_1.resolve)(process.cwd(), envFile);
// console.log("Looking for env file at:", envPath);
// console.log("File exists:", (0, fs_1.existsSync)(envPath));
// if ((0, fs_1.existsSync)(envPath)) {
//     console.log("File contents:", (0, fs_1.readFileSync)(envPath, "utf-8"));
// }
// const result = (0, dotenv_1.config)({ path: envPath });
// console.log("Dotenv result:", result);
