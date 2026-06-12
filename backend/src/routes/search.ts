import express from "express";
import * as searchController from "../controllers/search.js";

const router = express.Router();

router.get("/movies", searchController.searchMovies);
router.get("/suggestions", searchController.getSearchSuggestions);
router.get("/genres", searchController.getGenres);

export default router;
