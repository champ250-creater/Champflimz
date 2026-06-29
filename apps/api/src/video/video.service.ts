import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VideoService {
  constructor(
    @InjectQueue('video-processing') private videoQueue: Queue,
    private prisma: PrismaService,
  ) {}

  async createVideoRecord(data: any, creatorId: number) {
    return this.prisma.video.create({
      data: {
        ...data,
        creatorId,
        processingStatus: 'PENDING',
      },
    });
  }

  async processVideo(videoId: number, filePath: string) {
    const video = await this.prisma.video.findUnique({ where: { id: videoId } });
    if (!video) {
      throw new NotFoundException('Video not found');
    }

    await this.videoQueue.add('process-hls', {
      videoId,
      filePath,
    });

    return { message: 'Video processing started', videoId };
  }

  async getVideoStatus(videoId: number) {
    const video = await this.prisma.video.findUnique({
      where: { id: videoId },
      select: { id: true, processingStatus: true, hlsManifestUrl: true },
    });

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    return video;
  }
}
