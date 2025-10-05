import { Request, Response } from "express";
import { pool } from "../conn/db";
import { redisClient } from "../conn/redis"; // Assuming you have a Redis client

// Get all users (with caching)
export const getUsers = async (req: Request, res: Response) => {
  try {
    const cacheData = await redisClient.get("users");
    if (cacheData) return res.json(JSON.parse(cacheData));

    const { rows } = await pool.query("SELECT * FROM users");
    await redisClient.set("users", JSON.stringify(rows), { EX: 60 }); // cache for 60s
    res.json(rows);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ error: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    // Clear cache after creating
    await redisClient.del("users");
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const { rows } = await pool.query(
      "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",
      [name, email, id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "User not found" });
    await redisClient.del("users");
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "DELETE FROM users WHERE id=$1 RETURNING *",
      [id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "User not found" });
    await redisClient.del("users");
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
