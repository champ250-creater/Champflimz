import express from "express";
import * as adminController from "../controllers/admin.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware, adminMiddleware);

router.post("/movies", adminController.addMovie);
router.put("/movies/:id", adminController.editMovie);
router.delete("/movies/:id", adminController.deleteMovie);
router.get("/analytics", adminController.getAnalytics);
router.get("/users", adminController.getAllUsers);

export default router;
