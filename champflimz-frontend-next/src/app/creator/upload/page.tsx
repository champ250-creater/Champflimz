"use client";

import { useState } from 'react';
import { UploadCloud, Video, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CreatorUploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'MOVIE',
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90; // Wait for backend response to reach 100%
        }
        return prev + 10;
      });
    }, 500);

    try {
      const { api } = await import('@/lib/api');
      // For a real upload we would use FormData, but our mock endpoint accepts JSON body
      // and assumes the file is already uploaded to a temp path.
      await api.post('/video/upload-mock', formData);
      setProgress(100);
      setUploading(false);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert('Upload failed');
      setUploading(false);
      setProgress(0);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-12 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel p-12 rounded-2xl flex flex-col items-center max-w-md text-center"
        >
          <CheckCircle2 size={64} className="text-green-500 mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">Upload Successful!</h2>
          <p className="text-muted mb-8">Your video has been added to the processing queue. It will be available for streaming once encoding is complete.</p>
          <Link href="/creator/dashboard" className="px-6 py-3 bg-primary rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Go to Dashboard
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-12">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-8">Upload New Video</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div 
            className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-12 transition-colors ${
              dragActive ? 'border-primary bg-primary/10' : 'border-white/10 hover:border-white/30'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="text-center">
                <Video size={48} className="mx-auto text-primary mb-4" />
                <p className="font-semibold text-white mb-1">{file.name}</p>
                <p className="text-sm text-muted mb-4">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                <button onClick={() => setFile(null)} className="text-sm text-accent hover:text-accent/80">Remove file</button>
              </div>
            ) : (
              <div className="text-center">
                <UploadCloud size={48} className="mx-auto text-muted mb-4" />
                <p className="text-white font-medium mb-2">Drag and drop your video here</p>
                <p className="text-sm text-muted mb-6">MP4, MOV, or MKV up to 10GB</p>
                
                <input
                  type="file"
                  id="video-upload"
                  className="hidden"
                  accept="video/*"
                  onChange={handleChange}
                />
                <label 
                  htmlFor="video-upload"
                  className="px-6 py-3 glass-panel rounded-lg font-semibold hover:bg-white/10 transition-colors cursor-pointer inline-block"
                >
                  Select File
                </label>
              </div>
            )}
          </div>

          {/* Form Area */}
          <div className="glass-panel p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium text-muted mb-2">Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter video title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted mb-2">Description</label>
                <textarea 
                  required
                  className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors min-h-[120px]"
                  placeholder="Tell viewers about your video..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted mb-2">Video Type</label>
                <select 
                  className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="MOVIE">Movie</option>
                  <option value="EPISODE">TV Episode</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={!file || uploading}
                className={`w-full py-4 rounded-lg font-bold transition-all mt-4 ${
                  !file || uploading ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {uploading ? `Uploading... ${progress}%` : 'Upload to Queue'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
