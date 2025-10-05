import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController";
import { cacheMiddleware } from "../middleware/cacheMiddleware";

const router = express.Router();

router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.get("/user", cacheMiddleware, getUsers);
router.get("/user/:id", getUserById);
router.delete("/user/:id", deleteUser);

export default router;
