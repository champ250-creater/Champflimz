import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { VideoProcessor } from './video.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'video-processing',
    }),
  ],
  providers: [VideoService, VideoProcessor],
  controllers: [VideoController],
  exports: [VideoService],
})
export class VideoModule {}
