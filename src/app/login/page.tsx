"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { sounds } from "@/lib/sounds";
import { triggerHaptic } from "@/lib/haptics";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<null | "google" | "instagram">(null);
  const [error, setError] = useState<string | null>(null);

  // Google OAuth
  const handleGoogle = async () => {
    try {
      setLoading("google");
      setError(null);
      triggerHaptic("light");
      sounds.playPop();

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;
    } catch (e: any) {
      setError(e.message || "Google login xatosi yuz berdi.");
      setLoading(null);
    }
  };

  // Facebook (Instagram login uchun Meta platformasi)
  const handleInstagram = async () => {
    try {
      setLoading("instagram");
      setError(null);
      triggerHaptic("light");
      sounds.playPop();

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: "email,public_profile",
        },
      });

      if (error) throw error;
    } catch (e: any) {
      setError(e.message || "Instagram login xatosi yuz berdi.");
      setLoading(null);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#F8F9FA] dark:bg-[#0a0a0a] transition-colors duration-500 flex flex-col px-6 relative overflow-hidden">

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center pt-20 pb-10 max-w-[390px] mx-auto w-full">

        {/* Emoji Icon */}
        <div className="mb-6 relative w-[60px] h-[60px]">
          <span className="text-[56px] leading-none block transform -rotate-12 drop-shadow-lg filter absolute top-0 -left-1">
            👋
          </span>
        </div>

        <h1 className="text-[34px] font-black text-[#0F172A] dark:text-white leading-[1.12] tracking-[-0.02em] mb-3">
          Welcome to<br />MoodPulse
        </h1>

        <p className="text-[17px] text-[#64748B] dark:text-gray-400 mb-12">
          Your daily emotional check-in.
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl px-4 py-3">
            <p className="text-[13px] text-red-600 dark:text-red-400 font-medium">{error}</p>
          </div>
        )}

        {/* Auth Buttons */}
        <div className="flex flex-col gap-4 w-full">

          {/* Instagram / Meta Button */}
          <button
            id="btn-instagram-login"
            onClick={handleInstagram}
            disabled={loading !== null}
            className="w-full h-[58px] bg-gradient-to-r from-[#A83279] via-[#D32F5D] to-[#ED3040] hover:opacity-95 text-white rounded-[20px] font-bold text-[16px] flex items-center justify-center shadow-md shadow-pink-500/20 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading === "instagram" ? (
              <svg className="w-5 h-5 mr-3 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            )}
            {loading === "instagram" ? "Yuklanmoqda..." : "Continue with Instagram"}
          </button>

          {/* Google Button */}
          <button
            id="btn-google-login"
            onClick={handleGoogle}
            disabled={loading !== null}
            className="w-full h-[58px] bg-white dark:bg-[#1C1C2A] text-[#0F172A] dark:text-white border border-gray-200 dark:border-white/10 rounded-[20px] font-bold text-[16px] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-[0.98] transition-all hover:bg-gray-50 dark:hover:bg-[#2A2A38] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading === "google" ? (
              <svg className="w-5 h-5 mr-3 animate-spin text-gray-400" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            {loading === "google" ? "Yuklanmoqda..." : "Continue with Google"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pb-10 px-4 text-center max-w-[390px] mx-auto w-full">
        <p className="text-[12.5px] text-[#94A3B8] dark:text-gray-500 leading-relaxed font-medium">
          By continuing, you agree to our{" "}
          <span className="text-[#475569] dark:text-gray-300 font-bold cursor-pointer hover:underline">Terms</span>{" "}
          and{" "}
          <span className="text-[#475569] dark:text-gray-300 font-bold cursor-pointer hover:underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
