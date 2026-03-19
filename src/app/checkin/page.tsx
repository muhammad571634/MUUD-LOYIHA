"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { triggerHaptic } from "@/lib/haptics";
import { sounds } from "@/lib/sounds";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

const MOOD_OPTIONS = [
  { emoji: "🤩", label: "Excited", score: 10, bgColor: "bg-[#FFF4D2]", activeRing: "ring-[#FFCA28]" },
  { emoji: "🥳", label: "Party", score: 9, bgColor: "bg-[#FFF4D2]", activeRing: "ring-[#FFCA28]" },
  { emoji: "🥰", label: "Loved", score: 9, bgColor: "bg-[#FCE4EC]", activeRing: "ring-[#F48FB1]" },
  { emoji: "😄", label: "Happy", score: 8, bgColor: "bg-[#FFFFE0]", activeRing: "ring-[#FFEA00]" },
  { emoji: "😊", label: "Content", score: 7, bgColor: "bg-[#E8F5E9]", activeRing: "ring-[#81C784]" },
  { emoji: "🙂", label: "Okay", score: 6, bgColor: "bg-[#E8F5E9]", activeRing: "ring-[#81C784]" },
  { emoji: "😐", label: "Neutral", score: 5, bgColor: "bg-[#F5F5F5]", activeRing: "ring-[#E0E0E0]" },
  { emoji: "😰", label: "Anxious", score: 4, bgColor: "bg-[#E3F2FD]", activeRing: "ring-[#90CAF9]" },
  { emoji: "😤", label: "Annoyed", score: 4, bgColor: "bg-[#FBE9E7]", activeRing: "ring-[#FFAB91]" },
  { emoji: "😔", label: "Low", score: 3, bgColor: "bg-[#FCE4EC]", activeRing: "ring-[#F48FB1]" },
  { emoji: "😴", label: "Tired", score: 3, bgColor: "bg-[#EDE7F6]", activeRing: "ring-[#B39DDB]" },
  { emoji: "😢", label: "Sad", score: 2, bgColor: "bg-[#E3F2FD]", activeRing: "ring-[#90CAF9]" },
];

