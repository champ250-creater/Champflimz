import express from "express";
import * as movieController from "../controllers/movies.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", movieController.getAllMovies);
router.get("/trending", movieController.getTrendingMovies);
router.get("/popular", movieController.getPopularMovies);
router.get("/continue-watching", authMiddleware, movieController.getContinueWatching);
router.get("/:id", movieController.getMovieById);

export default router;
