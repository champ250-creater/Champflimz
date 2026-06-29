const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

console.log('Generating mock video...');

ffmpeg('color=c=black:s=1280x720:d=1')
  .inputFormat('lavfi')
  .output(path.join(uploadsDir, 'mock-video-file.mp4'))
  .on('end', () => console.log('Mock video created successfully.'))
  .on('error', (err) => console.error('Error generating mock video:', err))
  .run();
