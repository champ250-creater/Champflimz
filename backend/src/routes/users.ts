import express from "express";
import * as userController from "../controllers/users.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", authMiddleware, userController.getProfile);
router.post("/my-list", authMiddleware, userController.addToMyList);
router.delete("/my-list", authMiddleware, userController.removeFromMyList);
router.get("/my-list", authMiddleware, userController.getMyList);

export default router;
