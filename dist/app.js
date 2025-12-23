"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const logger_1 = require("./utils/logger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/users", userRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Node + TS + Redis + Postgres running!");
});
app.use((err, req, res, next) => {
    (0, logger_1.log)(`Error: ${err.message}`);
    res.status(500).json({ error: "Something went wrong" });
});
exports.default = app;
