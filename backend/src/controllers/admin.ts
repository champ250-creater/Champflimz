import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth.js";

const prisma = new PrismaClient();

export const addMovie = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, posterUrl, backdropUrl, releaseYear, genre, rating, trailerUrl, tmdbId, cast } =
      req.body;

    if (!title || !description || !posterUrl || !releaseYear || !genre || rating === undefined) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        posterUrl,
        backdropUrl,
        releaseYear,
        genre,
        rating,
        trailerUrl,
        tmdbId,
      },
    });

    if (cast && Array.isArray(cast)) {
      await prisma.castMember.createMany({
        data: cast.map((c: any) => ({
          name: c.name,
          character: c.character,
          image: c.image,
          movieId: movie.id,
        })),
      });
    }

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: "Failed to add movie" });
  }
};

export const editMovie = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, posterUrl, backdropUrl, releaseYear, genre, rating, trailerUrl } = req.body;

    const movie = await prisma.movie.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        posterUrl,
        backdropUrl,
        releaseYear,
        genre,
        rating,
        trailerUrl,
      },
    });

    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: "Failed to edit movie" });
  }
};

export const deleteMovie = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.movie.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete movie" });
  }
};

export const getAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const totalMovies = await prisma.movie.count();
    const totalUsers = await prisma.user.count();
    const totalWatches = await prisma.watchHistory.count();
    const averageRating =
      (await prisma.movie.aggregate({
        _avg: { rating: true },
      })) || 0;

    res.json({
      totalMovies,
      totalUsers,
      totalWatches,
      averageRating: averageRating._avg.rating || 0,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
};

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, email: true, role: true, createdAt: true },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
