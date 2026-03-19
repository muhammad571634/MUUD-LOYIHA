"use client";

import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";

export default function NotificationsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-border/30 transition-colors duration-500">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 h-14">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <h1 className="text-base font-bold text-foreground">Notifications</h1>
          
          <button 
            onClick={() => router.push('/settings/notifications')}
            className="p-2 -mr-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto pb-28">
        
        {/* Streak Warning Banner */}
        <div className="px-5 py-4">
          <div className="bg-[#FFF4ED] dark:bg-[#2e1d15] rounded-2xl p-4 flex items-center gap-3.5 border border-[#FADCD0] dark:border-[#523326] shadow-sm transition-colors duration-500">
            {/* Flame Icon */}
            <div className="w-12 h-12 flex-shrink-0 bg-[#F9703E] rounded-full flex items-center justify-center shadow-md shadow-[#F9703E]/20">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.64,5.23c-1.32,1.55-2.11,3.46-2.11,5.5c0,4.64,3.77,8.42,8.42,8.42c1.78,0,3.43-0.56,4.78-1.5 c-3.08,1.4-6.66,0.66-8.8-1.74c-2.48-2.77-2.18-7.14,0.6-9.52c0.23-0.2,0.48-0.37,0.73-0.53C14.05,3.95,12.28,4.47,11.64,5.23z" fillOpacity="0" />
                <path d="M15.42,1.35c-2.02,1.53-3.33,3.95-3.33,6.65c0,0.85,0.13,1.67,0.37,2.44c-1.28-1.33-2.09-3.15-2.09-5.15 c0-0.74,0.11-1.45,0.31-2.12C8.01,4.52,6,7.52,6,10.96c0,4.97,4.03,9.04,9.04,9.04c2.81,0,5.32-1.3,6.96-3.35 c-1.07,0.85-2.42,1.35-3.88,1.35c-3.5,0-6.33-2.84-6.33-6.33c0-2-0.93-3.78-2.39-4.94c0.8,1.07,1.28,2.41,1.28,3.85 c0,2.15-1.07,4.05-2.7,5.24C7.07,15.1,6.5,13.62,6.5,12c0-2.61,1.29-4.92,3.27-6.35c-0.21,0.61-0.33,1.26-0.33,1.94 c0,1.46,0.51,2.8,1.35,3.86C11.55,8.96,13.12,6.33,15.42,1.35z"/>
              </svg>
            </div>
            
            <div className="flex-1">
              <h3 className="text-[#F9703E] font-bold text-[15px] mb-0.5 leading-tight">Don't lose your streak!</h3>
              <p className="text-[13px] text-[#4A3B32] dark:text-[#E6D5CC] leading-snug">
                You're on a 5-day mood tracking streak. Log your mood now to keep it going.
              </p>
            </div>
            
            <button className="bg-[#F9703E] hover:bg-[#E8602E] text-white text-[13px] font-bold px-4 py-2 rounded-full transition-colors active:scale-95 shadow-sm shadow-[#F9703E]/30">
              Log
            </button>
          </div>
        </div>

        {/* Today Section */}
        <div>
          <h2 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.15em] px-5 py-2 mt-2">
            Today
          </h2>
          
          <div className="flex flex-col">
            {/* Notification Item 1 */}
            <div className="flex items-center gap-4 px-5 py-3.5 border-b border-border/30 active:bg-gray-50 dark:active:bg-white/5 transition-colors cursor-pointer">
              {/* Avatar */}
              <div className="relative">
                <div className="w-[46px] h-[46px] rounded-full bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] border border-black/5 flex items-center justify-center overflow-hidden">
                  <span className="text-2xl mt-1">👦🏻</span>
                </div>
                {/* Badge */}
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-[#0a0a0a] rounded-full p-[2px]">
                  <div className="bg-[#E1306C] w-4 h-4 rounded-full flex items-center justify-center">
                    <span className="text-[9px] text-white leading-none">❤️</span>
                  </div>
                </div>
              </div>
              
              {/* Text */}
              <div className="flex-1 pr-2">
                <p className="text-[15px] text-foreground leading-snug">
                  <span className="font-bold">Alex</span> reacted to your mood
                </p>
                <p className="text-[13px] text-muted-foreground mt-0.5">2 minutes ago</p>
              </div>
              
              <svg className="w-4 h-4 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>

            {/* Notification Item 2 */}
            <div className="flex items-center gap-4 px-5 py-3.5 border-b border-border/30 active:bg-gray-50 dark:active:bg-white/5 transition-colors cursor-pointer">
              {/* Avatar */}
              <div className="relative">
                <div className="w-[46px] h-[46px] rounded-full bg-gradient-to-br from-[#FCE4EC] to-[#F8BBD0] border border-black/5 flex items-center justify-center overflow-hidden">
                  <span className="text-2xl mt-1">👩🏻</span>
                </div>
                {/* Badge */}
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-[#0a0a0a] rounded-full p-[2px]">
                  <div className="bg-[#FFCA28] w-4 h-4 rounded-full flex items-center justify-center">
                    <span className="text-[10px] leading-none">🥂</span>
                  </div>
                </div>
              </div>
              
              {/* Text */}
              <div className="flex-1 pr-2">
                <p className="text-[15px] text-foreground leading-snug">
                  <span className="font-bold">Jordan</span> celebrated your story
                </p>
                <p className="text-[13px] text-muted-foreground mt-0.5">1 hour ago</p>
              </div>
              
              <svg className="w-4 h-4 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Yesterday Section */}
        <div className="mt-2">
          <h2 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.15em] px-5 py-2 mt-4">
            Yesterday
          </h2>
          
          <div className="flex flex-col">
            {/* Notification Item 3 */}
            <div className="flex items-center gap-4 px-5 py-3.5 border-b border-border/30 active:bg-gray-50 dark:active:bg-white/5 transition-colors cursor-pointer">
              {/* Icon */}
              <div className="w-[46px] h-[46px] rounded-full bg-[#FFF4ED] dark:bg-[#2e1d15] flex items-center justify-center overflow-hidden flex-shrink-0">
                <span className="text-xl">🏆</span>
              </div>
              
              {/* Text */}
              <div className="flex-1 pr-2">
                <p className="text-[15px] text-foreground leading-snug">
                  You've unlocked the <span className="font-bold text-[#F9703E]">Consistent Tracker</span> badge!
                </p>
                <p className="text-[13px] text-muted-foreground mt-0.5">Yesterday, 8:45 PM</p>
              </div>
              
              <svg className="w-4 h-4 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>

            {/* Notification Item 4 */}
            <div className="flex items-center gap-4 px-5 py-3.5 border-b border-border/30 active:bg-gray-50 dark:active:bg-white/5 transition-colors cursor-pointer">
              {/* Avatar */}
              <div className="relative">
                <div className="w-[46px] h-[46px] rounded-full bg-[#8D6E63] border border-black/5 flex items-center justify-center overflow-hidden">
                  <span className="text-2xl mt-1">👨🏽‍🦱</span>
                </div>
                {/* Badge */}
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-[#0a0a0a] rounded-full p-[2px]">
                  <div className="bg-[#FFEE58] w-4 h-4 rounded-full flex items-center justify-center">
                    <span className="text-[10px] leading-none">✨</span>
                  </div>
                </div>
              </div>
              
              {/* Text */}
              <div className="flex-1 pr-2">
                <p className="text-[15px] text-foreground leading-snug">
                  <span className="font-bold">Sam</span> sent you a pulse of positive energy
                </p>
                <p className="text-[13px] text-muted-foreground mt-0.5">Yesterday, 2:10 PM</p>
              </div>
              
              <svg className="w-4 h-4 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>

      </main>
      
      {/* We can include BottomNav or rely on back button. Mockup shows a nav, let's include it. */}
      {/* But our BottomNav assumes specific tabs. We will just render it so it matches app flow. */}
      {/* Wait, the mockup bottom nav has Home | Pulse | Alerts | Profile. We'll stick to our BottomNav to be consistent with our app architecture. */}
      <BottomNav />
    </div>
  );
}
