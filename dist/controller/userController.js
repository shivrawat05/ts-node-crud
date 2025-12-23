"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const db_1 = require("../conn/db");
const redis_1 = require("../conn/redis"); // Assuming you have a Redis client
// Get all users (with caching)
const getUsers = async (req, res) => {
    try {
        const cacheData = await redis_1.redisClient.get("users");
        if (cacheData)
            return res.json(JSON.parse(cacheData));
        const { rows } = await db_1.pool.query("SELECT * FROM users");
        await redis_1.redisClient.set("users", JSON.stringify(rows), { EX: 60 }); // cache for 60s
        res.json(rows);
    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getUsers = getUsers;
// Get user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db_1.pool.query("SELECT * FROM users WHERE id = $1", [
            id,
        ]);
        if (rows.length === 0)
            return res.status(404).json({ error: "User not found" });
        res.json(rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getUserById = getUserById;
// Create new user
const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const { rows } = await db_1.pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [name, email]);
        // Clear cache after creating
        await redis_1.redisClient.del("users");
        res.status(201).json(rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createUser = createUser;
// Update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const { rows } = await db_1.pool.query("UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *", [name, email, id]);
        if (rows.length === 0)
            return res.status(404).json({ error: "User not found" });
        await redis_1.redisClient.del("users");
        res.json(rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.updateUser = updateUser;
// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db_1.pool.query("DELETE FROM users WHERE id=$1 RETURNING *", [id]);
        if (rows.length === 0)
            return res.status(404).json({ error: "User not found" });
        await redis_1.redisClient.del("users");
        res.json({ message: "User deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.deleteUser = deleteUser;
