"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
require("./config"); // MUST come first
const app_1 = __importDefault(require("./app")); // app imports db.ts internally
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