export default function CheckInPage() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<number | null>(0);
  const [score, setScore] = useState(10);
  const [note, setNote] = useState("");
  const [visibility, setVisibility] = useState<"public" | "friends" | "private">("friends");

  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async () => {
    if (selectedMood === null || !user) return;
    setIsSubmitting(true);
    setError(null);

    const moodDetails = MOOD_OPTIONS[selectedMood];

    try {
      const { error: insertError } = await supabase
        .from("mood_entries")
        .insert({
          user_id: user.id,
          emoji: moodDetails.emoji,
          emoji_name: moodDetails.label,
          score,
          text_note: note.trim() ? note.trim() : null,
          visibility,
        });

      if (insertError) throw insertError;

      triggerHaptic("success");
      sounds.playSuccess();
      router.push("/");
    } catch (err: any) {
      console.error("Supabase Error detailing:", err);
      // To'g'rilangan aniq xato xavfni o'qish yo'li
      const detailError = err?.message || err?.details || err?.hint || JSON.stringify(err);
      setError(`Xatolik: ${detailError}`);
      setIsSubmitting(false);
      triggerHaptic("heavy");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex flex-col justify-end animate-in fade-in duration-300">
      
      {/* Overlay top area for closing */}
      <div className="flex-1 w-full cursor-pointer" onClick={() => router.back()} />

      {/* Bottom Sheet */}
      <div className="w-full max-w-[440px] mx-auto bg-white dark:bg-[#0a0a0a] rounded-t-[36px] max-h-[92vh] overflow-y-auto px-6 pt-4 shadow-[0_-20px_60px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom-[100%] duration-500 ease-out-expo flex flex-col hide-scrollbar">
        
        {/* Drag Handle */}
        <div className="flex justify-center mb-6 pt-1 sticky top-0 z-10 bg-white dark:bg-[#0a0a0a]">
          <div className="w-12 h-1.5 rounded-full bg-gray-200 dark:bg-white/10" />
        </div>

        {/* Title */}
        <h1 className="text-[26px] font-black text-[#0F172A] dark:text-white tracking-tight text-center">
          How are you, really?
        </h1>
        <p className="text-[14px] font-medium text-[#64748B] dark:text-gray-400 text-center mt-1.5 mb-6">
          Your daily emotional check-in.
        </p>

        {error && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-2xl text-center text-sm font-medium">
            {error}
          </div>
        )}

        {/* Emoji Grid (12 items) */}
        <div className="grid grid-cols-4 gap-2 mb-8 px-1">
          {MOOD_OPTIONS.map((mood, index) => {
            const isActive = selectedMood === index;
            return (
              <button
                key={mood.label}
                onClick={() => {
                  triggerHaptic("light");
                  sounds.playPop();
                  setSelectedMood(index);
                  if (isActive) return; // don't reset score if clicking same
                  setScore(mood.score);
                }}
                className={`flex flex-col items-center justify-center gap-1.5 py-3 px-1 rounded-[20px] transition-all duration-300 active:scale-95 group ${
                  isActive
                    ? `${mood.bgColor} dark:bg-opacity-20 ring-2 ${mood.activeRing} shadow-sm`
                    : "bg-[#F8F9FA] dark:bg-[#1C1C2A] hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent dark:border-white/5"
                }`}
              >
                <span className="text-[38px] block drop-shadow-sm transition-transform duration-300 transform group-hover:scale-110">
                  {mood.emoji}
                </span>
                <span className={`text-[12px] font-extrabold tracking-wide ${isActive ? "text-[#0F172A] dark:text-white" : "text-[#94A3B8]"}`}>
                  {mood.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Intensity Score */}
        <div className="mb-8 px-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px] font-bold text-[#0F172A] dark:text-white">Intensity</h2>
            <div className="bg-[#FFF0F5] dark:bg-[#D4537E]/20 rounded-full px-4 py-1.5 flex items-center justify-center shadow-sm">
              <span className="text-[14px] font-black text-[#D4537E]">{score}/10</span>
            </div>
          </div>

          {/* Custom Slider */}
          <div className="relative py-4">
            <div className="relative h-2.5 rounded-full bg-[#F1F5F9] dark:bg-gray-800 overflow-visible shadow-inner">
              {/* Filled track */}
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-[#D4537E] transition-all duration-150"
                style={{ width: `${((score - 1) / 9) * 100}%` }}
              />
              {/* Thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border-[4px] border-[#D4537E] shadow-[0_4px_10px_rgba(212,83,126,0.3)] cursor-pointer transition-all duration-150"
                style={{ left: `calc(${((score - 1) / 9) * 100}% - 14px)` }}
              />
            </div>
            {/* Invisible range input for native touch interaction */}
            <input
              type="range"
              min="1"
              max="10"
              onChange={(e) => {
                const newScore = parseInt(e.target.value);
                if (newScore !== score) {
                  triggerHaptic("light");
                  sounds.playTap();
                }
                setScore(newScore);
              }}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
            />
          </div>

          <div className="flex justify-between mt-1 px-1">
            <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest">Low</span>
            <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest">High</span>
          </div>
        </div>

        {/* Note Input */}
        <div className="mb-6 px-2">
          <div className="relative">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 100))}
              placeholder="Add a note (optional)..."
              rows={3}
              className="w-full bg-white dark:bg-[#1C1C2A] border border-gray-200 dark:border-white/10 rounded-[24px] px-5 py-4 text-[15px] font-medium text-[#0F172A] dark:text-white placeholder:text-[#94A3B8] resize-none focus:outline-none focus:ring-2 focus:ring-[#D4537E]/40 transition-all shadow-sm"
            />
            <span className="absolute bottom-4 right-5 text-[11px] font-bold text-[#94A3B8]">
              {note.length}/100
            </span>
          </div>
        </div>

        {/* Visibility Toggle */}
        <div className="mb-6 px-2">
          <div className="bg-[#F8F9FA] dark:bg-[#1C1C2A] rounded-2xl p-1.5 flex gap-1 relative border border-transparent dark:border-white/5">
            {["public", "friends", "private"].map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  triggerHaptic("light");
                  setVisibility(opt as any);
                }}
                className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl text-[12px] font-bold capitalize transition-all duration-300 relative z-10 ${
                  visibility === opt
                    ? "text-[#0F172A] dark:text-[#1a1a2e]"
                    : "text-[#94A3B8] hover:text-[#64748B]"
                }`}
              >
                {opt}
              </button>
            ))}
            
            {/* Sliding Indicator */}
            <div 
              className="absolute top-1.5 bottom-1.5 w-[calc(33.333%-4px)] bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out-expo z-0"
              style={{ 
                left: visibility === "public" ? "6px" : visibility === "friends" ? "calc(33.333% + 2px)" : "calc(66.666% - 2px)" 
              }}
            />
          </div>
          <p className="text-[11px] font-medium text-center text-[#94A3B8] mt-2.5">
            {visibility === "public" && "Visible on the Global Discover map 🌍"}
            {visibility === "friends" && "Only your approved friends will see this 🤝"}
            {visibility === "private" && "Just for you. Won't appear in feeds 🔒"}
          </p>
        </div>

        {/* Submit Button (Rich Black) */}
        <div className="w-full pb-8 sticky bottom-0 bg-white dark:bg-[#0a0a0a] pt-4 z-20">
          <button
            onClick={handleComplete}
            disabled={selectedMood === null || isSubmitting}
            className="w-full h-[60px] rounded-[22px] bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A] font-bold text-[17px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center tracking-wide"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Posting...
              </span>
            ) : (
              "Post Mood"
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
