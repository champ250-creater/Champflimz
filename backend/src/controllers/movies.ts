import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth.js";

const prisma = new PrismaClient();

export const getAllMovies = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const movies = await prisma.movie.findMany({
      skip,
      take: limit,
      include: { cast: true },
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.movie.count();

    res.json({
      data: movies,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

export const getMovieById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const movieId = parseInt(id);

    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
      include: {
        cast: true,
        similar: { include: { similarMovie: true } },
      },
    });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Add to watch history if user is authenticated
    if (req.userId) {
      await prisma.watchHistory.upsert({
        where: { userId_movieId: { userId: req.userId, movieId } },
        update: { watchedAt: new Date() },
        create: { userId: req.userId, movieId },
      });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
};

export const getTrendingMovies = async (req: AuthRequest, res: Response) => {
  try {
    const movies = await prisma.movie.findMany({
      take: 20,
      orderBy: { rating: "desc" },
      include: { cast: true },
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
};

export const getPopularMovies = async (req: AuthRequest, res: Response) => {
  try {
    const movies = await prisma.movie.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
};

export const getContinueWatching = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const watchHistory = await prisma.watchHistory.findMany({
      where: { userId: req.userId },
      include: { movie: true },
      orderBy: { watchedAt: "desc" },
      take: 20,
    });

    const movies = watchHistory.map((wh) => wh.movie);

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch continue watching" });
  }
};
