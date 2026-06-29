"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@champflimz/ui';
import { BarChart, Users, Video, Activity, PlayCircle } from 'lucide-react';

// Mock data for Admin
const stats = [
  { title: "Total Users", value: "24,591", icon: <Users className="w-6 h-6 text-blue-500" /> },
  { title: "Active Creators", value: "1,204", icon: <Video className="w-6 h-6 text-purple-500" /> },
  { title: "Videos Hosted", value: "8,942", icon: <PlayCircle className="w-6 h-6 text-[var(--color-accent-500)]" /> },
  { title: "Avg. Watch Time", value: "42m / day", icon: <Activity className="w-6 h-6 text-green-500" /> },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[var(--color-surface-base)] text-white font-ui pt-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center gap-4 mb-12">
          <BarChart className="w-8 h-8 text-[var(--color-accent-500)]" />
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Admin Control Center</h1>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <Card key={i} className="bg-[var(--color-surface-1)] border-white/5 hover:border-white/10 transition-all">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/50 font-medium mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                </div>
                <div className="p-4 bg-[var(--color-surface-2)] rounded-full">
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card className="col-span-1 bg-[var(--color-surface-1)] border-white/5">
            <CardHeader>
              <CardTitle>System Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <button className="w-full py-3 bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-3)] text-left px-4 rounded-md transition-colors font-medium border border-white/5">
                Manage Users
              </button>
              <button className="w-full py-3 bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-3)] text-left px-4 rounded-md transition-colors font-medium border border-white/5">
                Review Upload Queue
              </button>
              <button className="w-full py-3 bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-3)] text-left px-4 rounded-md transition-colors font-medium border border-white/5">
                Server Health & Logs
              </button>
              <button className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-left px-4 rounded-md transition-colors font-medium border border-red-500/20 mt-4">
                Flush Redis Cache
              </button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="col-span-1 lg:col-span-2 bg-[var(--color-surface-1)] border-white/5">
            <CardHeader>
              <CardTitle>Recent Platform Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { user: "alex_dev", action: "uploaded a new video", target: "The Architecture of Next.js", time: "2 minutes ago" },
                  { user: "system", action: "completed transcoding job", target: "Interstellar (4K REMUX)", time: "15 minutes ago" },
                  { user: "sarah_j", action: "left a review on", target: "Inception", time: "1 hour ago" },
                  { user: "moderator", action: "banned user", target: "spambot992", time: "3 hours ago" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-[var(--color-accent-500)]" />
                    <div>
                      <p className="text-white/80">
                        <span className="font-semibold text-white">{item.user}</span> {item.action} <span className="text-[var(--color-accent-400)]">{item.target}</span>
                      </p>
                      <p className="text-xs text-white/40 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
