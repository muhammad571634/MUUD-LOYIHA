"use client";

import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";

// Demo 7-day mood data
const WEEK_DATA = [
  { day: "MON", emoji: "😌", score: 2 },
  { day: "TUE", emoji: "😊", score: 6 },
  { day: "WED", emoji: "😃", score: 3 },
  { day: "THU", emoji: "😐", score: 1 },
  { day: "FRI", emoji: "🤩", score: 8 },
  { day: "SAT", emoji: "😎", score: 2 },
  { day: "SUN", emoji: "😇", score: 9 },
];

// Activity calendar heatmap data (4 weeks)
const CALENDAR_DAYS = ["Y", "D", "S", "C", "P", "J", "S"];
const CALENDAR_DATA = [
  [0, 1, 3, 1, 3, 3, 1],
  [1, 2, 3, 2, 2, 1, 2],
  [3, 1, 2, 2, 3, 1, 2],
  [2, 1, 3, 2, 3, 1, 2],
  [1, 2, 1, 0, 0, 0, 0],
];

function getHeatColor(level: number): string {
  switch (level) {
    case 0: return "#FCE8F0"; // very light pink
    case 1: return "#F4B6CD"; // soft pink
    case 2: return "#E484A8"; // mid pink
    case 3: return "#D4537E"; // brand core pink
    default: return "#FCE8F0";
  }
}

export default function StatsPage() {
  const router = useRouter();

  // Generate SVG path for the mood chart
  const chartWidth = 320;
  const chartHeight = 80;
  const points = WEEK_DATA.map((d, i) => ({
    x: (i / (WEEK_DATA.length - 1)) * chartWidth,
    y: chartHeight - ((d.score - 1) / 9) * chartHeight,
  }));

  // Create smooth curve path
  const linePath = points.reduce((path, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = points[i - 1];
    const cpx1 = prev.x + (point.x - prev.x) / 3;
    const cpx2 = prev.x + (2 * (point.x - prev.x)) / 3;
    return `${path} C ${cpx1} ${prev.y}, ${cpx2} ${point.y}, ${point.x} ${point.y}`;
  }, "");

  const areaPath = `${linePath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F8] to-white dark:from-[#0a0a0a] dark:to-[#141414] transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
        <div className="max-w-md mx-auto flex items-center justify-between px-5 pt-8 pb-3">
          <button onClick={() => router.back()} className="p-1.5 -ml-1.5 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-base font-bold text-foreground">Personal Statistics</h1>
          <button className="p-1.5 -mr-1.5 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.73 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.49-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
            </svg>
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto pb-24 px-5">
        {/* Current Streak Card */}
        <section className="pt-2 pb-3">
          <div className="bg-[#0f0e13] rounded-[24px] p-6 text-center">
            
            <div className="flex flex-col items-center">
              {/* Fire icon with pink glow */}
              <div className="text-[#FF2D55] drop-shadow-[0_0_8px_rgba(255,45,85,0.6)] mb-3">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.66 2.083c-1.353 3.011-3.666 4.965-4.819 8.275-1.127 3.237-.532 6.845 1.587 9.544.756.963 1.696 1.769 2.766 2.308-1.597-.666-2.914-1.854-3.793-3.329-1.294-2.176-1.554-4.839-.728-7.158.261-.734.629-1.446 1.099-2.096-1.114 1.83-1.823 3.96-1.823 6.136 0 1.677.406 3.295 1.157 4.706A9.68 9.68 0 0012 24c5.087 0 9.214-4.225 9.214-9.435 0-3.238-1.59-6.326-4.103-8.314-2.112-1.672-4.9-2.483-5.451-4.168zm.34 21.917V24z"/>
                </svg>
              </div>

              <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-[0.1em] mb-1">
                CURRENT STREAK
              </p>
              <h2 className="text-white text-4xl font-black tracking-tight mb-4">7 days</h2>

              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 bg-[#4B1328] rounded-full px-4 py-1.5">
                <svg className="w-3.5 h-3.5 text-[#FF2D55]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 18L18 6M18 6H9M18 6V15" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[#FF2D55] text-xs font-bold">Keep it up!</span>
              </div>
            </div>
          </div>
        </section>

        {/* 7-Day Mood Chart */}
        <section className="py-2">
          <div className="bg-transparent">
            {/* SVG Chart */}
            <div className="-mx-5">
              <svg viewBox={`0 -10 ${chartWidth} ${chartHeight + 20}`} className="w-full h-32 preserve-aspect-ratio-none">
                {/* Horizontal grid lines */}
                {[0, 1, 2, 3].map((i) => (
                  <line
                    key={`h-${i}`}
                    x1="0"
                    y1={(i / 3) * chartHeight}
                    x2={chartWidth}
                    y2={(i / 3) * chartHeight}
                    stroke="#000000"
                    strokeOpacity="0.04"
                    strokeWidth="1"
                  />
                ))}

                {/* Line */}
                <path d={linePath} fill="none" stroke="#8A3FFC" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>

            {/* Day labels with emojis */}
            <div className="flex justify-between px-2 pt-3">
              {WEEK_DATA.map((d) => (
                <div key={d.day} className="flex flex-col items-center gap-1.5">
                  <span className="text-xl drop-shadow-sm">{d.emoji}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activity Calendar */}
        <section className="py-5">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-[17px] font-bold text-gray-900">Activity Calendar</h3>
            <span className="text-xs font-bold text-gray-500 tracking-wide">October 2023</span>
          </div>

          <div className="bg-[#FAF9FB] dark:bg-[#1a1a2e] rounded-3xl p-5 shadow-sm border border-black/5 dark:border-white/5 transition-colors duration-500">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1.5 mb-2.5">
              {CALENDAR_DAYS.map((day, i) => (
                <div key={`${day}-${i}`} className="text-center text-[10px] font-bold text-gray-400 uppercase">
                  {day}
                </div>
              ))}
            </div>

            {/* Heatmap grid */}
            <div className="space-y-1.5">
              {CALENDAR_DATA.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7 gap-1.5">
                  {week.map((level, di) => (
                    <div
                      key={di}
                      className="aspect-square rounded-[10px] transition-colors duration-200"
                      style={{ backgroundColor: getHeatColor(level) }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between mt-6">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Less Calm</span>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: getHeatColor(level) }}
                  />
                ))}
              </div>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">More Calm</span>
            </div>
          </div>
        </section>

        {/* Productivity Insight Card */}
        <section className="py-2 pb-8">
          <div className="bg-[#E5FFEE] dark:bg-[#1A3326] rounded-[24px] p-5 border border-green-200/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#00E572] flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="M18 9l-5 5-3-3-4 4" />
                </svg>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-black dark:text-white uppercase tracking-wider mb-1">
                  Morning Productivity
                </h4>
                <p className="text-[13px] text-gray-800 dark:text-gray-200 leading-snug">
                  If you enter data before 9:00 AM, your mood is{" "}
                  <span className="font-bold text-[#00E572]">15% higher</span>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
