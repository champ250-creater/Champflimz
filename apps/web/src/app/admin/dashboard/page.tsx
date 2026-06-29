"use client";

import { Users, Video, AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Users', value: '1,245', icon: Users, change: '+12%' },
    { title: 'Videos Processed', value: '84', icon: Video, change: '+5%' },
    { title: 'Processing Queue', value: '3', icon: Activity, change: '-2' },
    { title: 'Reported Issues', value: '12', icon: AlertTriangle, change: '+1' },
  ];

  return (
    <div className="min-h-screen bg-background pt-32 pb-12">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">System Admin Dashboard</h1>
          <Link href="/" className="px-4 py-2 glass-panel rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
            Exit Admin
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="glass-panel p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <stat.icon className="text-primary" size={24} />
                </div>
                <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-muted text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-panel p-6 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-6">Recent Server Activity</h2>
            <div className="space-y-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className="flex items-center gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">Video #10{i} processing completed.</p>
                    <p className="text-xs text-muted">2 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-6">System Health</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">CPU Usage</span>
                  <span className="text-white font-medium">42%</span>
                </div>
                <div className="w-full bg-surface rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">Memory (RAM)</span>
                  <span className="text-white font-medium">68%</span>
                </div>
                <div className="w-full bg-surface rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">Storage (S3)</span>
                  <span className="text-white font-medium">89%</span>
                </div>
                <div className="w-full bg-surface rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
