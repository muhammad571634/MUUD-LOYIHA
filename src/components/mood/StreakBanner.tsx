"use client";

interface StreakBannerProps {
  currentStreak: number;
  goalDays: number;
}

export default function StreakBanner({ currentStreak, goalDays }: StreakBannerProps) {
  const isPerfect = currentStreak >= goalDays;

  return (
    <div className="mx-4 rounded-2xl bg-gradient-to-r from-[#D4537E] to-[#E8719A] p-4 shadow-lg shadow-[#D4537E]/25 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-8 w-16 h-16 bg-white/5 rounded-full translate-y-1/2" />

      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-white/80 text-xs font-medium uppercase tracking-wider mb-0.5">
            Daily Goal
          </p>
          <h2 className="text-white text-lg font-bold">
            {currentStreak}-Day Streak Achieved! 🎉
          </h2>
        </div>
        <div className="flex flex-col items-center bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5">
          <span className="text-white/80 text-[10px] font-semibold uppercase tracking-wider">
            {isPerfect ? "Perfect" : "Progress"}
          </span>
          <span className="text-white text-xl font-black">
            {currentStreak}/{goalDays}
          </span>
        </div>
      </div>
    </div>
  );
}
