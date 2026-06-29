import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiService {
  constructor(private prisma: PrismaService) {}

  async getRecommendations(userId: number) {
    // Basic recommendation logic: 
    // Find genres of videos the user has completed in their watch history
    const history = await this.prisma.watchHistory.findMany({
      where: { userId, completed: true },
      include: {
        video: {
          include: { genres: true }
        }
      }
    });

    if (history.length === 0) {
      // Fallback: return top rated videos
      return this.prisma.video.findMany({
        orderBy: { rating: 'desc' },
        take: 10,
        where: { processingStatus: 'COMPLETED' }
      });
    }

    // Extract preferred genre IDs
    const genreIds = new Set<number>();
    history.forEach(h => {
      h.video.genres.forEach(g => genreIds.add(g.genreId));
    });

    // Find other videos in these genres
    return this.prisma.video.findMany({
      where: {
        processingStatus: 'COMPLETED',
        genres: {
          some: { genreId: { in: Array.from(genreIds) } }
        },
        NOT: {
          watchHistory: { some: { userId } } // Exclude already watched
        }
      },
      take: 10,
      orderBy: { rating: 'desc' }
    });
  }

  async getSmartSearch(query: string) {
    // In a full implementation, this would hit Elasticsearch.
    // For now, we perform an advanced ILIKE search using Prisma.
    return this.prisma.video.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } }
        ],
        processingStatus: 'COMPLETED'
      },
      take: 20
    });
  }
}
