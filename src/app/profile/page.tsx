"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/lib/theme-context";
import { useAuth } from "@/lib/auth-context";
import BottomNav from "@/components/layout/BottomNav";

const SOCIAL_LINKS = [
  { name: "Instagram", icon: "instagram", color: "#E1306C" },
  { name: "Twitter", icon: "twitter", color: "#000000" },
  { name: "TikTok", icon: "tiktok", color: "#000000" },
  { name: "Snapchat", icon: "snapchat", color: "#FFFC00" },
  { name: "Facebook", icon: "facebook", color: "#1877F2" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || "Alex Rivera");
  const [email, setEmail] = useState(user?.email || "alex@example.com");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F8] to-white dark:from-[#0a0a0a] dark:to-[#141414] transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => router.back()}
            className="p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="text-base font-semibold text-foreground">Profile</h1>
          <button className="p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 008.43 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 8.43a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto pb-28 px-5">
        {/* Profile Avatar + Info */}
        <section className="flex flex-col items-center pt-8 pb-6">
          {/* Avatar with sparkles */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFD700]/30 via-[#FFF3B0]/40 to-[#FFE066]/30 dark:from-[#FFD700]/20 dark:via-[#FFF3B0]/15 dark:to-[#FFE066]/15 flex items-center justify-center">
              <span className="text-5xl">✨</span>
            </div>
            {/* Sparkle decorations */}
            <div className="absolute -top-2 -right-1 text-lg animate-pulse">✨</div>
            <div className="absolute -top-1 left-0 text-sm animate-pulse delay-300">⭐</div>
            <div className="absolute bottom-0 -right-3 text-sm animate-pulse delay-700">✨</div>
          </div>

          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => router.push('/profile/edit')}>
            <h2 className="text-lg font-bold text-foreground">@alexrivera</h2>
            <button className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center transition-colors group-hover:bg-[#D4537E] group-hover:text-white text-muted-foreground">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-1.5 max-w-[260px] leading-relaxed">
            Spreading good vibes and staying consistent with daily pulses. ✨
          </p>
          <div className="flex items-center gap-1.5 mt-2.5">
            <span className="text-xs">📅</span>
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Joined Jan 2024
            </span>
          </div>
        </section>

        {/* Stats Row (Static) */}
        <section className="grid grid-cols-2 gap-3 pb-3">
          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-4 text-center shadow-sm border border-border/30 transition-colors duration-500">
            <p className="text-3xl font-black text-[#D4537E]">7</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mt-1">
              Day Streak
            </p>
          </div>
          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-4 text-center shadow-sm border border-border/30 transition-colors duration-500">
            <p className="text-3xl font-black text-foreground">1,280</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mt-1">
              Total Pulses
            </p>
          </div>
        </section>

        {/* Modern Stats Access Button */}
        <section className="pb-6">
          <button
            onClick={() => router.push('/stats')}
            className="w-full flex items-center justify-between bg-white dark:bg-[#1a1a2e] rounded-3xl p-4 shadow-sm border border-border/30 hover:shadow-md hover:border-[#D4537E]/30 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] group overflow-hidden relative"
          >
            {/* Background glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4537E]/0 via-[#D4537E]/5 to-[#D4537E]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

            <div className="flex items-center gap-4 relative z-10">
              {/* Icon Box */}
              <div className="w-12 h-12 rounded-2xl bg-[#FFF5F8] dark:bg-[#2a1e28] flex items-center justify-center border border-[#D4537E]/20 text-[#D4537E] group-hover:scale-105 transition-transform duration-300">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="M18 9l-5 5-3-3-4 4" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-[15px] font-bold text-foreground transition-colors group-hover:text-[#D4537E]">Personal Statistics</h3>
                <p className="text-[11px] font-semibold text-muted-foreground mt-0.5 tracking-wide">
                  Deep dive into your 7-day mood history
                </p>
              </div>
            </div>
            
            {/* Right Arrow / Action indicator */}
            <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-black/20 flex items-center justify-center text-muted-foreground group-hover:bg-[#D4537E] group-hover:text-white transition-colors duration-300 relative z-10 shadow-sm">
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </button>
        </section>

        {/* Upgrade Banner */}
        <section className="pb-6">
          <div onClick={() => router.push('/plus')} className="bg-white dark:bg-[#1a1a2e] rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm border border-border/30 transition-colors duration-500 cursor-pointer group hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground group-hover:text-[#D4537E] transition-colors">Upgrade to Plus</span>
                  <span className="bg-gradient-to-r from-[#D4537E] to-[#E8719A] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Pro
                  </span>
                </div>
                <span className="text-xs text-muted-foreground mt-0.5">
                  Unlock deeper insights & themes.
                </span>
              </div>
            </div>
            <button className="bg-gradient-to-r from-[#D4537E] to-[#E8719A] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md shadow-[#D4537E]/25 hover:shadow-lg hover:shadow-[#D4537E]/35 transition-all duration-200 hover:scale-105 active:scale-95">
              Upgrade
            </button>
          </div>
        </section>

        {/* Connect & Share */}
        <section className="pb-6">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-3 px-1">
            Connect & Share
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {SOCIAL_LINKS.slice(0, 4).map((social) => (
              <button
                key={social.name}
                className="flex items-center gap-2.5 bg-white dark:bg-[#1a1a2e] rounded-xl px-4 py-3 shadow-sm border border-border/30 hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <SocialIcon name={social.icon} color={social.color} />
                <span className="text-sm font-semibold text-foreground">{social.name}</span>
              </button>
            ))}
            {/* Facebook alone on last row */}
            <button className="flex items-center gap-2.5 bg-white dark:bg-[#1a1a2e] rounded-xl px-4 py-3 shadow-sm border border-border/30 hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              <SocialIcon name="facebook" color="#1877F2" />
              <span className="text-sm font-semibold text-foreground">Facebook</span>
            </button>
          </div>
        </section>

        {/* Mood Card Template */}
        <section className="pb-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.15em]">
              Mood Card Template
            </h3>
            <button className="text-xs font-bold text-[#D4537E] hover:text-[#C04570] transition-colors">
              Edit →
            </button>
          </div>

          {/* Card Preview */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-gradient-to-br from-[#7C6BF0] via-[#9B8CF5] to-[#D4537E] p-6 pb-5 relative">
              {/* Decorative blob */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />

              {/* Top row */}
              <div className="flex items-start justify-between relative z-10 mb-8">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-lg">😌</span>
                </div>
                <span className="text-[9px] font-bold text-white/70 uppercase tracking-[0.15em] bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  Pulse Today
                </span>
              </div>

              {/* Quote */}
              <p className="text-white text-lg font-bold leading-snug relative z-10 mb-4">
                Finding balance<br />in the noise.
              </p>

              {/* Footer */}
              <div className="flex items-end justify-between relative z-10">
                <div>
                  <p className="text-white text-sm font-bold">Alex Rivera</p>
                  <p className="text-white/60 text-xs">Nov 24, 2024</p>
                </div>
                <button className="w-9 h-9 rounded-full bg-[#4CAF50] flex items-center justify-center shadow-md shadow-green-500/30">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08261 9.17111C7.54305 8.46099 6.67767 8 5.7 8C4.20883 8 3 9.20883 3 10.7C3 12.1912 4.20883 13.4 5.7 13.4C6.67767 13.4 7.54305 12.939 8.08261 12.2289L15.0227 16.0294C15.0077 16.1508 15 16.2745 15 16.4C15 18.0569 16.3431 19.4 18 19.4C19.6569 19.4 21 18.0569 21 16.4C21 14.7431 19.6569 13.4 18 13.4C17.0223 13.4 16.157 13.861 15.6174 14.5711L8.67739 10.7706C8.69234 10.6492 8.7 10.5255 8.7 10.4C8.7 10.2745 8.69234 10.1508 8.67739 10.0294L15.6174 6.22889C16.157 6.93901 17.0223 7.4 18 7.4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Settings */}
        <section className="pb-6">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-4 px-1">
            Settings
          </h3>

          <div className="space-y-4">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between bg-white dark:bg-[#1a1a2e] rounded-2xl px-5 py-4 shadow-sm border border-border/30 transition-colors duration-500">
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-0.5">
                  Appearance
                </p>
                <p className="text-sm font-semibold text-foreground">Dark Mode</p>
              </div>
              <div className="flex items-center gap-2.5">
                {/* Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`relative w-[52px] h-[30px] rounded-full transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-[#6B5CA5] to-[#8B6CF0]"
                      : "bg-gray-200 dark:bg-gray-600"
                  }`}
                  role="switch"
                  aria-checked={theme === "dark"}
                  id="dark-mode-toggle"
                >
                  <div
                    className={`absolute top-[3px] w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center ${
                      theme === "dark" ? "left-[23px]" : "left-[3px]"
                    }`}
                  >
                    <span className="text-xs">
                      {theme === "dark" ? "🌙" : "☀️"}
                    </span>
                  </div>
                </button>
                {/* Moon icon */}
                <span className="text-lg">🌙</span>
              </div>
            </div>

            {/* Full Name */}
            <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl px-5 py-4 shadow-sm border border-border/30 transition-colors duration-500">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-1.5">
                Full Name
              </p>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="text-sm font-semibold text-foreground bg-transparent w-full outline-none border-b border-transparent focus:border-[#D4537E]/30 transition-colors pb-0.5"
              />
            </div>

            {/* Email */}
            <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl px-5 py-4 shadow-sm border border-border/30 transition-colors duration-500">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-1.5">
                Email Address
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm font-semibold text-foreground bg-transparent w-full outline-none border-b border-transparent focus:border-[#D4537E]/30 transition-colors pb-0.5"
              />
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="pb-6">
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-4 px-1">
            Preferences
          </h3>

          <div className="space-y-2">
            {/* Privacy & Data */}
            <button onClick={() => router.push('/privacy')} className="w-full flex items-center gap-3.5 bg-white dark:bg-[#1a1a2e] rounded-2xl px-5 py-4 shadow-sm border border-border/30 hover:shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]">
              <div className="w-10 h-10 rounded-xl bg-[#E8F0FE] dark:bg-[#1e2a4a] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#4285F4]" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-foreground flex-1 text-left">Privacy & Data</span>
              <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Notifications */}
            <button onClick={() => router.push('/notifications')} className="w-full flex items-center gap-3.5 bg-white dark:bg-[#1a1a2e] rounded-2xl px-5 py-4 shadow-sm border border-border/30 hover:shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]">
              <div className="w-10 h-10 rounded-xl bg-[#FFF3E0] dark:bg-[#3a2a1a] flex items-center justify-center">
                <span className="text-xl">🔔</span>
              </div>
              <span className="text-sm font-semibold text-foreground flex-1 text-left">Notifications</span>
              <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Sign Out */}
            <button 
              onClick={signOut}
              className="w-full flex items-center gap-3.5 bg-white dark:bg-[#1a1a2e] rounded-2xl px-5 py-4 shadow-sm border border-border/30 hover:shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]">
              <div className="w-10 h-10 rounded-xl bg-[#FFEBEE] dark:bg-[#3a1a1a] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#E53935]" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-bold text-[#E53935] flex-1 text-left">Sign Out</span>
            </button>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

/* ---- Social Icon Sub-Component ---- */
function SocialIcon({ name, color }: { name: string; color: string }) {
  switch (name) {
    case "instagram":
      return (
        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}>
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </div>
      );
    case "twitter":
      return (
        <div className="w-7 h-7 rounded-full bg-black dark:bg-white flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white dark:text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      );
    case "tiktok":
      return (
        <div className="w-7 h-7 rounded-full bg-black dark:bg-white flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white dark:text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.88a8.26 8.26 0 004.77 1.51V6.94a4.85 4.85 0 01-1-.25z" />
          </svg>
        </div>
      );
    case "snapchat":
      return (
        <div className="w-7 h-7 rounded-full bg-[#FFFC00] flex items-center justify-center">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12.979-.263.128-.06.265-.09.399-.09a.73.73 0 01.6.3.75.75 0 01.07.72c-.149.36-.51.74-1.439.886-.03.005-.06.01-.083.015a.28.28 0 00-.12.06.27.27 0 00-.06.18c.03.413.248 1.06.897 1.725.648.66 1.529 1.08 2.629 1.26a.301.301 0 01.24.3c0 .09-.03.165-.09.225-.27.315-.861.495-1.757.54-.09.004-.18.16-.27.484-.06.21-.12.39-.18.555l-.03.06c-.06.111-.12.21-.21.3-.12.12-.3.18-.48.18a2.025 2.025 0 01-.42-.06c-.18-.045-.39-.075-.63-.075-.3 0-.63.06-1.005.18-.405.135-.795.39-1.17.69-.639.51-1.319 1.035-2.64 1.035h-.12c-1.32 0-2.01-.525-2.64-1.035-.375-.3-.765-.555-1.17-.69-.375-.12-.705-.18-1.005-.18-.24 0-.45.03-.63.075a2.025 2.025 0 01-.42.06.585.585 0 01-.48-.18c-.09-.09-.15-.189-.21-.3l-.03-.06c-.06-.165-.12-.345-.18-.555-.09-.324-.18-.48-.27-.484-.896-.045-1.486-.225-1.757-.54a.3.3 0 01-.09-.225.301.301 0 01.24-.3c1.1-.18 1.98-.6 2.629-1.26.649-.665.867-1.312.897-1.725a.27.27 0 00-.06-.18.28.28 0 00-.12-.06c-.03-.005-.054-.01-.084-.015-.93-.146-1.29-.526-1.44-.886a.75.75 0 01.07-.72.73.73 0 01.6-.3c.135 0 .27.03.399.09.32.143.68.247.979.263.198 0 .326-.045.4-.09-.007-.165-.017-.33-.03-.51l-.002-.06c-.104-1.628-.23-3.654.299-4.847C7.86 1.069 11.216.793 12.206.793z" />
          </svg>
        </div>
      );
    case "facebook":
      return (
        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </div>
      );
    default:
      return null;
  }
}
