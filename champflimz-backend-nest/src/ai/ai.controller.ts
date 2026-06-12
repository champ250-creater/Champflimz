import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtAuthGuard)
  @Get('recommendations')
  async getRecommendations(@Req() req: any) {
    return this.aiService.getRecommendations(req.user.id);
  }

  @Get('search')
  async smartSearch(@Query('q') query: string) {
    if (!query) return [];
    return this.aiService.getSmartSearch(query);
  }
}
