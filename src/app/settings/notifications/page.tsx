"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";

export default function PushNotificationsSettingsPage() {
  const router = useRouter();

  // Settings State
  const [dailyReminder, setDailyReminder] = useState(true);
  const [newReactions, setNewReactions] = useState(true);
  const [newPrivateReplies, setNewPrivateReplies] = useState(true);
  const [friendCheckIns, setFriendCheckIns] = useState(false);
  const [streakAtRisk, setStreakAtRisk] = useState(true);
  const [newMilestones, setNewMilestones] = useState(true);

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0a0a0a] transition-colors duration-500 pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-gray-100 dark:border-white/10 transition-colors duration-500">
        <div className="max-w-md mx-auto flex items-center px-4 h-[60px]">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h1 className="text-[19px] font-black text-[#0F172A] dark:text-white ml-2 tracking-tight">Push Notifications</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto pt-5 pb-8 px-4 space-y-7">
        
        {/* DAILY REMINDER */}
        <section>
          <h2 className="text-[12px] font-bold text-[#64748B] dark:text-gray-400 uppercase tracking-[0.1em] mb-3 ml-1">
            Daily Reminder
          </h2>
          <div className="bg-white dark:bg-[#1C1C28] rounded-[24px] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden transition-colors duration-500">
            <div className="divide-y divide-gray-100 dark:divide-white/5">
              
              {/* Daily Check-in Reminder */}
              <div className="flex items-center justify-between p-4 px-5">
                <span className="text-[16px] font-medium text-[#0F172A] dark:text-white">Daily Check-in Reminder</span>
                <button 
                  onClick={() => setDailyReminder(!dailyReminder)}
                  className={`relative flex-shrink-0 w-[52px] h-7 rounded-full transition-colors duration-300 ${dailyReminder ? 'bg-[#D4537E] border-transparent' : 'bg-transparent border-[1.5px] border-gray-300 dark:border-gray-600'}`}
                >
                  <div className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${dailyReminder ? 'bg-white' : 'bg-gray-300 dark:bg-gray-600'} rounded-full transition-transform duration-300 shadow-sm ${dailyReminder ? 'left-[2px] translate-x-[24px]' : 'left-[3px] translate-x-0'}`} />
                </button>
              </div>

              {/* Reminder Time */}
              <div className="flex items-center justify-between p-4 px-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <span className="text-[16px] font-medium text-[#0F172A] dark:text-white">Reminder Time</span>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-medium text-[#D4537E]">22:00</span>
                  <svg className="w-4 h-4 text-[#D4537E]/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>

            </div>
          </div>
          <p className="text-[13px] text-[#94A3B8] dark:text-gray-500 mt-2.5 ml-1 leading-snug pr-4">
            Setting a consistent time helps you build a habit of reflecting on your day.
          </p>
        </section>

        {/* SOCIAL INTERACTIONS */}
        <section>
          <h2 className="text-[12px] font-bold text-[#64748B] dark:text-gray-400 uppercase tracking-[0.1em] mb-3 ml-1">
            Social Interactions
          </h2>
          <div className="bg-white dark:bg-[#1C1C28] rounded-[24px] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden transition-colors duration-500">
            <div className="divide-y divide-gray-100 dark:divide-white/5">
              
              {/* New Reactions */}
              <div className="flex items-center justify-between p-4 px-5">
                <span className="text-[16px] font-medium text-[#0F172A] dark:text-white">New Reactions</span>
                <button 
                  onClick={() => setNewReactions(!newReactions)}
                  className={`relative flex-shrink-0 w-[52px] h-7 rounded-full transition-colors duration-300 ${newReactions ? 'bg-[#D4537E] border-transparent' : 'bg-transparent border-[1.5px] border-gray-300 dark:border-gray-600'}`}
                >
                  <div className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${newReactions ? 'bg-white' : 'bg-gray-300 dark:bg-gray-600'} rounded-full transition-transform duration-300 shadow-sm ${newReactions ? 'left-[2px] translate-x-[24px]' : 'left-[3px] translate-x-0'}`} />
                </button>
              </div>

              {/* New Private Replies */}
              <div className="flex items-center justify-between p-4 px-5">
                <span className="text-[16px] font-medium text-[#0F172A] dark:text-white">New Private Replies</span>
                <button 
                  onClick={() => setNewPrivateReplies(!newPrivateReplies)}
                  className={`relative flex-shrink-0 w-[52px] h-7 rounded-full transition-colors duration-300 ${newPrivateReplies ? 'bg-[#D4537E] border-transparent' : 'bg-transparent border-[1.5px] border-gray-300 dark:border-gray-600'}`}
                >
                  <div className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${newPrivateReplies ? 'bg-white' : 'bg-gray-300 dark:bg-gray-600'} rounded-full transition-transform duration-300 shadow-sm ${newPrivateReplies ? 'left-[2px] translate-x-[24px]' : 'left-[3px] translate-x-0'}`} />
                </button>
              </div>

              {/* Friend Check-ins */}
              <div className="flex items-center justify-between p-4 px-5">
                <span className="text-[16px] font-medium text-[#0F172A] dark:text-white">Friend Check-ins</span>
                <button 
                  onClick={() => setFriendCheckIns(!friendCheckIns)}
                  className={`relative flex-shrink-0 w-[52px] h-7 rounded-full transition-colors duration-300 ${friendCheckIns ? 'bg-[#D4537E] border-transparent' : 'bg-gray-200 dark:bg-[#2C2C3A] border border-gray-200 dark:border-white/10'}`}
                >
                  <div className={`absolute top-1/2 -translate-y-1/2 w-[22px] h-[22px] ${friendCheckIns ? 'bg-white left-[2px] translate-x-[26px]' : 'bg-white dark:bg-gray-400 left-[2px] translate-x-0'} rounded-full transition-transform duration-300 shadow-sm`} />
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ACCOUNT & STREAKS */}
        <section>
          <h2 className="text-[12px] font-bold text-[#64748B] dark:text-gray-400 uppercase tracking-[0.1em] mb-3 ml-1">
            Account & Streaks
          </h2>
          <div className="bg-white dark:bg-[#1C1C28] rounded-[24px] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden transition-colors duration-500">
            <div className="divide-y divide-gray-100 dark:divide-white/5">
              
              {/* Streak at Risk */}
              <div className="flex items-center justify-between p-4 px-5">
                <span className="text-[16px] font-medium text-[#0F172A] dark:text-white">Streak at Risk</span>
                <button 
                  onClick={() => setStreakAtRisk(!streakAtRisk)}
                  className={`relative flex-shrink-0 w-[52px] h-7 rounded-full transition-colors duration-300 ${streakAtRisk ? 'bg-[#D4537E] border-transparent' : 'bg-transparent border-[1.5px] border-gray-300 dark:border-gray-600'}`}
                >
                  <div className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${streakAtRisk ? 'bg-white' : 'bg-gray-300 dark:bg-gray-600'} rounded-full transition-transform duration-300 shadow-sm ${streakAtRisk ? 'left-[2px] translate-x-[24px]' : 'left-[3px] translate-x-0'}`} />
                </button>
              </div>

              {/* New Milestones */}
              <div className="flex items-center justify-between p-4 px-5">
                <span className="text-[16px] font-medium text-[#0F172A] dark:text-white">New Milestones</span>
                <button 
                  onClick={() => setNewMilestones(!newMilestones)}
                  className={`relative flex-shrink-0 w-[52px] h-7 rounded-full transition-colors duration-300 ${newMilestones ? 'bg-[#D4537E] border-transparent' : 'bg-transparent border-[1.5px] border-gray-300 dark:border-gray-600'}`}
                >
                  <div className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${newMilestones ? 'bg-white' : 'bg-gray-300 dark:bg-gray-600'} rounded-full transition-transform duration-300 shadow-sm ${newMilestones ? 'left-[2px] translate-x-[24px]' : 'left-[3px] translate-x-0'}`} />
                </button>
              </div>

            </div>
          </div>
        </section>

      </main>
      
      <BottomNav />
    </div>
  );
}
