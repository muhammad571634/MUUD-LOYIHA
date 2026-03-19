"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ShareCardPage() {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000); // Reset after 2s
  };

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] z-50 flex flex-col items-center justify-between py-[max(env(safe-area-inset-top),32px)] px-5 animate-in fade-in duration-300">
      
      {/* Top Navigation */}
      <div className="w-full max-w-sm flex justify-between items-center z-10 pt-4">
        <button 
          onClick={() => router.back()} 
          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <span className="text-white/60 font-black tracking-[0.2em] text-xs uppercase">Share Mood</span>
        <div className="w-10 h-10" /> {/* Transparent spacer for centering */}
      </div>

      {/* The 9:16 Aspect Ratio Export Card */}
      <div className="w-full max-w-[340px] aspect-[9/16] rounded-[40px] bg-gradient-to-b from-[#FFF0F5] to-white relative overflow-hidden shadow-[0_0_80px_rgba(212,83,126,0.15)] flex flex-col items-center py-10 px-6 animate-in zoom-in-95 duration-500 ease-out-expo">
        
        {/* Grain Texture Overlay (Subtle) */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" 
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }} 
        />
        
        {/* Timestamp */}
        <div className="text-[#D4537E]/60 text-[10px] font-bold uppercase tracking-[0.25em] mb-auto z-10">
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>

        {/* Core Emotion UI */}
        <div className="flex flex-col items-center w-full my-auto z-10">
          {/* Subtle Pink Glow Behind Emoji */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-[#D4537E]/10 rounded-full blur-[40px] pointer-events-none" />
          
          <span className="text-[120px] leading-none drop-shadow-xl animate-[pulse_4s_ease-in-out_infinite]">
            😔
          </span>
          <h2 className="text-[32px] font-black tracking-tight text-[#0F172A] mt-5 mb-1 text-center leading-none">
            Feeling low
          </h2>
          <p className="text-[15px] font-semibold text-[#64748B] text-center leading-relaxed max-w-[80%] opacity-80 mt-2">
            "Rainy days always get to me."
          </p>
        </div>

        {/* Minimalist Watermark */}
        <div className="mt-auto flex flex-col items-center gap-2 z-10">
          <div className="flex items-center gap-1.5 opacity-90">
            <span className="text-[11px] font-black text-[#D4537E] tracking-[0.25em] uppercase">MoodPulse</span>
            <div className="w-1 h-1 rounded-full bg-[#D4537E]/40" />
            <span className="text-[11px] font-bold text-gray-400">@alex_walker</span>
          </div>
        </div>
      </div>

      {/* Sharing Actions */}
      <div className="w-full max-w-sm space-y-3 z-10 pb-6">
        <button 
          className="w-full h-[64px] rounded-[24px] bg-gradient-to-r from-[#D4537E] to-[#E8719A] text-white font-bold text-[17px] shadow-lg shadow-[#D4537E]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 overflow-hidden relative group"
        >
          {/* Button Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
          <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <rect x="2" y="2" width="20" height="20" rx="6" ry="6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={3} strokeLinecap="round" />
          </svg>
          Share to Instagram
        </button>

        <button 
          onClick={handleSave}
          className={`w-full h-[64px] rounded-[24px] bg-white/10 hover:bg-white/15 text-white font-bold text-[17px] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 backdrop-blur-md border border-white/5 ${isSaved ? 'text-[#00E572] bg-[#00E572]/10 border-[#00E572]/30' : ''}`}
        >
          {isSaved ? (
            <>
              <svg className="w-[22px] h-[22px] text-[#00E572]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Saved to Photos!
            </>
          ) : (
            <>
              <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Save Image
            </>
          )}
        </button>
      </div>
      
    </div>
  );
}
