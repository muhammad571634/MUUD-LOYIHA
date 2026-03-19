"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { triggerHaptic } from "@/lib/haptics";
import { sounds } from "@/lib/sounds";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { Skeleton } from "@/components/ui/skeleton";

const REACTIONS = ["💙", "❤️", "🤗", "🎉", "😮"];

export default function StoryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  
  const [message, setMessage] = useState("");
  const [story, setStory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasReacted, setHasReacted] = useState(false);

  useEffect(() => {
    async function loadStory() {
      if (!params.id) return;
      try {
        const { data, error } = await supabase
          .from("mood_entries")
          .select("*, users(username, display_name)")
          .eq("id", params.id)
          .single();
          
        if (error) throw error;
        setStory(data);
      } catch (e) {
        console.error("Error loading story:", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadStory();
  }, [params.id]);

  // Oddiy "Time ago" hisoblash funksiyasi
  const getTimeAgo = (dateStr: string) => {
    const minDiff = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 60000);
    if (minDiff < 60) return `${minDiff}m ago`;
    const hrDiff = Math.floor(minDiff / 60);
    if (hrDiff < 24) return `${hrDiff}h ago`;
    return `${Math.floor(hrDiff / 24)}d ago`;
  };

  const handleReaction = async (emoji: string) => {
    if (!user || !story || hasReacted) return;
    
    triggerHaptic("medium");
    sounds.playPop();
    setHasReacted(true);

    try {
      await supabase.from("reactions").insert({
        mood_entry_id: story.id,
        user_id: user.id,
        reaction_emoji: emoji
      });
    } catch (e) {
      console.error(e);
      setHasReacted(false); // agar xato bo'lsa qaytaramiz
    }
  };

  const submitComment = async () => {
    if (!message.trim() || !user || !story) return;
    triggerHaptic("success");
    sounds.playSuccess();
    
    try {
      // Izoh qoldirish - hamma Reaksiya xisoblanadi "📝" yoki oddiy izoh matni bazaga yoziladi
      await supabase.from("reactions").insert({
        mood_entry_id: story.id,
        user_id: user.id,
        reaction_emoji: "💬" // Hozircha komentni alohida ajratmadik, oddiy namuna
      });
      setMessage("");
    } catch (e) {
      console.error("Error sending comment", e);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4537E]"></div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex items-center justify-center p-6 text-center text-white">
        <div>
           <h2 className="text-xl font-bold mb-4">Story Not Found or Expired</h2>
           <button onClick={() => router.back()} className="px-6 py-2 bg-white/10 rounded-full">Go Back</button>
        </div>
      </div>
    );
  }

  const isMe = user?.id === story.user_id;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#FEFBEA] via-[#FEF3D6] to-[#FDE7BE] dark:from-[#3a2f1c] dark:via-[#261d0f] dark:to-[#140e04] flex flex-col transition-colors duration-500 animate-in slide-in-from-bottom duration-300">
      
      {/* Top Action Bar */}
      <div className="pt-12 px-5 pb-4">
        {/* Progress Bars (Static Design, could be animated later) */}
        <div className="flex gap-1.5 mb-6">
          <div className="h-1 bg-white dark:bg-white/80 rounded-full flex-1 origin-left animate-[scale-x_5s_linear_forwards]" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 shadow-sm">
              <div className="w-full h-full bg-gradient-to-br from-[#FFD1B3] to-[#FFAB73] flex items-center justify-center">
                <span className="text-xl">🧑</span>
              </div>
            </div>
            {/* Name/Time */}
            <div className="flex flex-col">
              <span className="text-white dark:text-white/90 font-bold text-base shadow-sm drop-shadow-md">
                {isMe ? "You" : story.users?.display_name || story.users?.username || "Unknown"}
              </span>
              <span className="text-white/80 dark:text-white/60 text-xs font-medium drop-shadow-md">
                {getTimeAgo(story.created_at)}
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button 
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20 active:scale-95"
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-10">
        
        {/* Floating Emoji */}
        <div className="text-[140px] leading-none mb-2 drop-shadow-2xl animate-[bounce_4s_infinite] select-none">
          {story.emoji}
        </div>

        {/* Story Card */}
        <div className="bg-white/95 dark:bg-[#1C1814]/95 backdrop-blur-xl w-full rounded-[2.5rem] p-8 shadow-2xl border border-white/40 dark:border-white/5 text-center transition-colors duration-500 animate-in zoom-in-95 duration-500">
          
          <div className="bg-[#D4537E]/10 dark:bg-[#D4537E]/20 text-[#D4537E] dark:text-[#E6A1B2] px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] inline-block mb-3 border border-[#D4537E]/20">
            Intensity {story.score}/10
          </div>
          
          <h2 className="text-[#1A202C] dark:text-white text-[24px] font-black tracking-tight mb-4 drop-shadow-sm capitalize">
            {story.emoji_name || "Feeling Something"}
          </h2>
          
          <p className="text-[#4A5568] dark:text-gray-300 text-[18px] leading-relaxed italic font-serif px-2">
            {story.text_note ? `"${story.text_note}"` : "..."}
          </p>
        </div>
      </div>

      {/* Bottom Actions - only if not me */}
      {!isMe && (
        <div className="px-5 pb-8 pt-4 flex flex-col gap-4">
          {/* Reactions Container */}
          <div className={`bg-white/95 dark:bg-[#2A241E]/95 backdrop-blur-lg h-[68px] rounded-[2rem] shadow-lg border border-white/50 dark:border-white/5 flex items-center justify-between px-6 transition-colors duration-500 ${hasReacted ? 'opacity-50 pointer-events-none' : ''}`}>
            {REACTIONS.map((emoji, i) => (
              <button 
                key={i} 
                onClick={() => handleReaction(emoji)}
                className="text-3xl hover:scale-125 hover:-translate-y-2 transition-all duration-300 active:scale-95"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Input Row */}
          <div className="flex items-center gap-3">
            {/* Input field */}
            <div className={`flex-1 bg-white/95 dark:bg-[#2A241E]/95 backdrop-blur-lg h-14 rounded-full shadow-lg border border-white/50 dark:border-white/5 flex items-center px-5 transition-colors duration-500`}>
              <input 
                type="text" 
                placeholder="Send encouragement..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent outline-none text-[15px] font-medium text-foreground placeholder:text-muted-foreground/60"
              />
            </div>
            {/* Send Button */}
            <button 
              onClick={submitComment}
              className="w-14 h-14 flex-shrink-0 bg-white/90 dark:bg-[#D4537E] backdrop-blur-lg rounded-full shadow-lg border border-white/50 dark:border-[#D4537E] flex items-center justify-center transition-colors duration-500 hover:scale-105 active:scale-95"
              disabled={!message.trim()}
            >
              <svg 
                className={`w-6 h-6 transition-colors ${message.trim() ? "text-[#1A202C] dark:text-white" : "text-muted-foreground/40 dark:text-white/40"}`} 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
