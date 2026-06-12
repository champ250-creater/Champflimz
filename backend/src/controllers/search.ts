import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth.js";

const prisma = new PrismaClient();

export const searchMovies = async (req: AuthRequest, res: Response) => {
  try {
    const { q, genre, year, rating } = req.query;

    let whereClause: any = {};

    if (q) {
      whereClause.OR = [
        { title: { contains: q as string, mode: "insensitive" } },
        { description: { contains: q as string, mode: "insensitive" } },
      ];
    }

    if (genre) {
      whereClause.genre = { contains: genre as string, mode: "insensitive" };
    }

    if (year) {
      whereClause.releaseYear = parseInt(year as string);
    }

    if (rating) {
      whereClause.rating = { gte: parseFloat(rating as string) };
    }

    const movies = await prisma.movie.findMany({
      where: whereClause,
      take: 20,
      include: { cast: true },
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
};

export const getSearchSuggestions = async (req: AuthRequest, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string" || q.length < 2) {
      return res.json([]);
    }

    const movies = await prisma.movie.findMany({
      where: {
        title: { contains: q, mode: "insensitive" },
      },
      select: { id: true, title: true },
      take: 10,
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
};

export const getGenres = async (req: AuthRequest, res: Response) => {
  try {
    const movies = await prisma.movie.findMany({
      select: { genre: true },
      distinct: ["genre"],
    });

    const genres = movies
      .map((m) => m.genre)
      .flat()
      .filter((g) => g)
      .sort();

    const uniqueGenres = [...new Set(genres)];

    res.json(uniqueGenres);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch genres" });
  }
};
