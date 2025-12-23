"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const cacheMiddleware_1 = require("../middleware/cacheMiddleware");
const router = express_1.default.Router();
router.post("/user", userController_1.createUser);
router.put("/user/:id", userController_1.updateUser);
router.get("/user", cacheMiddleware_1.cacheMiddleware, userController_1.getUsers);
router.get("/user/:id", userController_1.getUserById);
router.delete("/user/:id", userController_1.deleteUser);
exports.default = router;
