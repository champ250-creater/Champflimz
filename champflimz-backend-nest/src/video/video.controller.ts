import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common';
import { VideoService } from './video.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import * as path from 'path';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload-mock')
  async uploadMock(@Req() req: any, @Body() body: any) {
    // In a real scenario, this would handle multer upload.
    // We mock the file path to a dummy video in the project directory.
    const videoData = {
      title: body.title || 'Untitled Video',
      description: body.description || '',
      type: body.type || 'MOVIE',
    };

    const video = await this.videoService.createVideoRecord(videoData, req.user.id);
    
    const dummyVideoPath = path.join(process.cwd(), 'uploads', 'mock-video-file.mp4');
    
    return this.videoService.processVideo(video.id, dummyVideoPath);
  }

  @Get(':id/status')
  async getStatus(@Param('id') id: string) {
    return this.videoService.getVideoStatus(parseInt(id, 10));
  }
}
