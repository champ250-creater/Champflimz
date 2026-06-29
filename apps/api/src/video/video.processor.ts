import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const mkdir = util.promisify(fs.mkdir);

@Processor('video-processing')
@Injectable()
export class VideoProcessor extends WorkerHost {
  private readonly logger = new Logger(VideoProcessor.name);

  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}`);

    const { videoId, filePath } = job.data;

    try {
      await this.prisma.video.update({
        where: { id: videoId },
        data: { processingStatus: 'PROCESSING' },
      });

      // Prepare output directories
      const publicDir = path.join(process.cwd(), 'public');
      const streamsDir = path.join(publicDir, 'streams', videoId.toString());
      
      if (!fs.existsSync(streamsDir)) {
        await mkdir(streamsDir, { recursive: true });
      }

      const m3u8Path = path.join(streamsDir, 'master.m3u8');

      this.logger.log(`Starting HLS conversion for video ${videoId}`);

      // 1. Generate HLS Stream
      await new Promise<void>((resolve, reject) => {
        ffmpeg(filePath)
          .outputOptions([
            '-profile:v baseline',
            '-level 3.0',
            '-start_number 0',
            '-hls_time 10',
            '-hls_list_size 0',
            '-f hls'
          ])
          .output(m3u8Path)
          .on('end', () => {
            this.logger.log(`HLS conversion finished for video ${videoId}`);
            resolve();
          })
          .on('error', (err) => {
            this.logger.error(`Error during HLS conversion for video ${videoId}: ${err.message}`);
            reject(err);
          })
          .run();
      });

      // 2. Generate Thumbnail
      this.logger.log(`Generating thumbnail for video ${videoId}`);
      await new Promise<void>((resolve, reject) => {
        ffmpeg(filePath)
          .on('end', () => resolve())
          .on('error', (err) => {
            this.logger.warn(`Could not generate thumbnail for video ${videoId}: ${err.message}`);
            resolve(); // We don't fail the whole process if thumbnail fails
          })
          .screenshots({
            count: 1,
            folder: streamsDir,
            filename: 'poster.jpg',
            size: '1280x720',
          });
      });

      this.logger.log(`Job ${job.id} completed. Updating database.`);

      await this.prisma.video.update({
        where: { id: videoId },
        data: { 
          processingStatus: 'COMPLETED',
          hlsManifestUrl: `/streams/${videoId}/master.m3u8`,
          posterUrl: `/streams/${videoId}/poster.jpg`,
        },
      });
      
    } catch (error) {
      this.logger.error(`Job ${job.id} failed`, error.stack);
      await this.prisma.video.update({
        where: { id: videoId },
        data: { processingStatus: 'FAILED' },
      });
      throw error;
    }
  }
}
