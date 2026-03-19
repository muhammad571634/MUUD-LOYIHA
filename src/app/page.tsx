"use client";

import { useState, useEffect } from "react";
import BottomNav from "@/components/layout/BottomNav";
import StoryAvatars from "@/components/mood/StoryAvatars";
import MoodCard from "@/components/mood/MoodCard";
import StreakBanner from "@/components/mood/StreakBanner";
import { DEMO_STORIES, MoodEntry, FriendStory } from "@/lib/mood-data";
import { Skeleton } from "@/components/ui/skeleton";
import MoodCardSkeleton from "@/components/mood/MoodCardSkeleton";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [stories, setStories] = useState<FriendStory[]>([]);
  const isHomeEmpty = !isLoading && entries.length === 0;

  const getBorderColor = (score: number) => {
    if (score >= 8) return "#4CAF50"; // Green for positive
    if (score >= 5) return "#FFCA28"; // Yellow for neutral
    return "#F44336"; // Red for negative
  };

  useEffect(() => {
    if (!user) return;

    async function fetchFeed() {
      try {
        const { data, error } = await supabase
          .from("mood_entries")
          .select(`
            id, user_id, emoji, emoji_name, score, text_note, visibility, mood_category, created_at, expires_at,
            users ( username )
          `)
          .order("created_at", { ascending: false });

        if (data) {
          const formatted: MoodEntry[] = data.map((d: any) => {
            // Reaksiyalarni formatlash va guruhlash
            const rawReactions = d.reactions || [];
            const reactionMap: Record<string, number> = {};
            rawReactions.forEach((r: any) => {
              reactionMap[r.reaction_emoji] = (reactionMap[r.reaction_emoji] || 0) + 1;
            });
            const groupedReactions = Object.entries(reactionMap).map(([emoji, count]) => ({ emoji, count }));

            return {
              id: d.id,
              userId: d.user_id,
              userName: d.users?.username || "user",
              emoji: d.emoji,
              emojiName: d.emoji_name,
              score: d.score,
              textNote: d.text_note,
              visibility: d.visibility,
              moodCategory: d.mood_category,
              reactions: groupedReactions,
              createdAt: new Date(d.created_at),
              expiresAt: new Date(d.expires_at) || new Date(),
            };
          });
          setEntries(formatted);
          
          // Generate Stories from Entries
          const now = new Date().getTime();
          const twentyFourHours = 24 * 60 * 60 * 1000;
          const newStories: FriendStory[] = [];
          const seenUsers = new Set<string>();

          // Add "You" first
          const myLatest = formatted.find(e => e.userId === user!.id && (now - e.createdAt.getTime() < twentyFourHours));
          if (myLatest) {
            newStories.push({
              id: "you",
              entryId: myLatest.id,
              name: "You",
              emoji: myLatest.emoji,
              hasCheckedIn: true,
              borderColor: getBorderColor(myLatest.score)
            });
            seenUsers.add(user!.id);
          } else {
            newStories.push({
              id: "you",
              name: "You",
              emoji: "➕",
              hasCheckedIn: false,
              borderColor: "#CBD5E1"
            });
            seenUsers.add(user!.id);
          }

          // Add Friends
          formatted.forEach(entry => {
            if (!seenUsers.has(entry.userId) && (now - entry.createdAt.getTime() < twentyFourHours)) {
              newStories.push({
                id: entry.userId, // keep user id as story key
                entryId: entry.id,
                name: entry.userName,
                emoji: entry.emoji,
                hasCheckedIn: true,
                borderColor: getBorderColor(entry.score)
              });
              seenUsers.add(entry.userId);
            }
          });
          
          setStories(newStories);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeed();
  }, [user]);

  const renderFeaturedMood = () => {
    if (entries.length === 0) return null;
    const feat = entries[0];
    
    return (
      <div className="w-full bg-[#FFF0F5] dark:bg-[#D4537E]/10 rounded-[32px] p-6 relative overflow-hidden shadow-sm dark:border dark:border-white/5 mb-5 transition-colors">
        <span className="absolute top-5 right-6 text-[10px] font-bold text-[#E6A1B2] dark:text-[#D4537E]/50 tracking-widest uppercase">
          MoodPulse
        </span>
        
        <div className="flex flex-col items-center pt-2">
          <span className="text-[68px] block mb-3 drop-shadow-md transform hover:scale-105 transition-transform duration-300">{feat.emoji}</span>
          <h2 className="text-[22px] font-black text-[#0F172A] dark:text-white tracking-tight mb-1 capitalize">
            {feat.emojiName}
          </h2>
          <p className="text-[13px] text-[#64748B] dark:text-gray-400 font-medium mb-6 flex items-center gap-1.5 text-center px-4 line-clamp-2">
            <span className="text-[#D4537E] font-bold">{feat.score}/10</span> <span className="text-[10px]">●</span> {feat.textNote || "Just checked in"}
          </p>

          {/* Dots Pagination Scale (1-10) */}
          <div className="flex items-center gap-[7px] mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <div 
                key={num} 
                className={`rounded-full transition-all duration-300 ${num === feat.score ? 'w-[9px] h-[9px] bg-[#D4537E]' : 'w-[6.5px] h-[6.5px] bg-[#F8D2DD] dark:bg-[#D4537E]/20'}`}
              />
            ))}
          </div>

          <span className="text-[11.5px] font-extrabold text-[#0F172A] dark:text-white tracking-wide mix-blend-multiply dark:mix-blend-normal opacity-80">
            @{feat.userName}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#FFF5F8] to-white dark:from-[#0a0a0a] dark:to-[#141414] transition-colors duration-500 overflow-x-hidden">
      {/* Header */}
      {isHomeEmpty ? (
        <header className="sticky top-0 z-40 bg-transparent transition-colors duration-500 mt-2">
          <div className="max-w-md mx-auto flex items-center justify-between px-6 h-[72px]">
            <h1 className="text-[22px] font-black text-[#0F172A] dark:text-white tracking-tight">MoodPulse</h1>
            
            <button className="w-[42px] h-[42px] rounded-full bg-[#F1F5F9] dark:bg-white/10 text-[#475569] dark:text-white flex items-center justify-center hover:opacity-80 transition-all shadow-sm">
              <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
              </svg>
            </button>
          </div>
        </header>
      ) : (
        <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-border/30 transition-colors duration-500">
          <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4537E] to-[#E8719A] flex items-center justify-center shadow-sm shadow-[#D4537E]/20">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-[#0F172A] dark:text-white">
                MoodPulse
              </span>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-3">
              {/* Streak fire */}
              <div className="flex items-center gap-1 bg-[#FFF3E0] dark:bg-orange-900/30 rounded-full px-2.5 py-1">
                <span className="text-sm">🔥</span>
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400">7</span>
              </div>

              {/* Notification bell */}
              <button 
                onClick={() => router.push("/notifications")}
                className="relative p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
               >
                <svg className="w-5 h-5 text-[#0F172A] dark:text-white" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {/* Notification dot */}
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D4537E] rounded-full" />
              </button>

              {/* Profile avatar */}
              <button 
                onClick={() => router.push("/profile")}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 ring-2 ring-border/50 overflow-hidden hover:ring-[#D4537E]/30 transition-all"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M20 21C20 17.134 16.4183 14 12 14C7.58172 14 4 17.134 4 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="max-w-md mx-auto pb-24">
        {isHomeEmpty ? (
          <div className="flex flex-col items-center justify-center pt-[12vh] px-6 animate-in fade-in duration-500">
            {/* Soft pink face graphic */}
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
              {/* Scattered blurred dots */}
              <div className="absolute -top-4 right-2 w-3.5 h-3.5 bg-[#E6A1B2] rounded-full blur-[1px] opacity-40 animate-pulse" />
              <div className="absolute top-[40%] text-white -left-1 w-2.5 h-2.5 bg-[#E6A1B2] rounded-full blur-[0.5px] opacity-30 animate-pulse" style={{ animationDelay: '1s'}} />
              
              {/* Main Background Circle */}
              <div className="w-[180px] h-[180px] bg-[#FFF0F5] dark:bg-[#D4537E]/5 rounded-full flex flex-col items-center justify-center shadow-[0_0_40px_rgba(230,161,178,0.1)]">
                {/* Face ._. Outline Ring */}
                <div className="w-[120px] h-[120px] border-[2px] border-[#F8D2DD] dark:border-[#D4537E]/20 rounded-full flex flex-col items-center justify-center relative">
                  <div className="flex items-center gap-7 mt-3 relative">
                    {/* Eyes */}
                    <div className="w-[7px] h-[7px] bg-[#E6A1B2] dark:bg-[#D4537E]/60 rounded-full" />
                    <div className="w-[7px] h-[7px] bg-[#E6A1B2] dark:bg-[#D4537E]/60 rounded-full" />
                    {/* Mouth */}
                    <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-7 h-[3px] bg-[#E6A1B2] dark:bg-[#D4537E]/60 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-[22px] font-bold text-[#0F172A] dark:text-white mb-2.5 text-center tracking-tight">
              Your feed is quiet
            </h2>
            
            <p className="text-[15px] text-[#64748B] dark:text-gray-400 text-center leading-[1.6] mb-8 max-w-[260px]">
              Add friends to see how they are feeling today.
            </p>

            <button 
              onClick={() => router.push("/discover")}
              className="bg-[#D4537E] hover:bg-[#C0466E] active:bg-[#A8385B] text-white text-[15px] font-bold py-[15px] px-10 rounded-full transition-all shadow-lg shadow-[#D4537E]/20 active:scale-95"
            >
              Find Friends
            </button>
          </div>
        ) : (
          <>
            {/* Morning Productivity Insight Banner */}
            <div className="px-4 pt-1 pb-1 mt-2">
              <div className="bg-[#E5FFEE] dark:bg-[#1A3326] rounded-[20px] p-4 border border-green-200/50 flex items-center gap-3.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/40 dark:bg-black/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                
                <div className="w-11 h-11 rounded-full bg-[#00E572] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18" />
                    <path d="M18 9l-5 5-3-3-4 4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-black dark:text-white uppercase tracking-wider mb-0.5">
                    Morning Productivity
                  </h4>
                  <p className="text-[13px] text-gray-800 dark:text-gray-200 leading-snug">
                    If you enter data before 9:00 AM, your mood is{" "}
                    <span className="font-bold text-[#00E572]">15% higher</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Story Avatars */}
            <div className="py-2 px-4 mb-2">
              {isLoading ? (
                <div className="flex gap-4 overflow-x-hidden px-4 py-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 min-w-[64px]">
                      <Skeleton className="w-16 h-16 rounded-full" />
                      <Skeleton className="w-10 h-2.5 rounded-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <StoryAvatars stories={stories} />
              )}
            </div>

            {/* Mood Feed Block */}
            <div className="px-4 space-y-3 pb-4">
              
              {isLoading ? (
                <>
                  <Skeleton className="w-full h-[190px] rounded-[32px] mb-5" />
                  <MoodCardSkeleton />
                  <MoodCardSkeleton />
                  <MoodCardSkeleton />
                </>
              ) : (
                <>
                  {renderFeaturedMood()}
                  {entries.slice(1).map((entry) => (
                    <MoodCard key={entry.id} entry={entry} />
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
