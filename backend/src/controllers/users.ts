import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth.js";

const prisma = new PrismaClient();

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, username: true, email: true, role: true, createdAt: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

export const addToMyList = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { movieId } = req.body;

    const myListItem = await prisma.myList.upsert({
      where: { userId_movieId: { userId: req.userId, movieId } },
      update: {},
      create: { userId: req.userId, movieId },
    });

    res.json(myListItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add to list" });
  }
};

export const removeFromMyList = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { movieId } = req.body;

    await prisma.myList.deleteMany({
      where: { userId: req.userId, movieId },
    });

    res.json({ message: "Removed from list" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove from list" });
  }
};

export const getMyList = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const myList = await prisma.myList.findMany({
      where: { userId: req.userId },
      include: { movie: true },
      orderBy: { addedAt: "desc" },
    });

    const movies = myList.map((item) => item.movie);

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch my list" });
  }
};
