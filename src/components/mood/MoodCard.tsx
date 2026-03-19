"use client";

import { useState } from "react";
import { MoodEntry, getTimeAgo, REACTION_EMOJIS } from "@/lib/mood-data";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { sounds } from "@/lib/sounds";
import { triggerHaptic } from "@/lib/haptics";

interface MoodCardProps {
  entry: MoodEntry;
}

interface Particle {
  id: number;
  emoji: string;
  x: number;
}

export default function MoodCard({ entry }: MoodCardProps) {
  // Try to match the soft tint circle colors.
  let avatarBg = "bg-[#FFF9C4]"; // yellow default
  if (entry.score < 5) avatarBg = "bg-[#F8D2DD]"; // pinkish
  if (entry.score === 5) avatarBg = "bg-[#E3F2FD]"; // blueish

  const { user } = useAuth();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [localReactions, setLocalReactions] = useState<{emoji: string, count: number}[]>(entry.reactions || []);

  const addReaction = async (emoji: string) => {
    // Animatsiya va UI effekti darhol ko'rsatiladi (Optimistic UI)
    triggerHaptic("medium");
    sounds.playPop();

    const newParticle = { id: Date.now(), emoji, x: Math.random() * 24 - 12 };
    setParticles(prev => [...prev, newParticle]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1200);

    setLocalReactions(prev => {
      const existing = prev.find(r => r.emoji === emoji);
      if (existing) {
        return prev.map(r => r.emoji === emoji ? { ...r, count: r.count + 1 } : r);
      }
      return [...prev, { emoji, count: 1 }];
    });
    
    setTimeout(() => setShowReactionPicker(false), 200);

    // Bazaga yuborilganda xato bo'lsa uni tekshirish
    if (!user) return;
    try {
      await supabase.from("reactions").insert({
        sender_id: user.id,
        mood_entry_id: entry.id,
        reaction_emoji: emoji
      });
    } catch (e) {
      console.error("Reaksiya saqlanmadi:", e);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1C1C2A] rounded-[24px] p-4 shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-between gap-3 transition-colors hover:shadow-md cursor-pointer relative overflow-visible">
      {/* Avatar inside colored circle */}
      <div className={`w-12 h-12 rounded-full ${avatarBg} dark:bg-[#D4537E]/20 flex items-center justify-center flex-shrink-0 transition-transform active:scale-95`}>
        <span className="text-[24px] block translate-y-px">{entry.emoji}</span>
      </div>

      {/* Middle Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center translate-y-px">
        <div className="flex items-center justify-between mb-0.5">
          <h3 className="text-[13px] font-bold text-[#0F172A] dark:text-white truncate pr-2 tracking-tight">
            {entry.userName}
          </h3>
          <span className="text-[11px] font-medium text-[#94A3B8] flex-shrink-0">
            {getTimeAgo(entry.createdAt)}
          </span>
        </div>
        <p className="text-[12.5px] text-[#64748B] dark:text-gray-400 truncate tracking-tight pr-2">
          {entry.textNote || "Just checked in"}
        </p>
      </div>

      {/* Reactions Interactive Menu */}
      <div className="flex items-center gap-1.5 flex-shrink-0 ml-1 relative">
        {localReactions.slice(0, 2).map((reaction, i) => (
          <button 
            key={i} 
            onClick={(e) => { e.stopPropagation(); addReaction(reaction.emoji); }}
            className="flex items-center bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 px-2.5 py-1.5 rounded-full animate-in fade-in zoom-in hover:scale-110 active:scale-95 transition-all relative z-20"
          >
            <span className="text-[12px] mr-1 leading-none block translate-y-[0.5px]">{reaction.emoji}</span>
            <span className="text-[10px] font-bold text-[#64748B] dark:text-gray-400 leading-none">{reaction.count}</span>
          </button>
        ))}

        {/* Reaction Add Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); setShowReactionPicker(!showReactionPicker); }}
          className="w-[28px] h-[28px] rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white transition-colors relative z-20 active:scale-90"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* Floating Reaction Popover */}
        {showReactionPicker && (
          <div 
            className="absolute right-0 top-10 bg-white dark:bg-[#1C1C2A] rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.15)] dark:shadow-none border border-gray-100 dark:border-white/10 px-3.5 py-2.5 flex items-center gap-3 animate-in zoom-in-95 slide-in-from-top-3 duration-200 z-30"
            onClick={(e) => e.stopPropagation()} // prevent closing parent triggers
          >
            <div className="absolute -top-[5px] right-[10px] w-3 h-3 bg-white dark:bg-[#1C1C2A] border-t border-l border-gray-100 dark:border-white/10 rotate-45 z-0" />
            {REACTION_EMOJIS.map(emoji => (
              <button 
                key={emoji}
                onClick={() => addReaction(emoji)}
                className="text-[20px] hover:scale-125 active:scale-90 transform transition-transform relative z-10"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Floating Particles Overlay */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute right-12 bottom-6 pointer-events-none z-50 mix-blend-normal"
          style={{ transform: `translateX(${p.x}px)` }}
        >
          <div className="text-[26px] animate-float-up drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
            {p.emoji}
          </div>
        </div>
      ))}
      
    </div>
  );
}
