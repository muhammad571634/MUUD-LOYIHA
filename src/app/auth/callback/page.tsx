"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Supabase URL dan session tokenini oladi va foydalanuvchini tasdiqlaydi
    const handleCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        // Xatolik bo'lsa loginга qaytaradi
        router.replace("/login");
        return;
      }

      // Foydalanuvchi bazada borligini tekshir, yo'q bo'lsa yaratish
      const user = session.user;
      const { data: existingProfile } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!existingProfile) {
        // Yangi foydalanuvchi - profil yaratamiz
        const username = user.email?.split("@")[0]?.replace(/[^a-z0-9_]/gi, "_").toLowerCase() 
          || `user_${Date.now()}`;
        
        await supabase.from("users").insert({
          id: user.id,
          email: user.email,
          username,
          display_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
          avatar_emoji: "😊",
        });

        // Streak jadvalini ham yaratamiz
        await supabase.from("streaks").insert({
          user_id: user.id,
          current_streak: 0,
          longest_streak: 0,
        });

        // Yangi foydalanuvchi → Onboarding ga yo'naltirish
        router.replace("/onboarding");
      } else {
        // Mavjud foydalanuvchi → Asosiy sahifaga
        router.replace("/");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-[100dvh] bg-white dark:bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
      {/* MoodPulse Logotipi */}
      <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-[#D4537E] to-[#E8719A] flex items-center justify-center shadow-lg shadow-[#D4537E]/30 animate-pulse">
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
      <p className="text-[15px] font-semibold text-[#64748B] dark:text-gray-400">
        Signing you in...
      </p>
    </div>
  );
}
