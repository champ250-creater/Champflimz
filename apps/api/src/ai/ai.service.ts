import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private ai: GoogleGenAI;

  constructor(private prisma: PrismaService) {
    // Initialize Gemini SDK
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'mock-key' });
  }

  /**
   * Generates a spoiler-free summary for a video description
   */
  async generateAutoSummary(description: string, title: string): Promise<string> {
    try {
      const prompt = `You are an expert film critic. Write a compelling, 2-3 sentence spoiler-free synopsis for the movie "${title}". Based on this raw description: "${description}". The summary should be marketing-ready.`;
      
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text || description;
    } catch (error) {
      this.logger.error(`Failed to generate summary for ${title}`, error);
      return description; // fallback to original
    }
  }

  /**
   * Automatically infers and tags genres, tone, and themes based on the description
   */
  async generateAutoTags(description: string, title: string): Promise<string[]> {
    try {
      const prompt = `Based on the description of the movie "${title}": "${description}". 
      Return a comma-separated list of exactly 5 tags that describe the genre, tone, and pacing (e.g., "Dark, Slow-burn, Thriller, Psychological, Atmospheric"). Do not include any other text.`;
      
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || '';
      return text.split(',').map(tag => tag.trim()).filter(t => t.length > 0);
    } catch (error) {
      this.logger.error(`Failed to generate tags for ${title}`, error);
      return [];
    }
  }

  /**
   * Advanced Semantic Search over the content catalog
   */
  async semanticSearch(query: string) {
    try {
      // 1. Convert the natural language query into search parameters using Gemini
      const prompt = `Parse this user search query into JSON format. Query: "${query}".
      Extract:
      - 'intent': A core keyword or subject
      - 'mood': (optional) e.g., funny, scary, uplifting
      - 'isNegative': (boolean) True if they specifically asked to NOT see something.
      Format as strictly valid JSON without markdown blocks.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      let parsedQuery;
      try {
        let jsonStr = response.text || '{}';
        jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '');
        parsedQuery = JSON.parse(jsonStr);
      } catch (e) {
        parsedQuery = { intent: query };
      }

      // 2. Perform DB search based on extracted semantic intent
      // In a production environment with Elasticsearch, we'd do a vector search here.
      return this.prisma.video.findMany({
        where: {
          OR: [
            { title: { contains: parsedQuery.intent, mode: 'insensitive' } },
            { description: { contains: parsedQuery.intent, mode: 'insensitive' } }
          ],
          processingStatus: 'COMPLETED'
        },
        take: 10
      });
    } catch (error) {
      this.logger.error('Semantic search failed', error);
      // Fallback to basic search
      return this.prisma.video.findMany({
        where: { title: { contains: query, mode: 'insensitive' } },
        take: 10
      });
    }
  }

  async getRecommendations(userId: number) {
    // Basic recommendation logic based on watch history
    const history = await this.prisma.watchHistory.findMany({
      where: { userId, completed: true },
      include: {
        video: {
          include: { genres: true }
        }
      }
    });

    if (history.length === 0) {
      return this.prisma.video.findMany({
        orderBy: { rating: 'desc' },
        take: 10,
        where: { processingStatus: 'COMPLETED' }
      });
    }

    const genreIds = new Set<number>();
    history.forEach(h => {
      h.video.genres.forEach(g => genreIds.add(g.genreId));
    });

    return this.prisma.video.findMany({
      where: {
        processingStatus: 'COMPLETED',
        genres: {
          some: { genreId: { in: Array.from(genreIds) } }
        },
        NOT: {
          watchHistory: { some: { userId } }
        }
      },
      take: 10,
      orderBy: { rating: 'desc' }
    });
  }
}
