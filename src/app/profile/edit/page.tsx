"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();
  
  const [displayName, setDisplayName] = useState("Sarah Mitchell");
  const [username, setUsername] = useState("@sarahpulse");
  const [bio, setBio] = useState(
    "Capturing moods and chasing pulses. ✨ Coffee enthusiast and digital creator based in NYC."
  );
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    // Save logic would go here
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Optionally router.back() here after saving
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 h-14">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <h1 className="text-base font-bold text-foreground">Edit Profile</h1>
          
          <button 
            onClick={handleSave}
            className="text-[#D4537E] font-bold text-[15px] p-2 -mr-2 hover:opacity-80 transition-opacity"
          >
            Save
          </button>
        </div>
      </header>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-[70px] left-1/2 -translate-x-1/2 z-50 bg-[#00C48C] text-white px-5 py-2.5 rounded-full shadow-lg shadow-[#00C48C]/20 flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <span className="text-[13px] font-semibold tracking-wide">Profile updated</span>
        </div>
      )}

      <main className="max-w-md mx-auto pb-20 px-5">
        {/* Profile Photo Area */}
        <div className="flex flex-col items-center pt-8 pb-8">
          <div className="relative mb-3 group cursor-pointer">
            {/* Avatar Circle */}
            <div className="w-[104px] h-[104px] rounded-full bg-[#B38B7D] ring-4 ring-white dark:ring-[#0a0a0a] shadow-sm flex items-end justify-center overflow-hidden">
              <span className="text-7xl -mb-2">👩🏽</span>
            </div>
            
            {/* Camera Icon Badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white dark:bg-[#2a2a2a] rounded-md px-1.5 py-1 shadow-md border border-gray-100 dark:border-gray-800">
              <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h3l2-2h6l2 2h3a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm8 13a5 5 0 100-10 5 5 0 000 10zm0-2a3 3 0 110-6 3 3 0 010 6z" />
              </svg>
            </div>
          </div>
          
          <button className="text-[#D4537E] text-sm font-semibold hover:opacity-80 transition-opacity mt-2">
            Change Profile Photo
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Display Name */}
          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2 pl-1">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-[#F9FAFB] dark:bg-[#1a1a2e] border-0 rounded-2xl px-5 py-4 text-[15px] text-foreground font-medium outline-none transition-all focus:ring-2 focus:ring-[#D4537E]/20"
            />
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2 pl-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#F9FAFB] dark:bg-[#1a1a2e] border-0 rounded-2xl px-5 py-4 text-[15px] text-foreground font-medium outline-none transition-all focus:ring-2 focus:ring-[#D4537E]/20"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col">
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2 pl-1">
              Bio
            </label>
            <div className="relative">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={150}
                className="w-full bg-[#F9FAFB] dark:bg-[#1a1a2e] border-0 rounded-2xl px-5 py-4 pb-10 text-[15px] text-foreground font-medium resize-none h-32 outline-none transition-all focus:ring-2 focus:ring-[#D4537E]/20"
              />
              <span className="absolute bottom-3 right-5 text-[10px] font-bold text-muted-foreground">
                {bio.length}/150
              </span>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="mt-8 pt-4">
          <button className="w-full flex items-center justify-between py-4 border-b border-border/40 group active:opacity-70 transition-opacity">
            <span className="text-[15px] font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
              Personal Information Settings
            </span>
            <svg className="w-4 h-4 text-muted-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <button className="w-full flex items-center justify-between py-4 border-b border-border/40 group active:opacity-70 transition-opacity">
            <span className="text-[15px] font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
              Links
            </span>
            <svg className="w-4 h-4 text-muted-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
