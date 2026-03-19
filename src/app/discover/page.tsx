"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/layout/BottomNav";
import Link from "next/link";

// Ambient pulse animation data
const TRENDING_STATES = [
  { icon: "🧘", label: "Meditative", count: "8.2k", tag: "GLOBAL", color: "#7C6BF0", bgColor: "#F0EDFF", darkBgColor: "#1e1a3a" },
  { icon: "⚡", label: "Focused", count: "5.1k", tag: "GLOBAL", color: "#E8536D", bgColor: "#FFF0F2", darkBgColor: "#3a1a22" },
  { icon: "😊", label: "Content", count: "4.8k", tag: "GLOBAL", color: "#4CAF50", bgColor: "#E8F5E9", darkBgColor: "#1a2e1e" },
  { icon: "🎨", label: "Creative", count: "3.1k", tag: "GLOBAL", color: "#FF9800", bgColor: "#FFF3E0", darkBgColor: "#3a2a1a" },
];

export default function DiscoverPage() {
  const [pulseScale, setPulseScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseScale((prev) => (prev === 1 ? 1.05 : 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-border/30 transition-colors duration-500">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
          {/* Menu */}
          <button className="p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
            <svg className="w-6 h-6 text-foreground" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16m-7 6h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <h1 className="text-base font-semibold text-foreground">Discover</h1>

          {/* Notification bell */}
          <Link href="/notifications" className="relative p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
            <svg className="w-6 h-6 text-foreground" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="absolute top-2 right-2 w-2 h-2 bg-[#D4537E] rounded-full ring-2 ring-white dark:ring-[#0a0a0a]" />
          </Link>
        </div>
      </header>

      <main className="max-w-md mx-auto pb-24">
        {/* Global Pulse Section */}
        <section className="px-5 pt-5 pb-2">
          <h2 className="text-2xl font-bold text-foreground">Global Pulse</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Real-time collective energy</p>
        </section>

        {/* Ambient Orb Visualization */}
        <section className="px-5 py-4">
          <div className="relative bg-gradient-to-b from-[#F4F0FF] to-[#EDE8FF] rounded-3xl p-8 overflow-hidden">
            {/* Concentric rings */}
            <div className="flex items-center justify-center py-6">
              <div
                className="relative w-48 h-48 flex items-center justify-center transition-transform duration-[2000ms] ease-in-out"
                style={{ transform: `scale(${pulseScale})` }}
              >
                {/* Ring 4 (outermost) */}
                <div className="absolute inset-0 rounded-full border-2 border-[#C8B8F0]/30 animate-[ping_4s_ease-in-out_infinite]" />
                {/* Ring 3 */}
                <div className="absolute inset-4 rounded-full border-2 border-[#B8A4EC]/40" />
                {/* Ring 2 */}
                <div className="absolute inset-10 rounded-full border-2 border-[#A890E8]/50 bg-[#D4C8F4]/20" />
                {/* Ring 1 */}
                <div className="absolute inset-16 rounded-full bg-[#C4B4F0]/40" />
                {/* Center orb */}
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#8B6CF0] to-[#7C5CE0] flex items-center justify-center shadow-lg shadow-[#8B6CF0]/40">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L9.5 8.5L3 9.5L8 14L6.5 21L12 17.5L17.5 21L16 14L21 9.5L14.5 8.5L12 2Z" fill="currentColor" opacity="0.9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Current State */}
            <div className="flex items-center justify-between mt-2">
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">
                  Current State
                </p>
                <p className="text-lg font-bold text-foreground mt-0.5">Ambient Calm</p>
              </div>

              {/* Avatar stack */}
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 border-2 border-white flex items-center justify-center text-xs">🧑</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-200 to-green-300 border-2 border-white flex items-center justify-center text-xs">👩</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 border-2 border-white flex items-center justify-center text-xs font-semibold text-blue-700">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M20 21C20 17.134 16.4183 14 12 14C7.58172 14 4 17.134 4 21" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Connection Card */}
        <section className="px-5 py-2">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient background */}
            <div className="bg-gradient-to-br from-[#E8E0F8] via-[#D8CFF0] to-[#C8BDE8] p-6 pb-0">
              {/* People silhouettes */}
              <div className="flex justify-center py-4 opacity-40">
                <svg className="w-24 h-16" viewBox="0 0 96 64" fill="none">
                  <circle cx="32" cy="20" r="8" fill="#6B5CA5" opacity="0.6" />
                  <path d="M16 56C16 44.954 24.954 36 36 36H28C16.954 36 8 44.954 8 56" fill="#6B5CA5" opacity="0.4" />
                  <circle cx="48" cy="16" r="10" fill="#6B5CA5" opacity="0.7" />
                  <path d="M28 56C28 42.745 38.745 32 52 32H44C30.745 32 20 42.745 20 56" fill="#6B5CA5" opacity="0.5" />
                  <circle cx="64" cy="20" r="8" fill="#6B5CA5" opacity="0.6" />
                  <path d="M48 56C48 44.954 56.954 36 68 36H60C48.954 36 40 44.954 40 56" fill="#6B5CA5" opacity="0.4" />
                </svg>
              </div>

              {/* Live badge */}
              <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-foreground">Live Connection</span>
              </div>
            </div>

            {/* Info section */}
            <div className="bg-white dark:bg-[#1a1a2e] px-6 pt-5 pb-6 transition-colors duration-500">
              <h3 className="text-xl font-bold text-foreground mb-1.5">You&apos;re not alone</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                12,450 people are feeling &lsquo;<span className="font-semibold text-foreground">Calm</span>&rsquo; right now in your region.
              </p>

              {/* Join Button */}
              <button className="w-full mt-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#7C6BF0] to-[#9B8CF5] text-white font-semibold text-sm shadow-lg shadow-[#7C6BF0]/25 hover:shadow-xl hover:shadow-[#7C6BF0]/35 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                Join the pulse
              </button>
            </div>
          </div>
        </section>

        {/* Trending States & Heatmap Grid */}
        <div className="px-5 pt-4 pb-6 space-y-6">
          
          {/* Trending States */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Trending States</h3>
              <button className="text-xs font-bold text-[#D4537E] uppercase tracking-wider hover:text-[#E8719A] transition-colors">
                View All
              </button>
            </div>

            {/* Trend cards grid */}
            <div className="grid grid-cols-2 gap-3">
              {TRENDING_STATES.map((state) => (
                <div
                  key={state.label}
                  className="rounded-2xl p-4 text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-[0.98] border border-black/5 dark:border-white/5 cursor-pointer flex flex-col justify-between h-28"
                  style={{ backgroundColor: state.bgColor }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl drop-shadow-sm">{state.icon}</span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.12em] bg-white/50 px-2 py-0.5 rounded-full"
                      style={{ color: state.color }}
                    >
                      {state.tag}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{state.label}</p>
                    <p className="text-xs text-gray-700 font-medium mt-0.5">{state.count} people</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Regional Heatmap */}
          <section>
            <div className="flex items-center justify-between mb-4 mt-2">
              <h3 className="text-lg font-bold text-foreground">Regional Heatmap</h3>
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Live
              </span>
            </div>
            
            <div className="bg-white dark:bg-[#111] border border-border/50 rounded-2xl p-4 shadow-sm space-y-4">
              {[
                { region: "North America", dominant: "Focused", icon: "⚡", percentage: 65, color: "bg-[#E8536D]" },
                { region: "Europe", dominant: "Meditative", icon: "🧘", percentage: 48, color: "bg-[#7C6BF0]" },
                { region: "Asia", dominant: "Content", icon: "😊", percentage: 72, color: "bg-[#4CAF50]" },
                { region: "South America", dominant: "Creative", icon: "🎨", percentage: 55, color: "bg-[#FF9800]" },
              ].map((item) => (
                <div key={item.region} className="cursor-default group p-2 -m-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <div className="flex justify-between items-end mb-1.5">
                    <div>
                      <span className="text-sm font-semibold text-foreground">{item.region}</span>
                      <span className="text-xs text-muted-foreground ml-2">Mostly {item.icon} {item.dominant}</span>
                    </div>
                    <span className="text-xs font-bold text-foreground">{item.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out group-hover:opacity-80`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      <BottomNav />
    </div>
  );
}
