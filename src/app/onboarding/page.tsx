"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ONBOARDING_STEPS = [
  {
    id: 1,
    title: "Daily Check-in",
    description: "Take a moment to pause and track how you feel in just seconds.",
    // A solid heart icon matching the mockup perfectly
    icon: (
      <svg className="w-10 h-10 text-[#FF82B6]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Meaningful Insights",
    description: "Gain deeper understanding into your mood patterns over time.",
    // A chart icon
    icon: (
      <svg className="w-9 h-9 text-[#FF82B6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Connect with Friends",
    description: "Share your daily pulse and see how your closest friends are doing.",
    // Users icon
    icon: (
      <svg className="w-9 h-9 text-[#FF82B6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const ONBOARDING_STEPS = [
    {
      id: 1,
      layout: "outer",
      theme: "dark-pink",
      cardClass: "bg-transparent border-transparent shadow-none",
      title: "How are you, really?",
      description: "MoodPulse helps you stay emotionally connected with close friends through simple daily check-ins.",
      showSkip: false,
      showHeader: true,
      dotsPosition: "bottom",
      illustration: (
        <div className="flex flex-col items-center justify-center w-full h-full pt-12 pb-2">
          {/* Glowing Emoji */}
          <div className="relative transform hover:scale-105 transition-transform duration-500">
            {/* Ambient Glow */}
            <div className="absolute inset-2 bg-[#F59E0B] rounded-full blur-[40px] opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen animate-pulse" />
            <span className="text-[130px] leading-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_40px_rgba(255,255,255,0.05)] relative z-10 block">
              😊
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      layout: "outer",
      theme: "black",
      cardClass: "bg-[#F8F9FA] dark:bg-[#1C1C2A]",
      title: "5-Second Check-in",
      description: "Pick an emoji that matches your mood and set a score. It’s that simple.",
      showSkip: false,
      showHeader: true,
      dotsPosition: "bottom",
      illustration: (
        <div className="flex flex-col items-center justify-center w-full h-full pt-4 pb-0">
          {/* Emojis Grid */}
          <div className="grid grid-cols-3 gap-x-8 gap-y-6 mb-10 mt-4">
            <span className="text-[40px] opacity-60 dark:opacity-40 grayscale-[0.2]">😔</span>
            <span className="text-[40px] opacity-60 dark:opacity-40 grayscale-[0.2]">😐</span>
            <div className="w-[72px] h-[72px] bg-white dark:bg-[#2A2A38] shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-none rounded-2xl flex items-center justify-center -translate-y-2 relative z-10 border border-black/[0.02] dark:border-white/5">
              <span className="text-[44px]">😊</span>
            </div>
            <span className="text-[40px] opacity-60 dark:opacity-40 grayscale-[0.2]">😠</span>
            <span className="text-[40px] opacity-60 dark:opacity-40 grayscale-[0.2]">😴</span>
            <span className="text-[40px] opacity-60 dark:opacity-40 grayscale-[0.2]">🥳</span>
          </div>

          {/* Slider */}
          <div className="w-full px-8 mb-4">
            <div className="flex justify-between text-[11px] font-bold text-[#A0AEC0] dark:text-gray-500 tracking-[0.1em] mb-[18px]">
              <span>LOW</span>
              <span>HIGH</span>
            </div>
            <div className="relative w-full h-1.5 bg-[#E2E8F0] dark:bg-gray-700 rounded-full">
              <div className="absolute top-1/2 -translate-y-1/2 left-[85%] w-3.5 h-3.5 bg-black dark:bg-white rounded-full ring-4 ring-[#F8F9FA] dark:ring-[#1C1C2A] shadow-sm transform -translate-x-1/2" />
            </div>
          </div>
          
          <h3 className="text-[26px] font-black text-black dark:text-white mt-1.5">8.5</h3>
        </div>
      ),
    },
    {
      id: 3,
      layout: "outer",
      theme: "black",
      cardClass: "bg-transparent border-transparent shadow-none w-full",
      title: "See How Friends Feel",
      description: "A 24-hour disappearing feed shows you the authentic emotional state of your inner circle.",
      showSkip: false,
      showHeader: true,
      dotsPosition: "bottom",
      illustration: (
        <div className="flex items-center justify-center w-full h-[280px] pt-8 pb-4 relative">
          {/* Background clock icon */}
          <div className="absolute top-[18%] right-[25%] opacity-[0.08] dark:opacity-5">
            <svg className="w-[38px] h-[38px] text-gray-500 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>

          {/* Floating visual elements container */}
          <div className="relative w-full h-full max-w-[280px] mx-auto">
            
            {/* Top Left Card - Sarah */}
            <div className="absolute top-[5%] left-[5%] bg-white dark:bg-[#1C1C2A] rounded-[28px] p-4 pb-5 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.2)] dark:border dark:border-white/5 flex flex-col items-center justify-center w-[100px] animate-in slide-in-from-bottom-4 duration-700">
              <div className="w-[50px] h-[50px] rounded-full bg-[#B2DFDB] overflow-hidden mb-2.5 flex items-center justify-center">
                 <span className="text-[36px] block translate-y-1 drop-shadow-sm">👩🏽</span>
              </div>
              <span className="text-[12px] font-bold text-[#94A3B8] mb-2 tracking-wide">Sarah</span>
              <div className="w-8 h-1.5 bg-[#FFCA28] rounded-full" />
            </div>

            {/* Middle Right Card - Alex */}
            <div className="absolute top-[35%] right-[2%] bg-white dark:bg-[#1C1C2A] rounded-[28px] p-4 pb-5 shadow-[0_15px_40px_-5px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.2)] dark:border dark:border-white/5 flex flex-col items-center justify-center w-[100px] animate-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
              <div className="w-[50px] h-[50px] rounded-full bg-[#B3E5FC] overflow-hidden mb-2.5 flex items-center justify-center">
                 <span className="text-[36px] block translate-y-1 drop-shadow-sm">🧑🏻</span>
              </div>
              <span className="text-[12px] font-bold text-[#94A3B8] mb-2 tracking-wide">Alex</span>
              <div className="w-8 h-1.5 bg-[#64B5F6] rounded-full" />
            </div>

            {/* Bottom Left Horizontal Card - Jamie */}
            <div className="absolute bottom-[5%] left-[20%] bg-white dark:bg-[#1C1C2A] rounded-[26px] pl-4 pr-5 py-3 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.2)] dark:border dark:border-white/5 flex flex-row items-center gap-3.5 animate-in slide-in-from-bottom-6 duration-700 delay-200 fill-mode-both z-10">
              <div className="w-[44px] h-[44px] rounded-full bg-[#E1BEE7] overflow-hidden flex items-center justify-center">
                 <span className="text-[32px] block translate-y-1 drop-shadow-sm">👩🏻</span>
              </div>
              <div className="flex flex-col justify-center translate-y-0.5">
                <span className="text-[14px] font-black text-[#0F172A] dark:text-white leading-none mb-1.5">Jamie</span>
                <div className="w-9 h-1.5 bg-[#E0B0FF] rounded-full block" />
              </div>
            </div>

          </div>
        </div>
      )
    },
    {
      id: 4,
      layout: "outer",
      theme: "dark-pink",
      cardClass: "bg-transparent border-transparent shadow-none w-full",
      title: "Ready to Pulse?",
      description: "Connect your contacts to find your friends and start your first 7-day streak.",
      showSkip: true,
      showHeader: false,
      dotsPosition: "top",
      illustration: (
        <div className="flex items-center justify-center w-full h-[320px] relative pt-10 pb-6 mb-4">
          
          {/* Large soft pink circle */}
          <div className="w-[260px] h-[260px] rounded-full bg-[#FFF2F6] dark:bg-[#D4537E]/10 flex items-center justify-center relative shadow-inner border border-white dark:border-white/5">
            
            {/* White card in the center */}
            <div className="w-[110px] h-[110px] bg-white dark:bg-[#1C1C2A] rounded-[32px] shadow-[0_15px_35px_rgba(0,0,0,0.05)] dark:shadow-none dark:border dark:border-white/5 flex items-center justify-center animate-in zoom-in-50 duration-500">
               {/* Checkmark icon */}
               <div className="w-[52px] h-[52px] rounded-full border-[3.5px] border-[#D4537E] flex items-center justify-center">
                 <svg className="w-8 h-8 text-[#D4537E] translate-y-[1px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                   <polyline points="20 6 9 17 4 12" />
                 </svg>
               </div>
            </div>

            {/* Floating Waving Hand */}
            <div className="absolute -top-1 right-2 w-[52px] h-[52px] bg-white dark:bg-[#1C1C2A] rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.06)] dark:shadow-none dark:border dark:border-white/5 flex items-center justify-center animate-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both z-10">
              <span className="text-[24px] block translate-y-0.5">👋</span>
            </div>

             {/* Floating Sparkles */}
            <div className="absolute -bottom-4 -left-4 w-[58px] h-[58px] bg-white dark:bg-[#1C1C2A] rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.06)] dark:shadow-none dark:border dark:border-white/5 flex items-center justify-center animate-in slide-in-from-top-4 duration-700 delay-200 fill-mode-both z-10">
              <span className="text-[26px] block translate-y-0.5">✨</span>
            </div>

          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/");
    }
  };

  const currentData = ONBOARDING_STEPS[currentStep];

  const renderDots = () => (
    <div className={`flex items-center justify-center gap-2 ${currentData.dotsPosition === 'top' ? 'mt-12 mb-8' : (currentData.layout === 'inner' ? 'mb-12' : 'mb-10')}`}>
      {ONBOARDING_STEPS.map((_, index) => {
        const isActive = currentStep === index;
        let bgColor = "bg-[#DEE2E6] dark:bg-gray-700";
        if (isActive) {
          if (currentData.theme === 'pink') bgColor = "bg-[#FF82B6] dark:bg-[#D4537E]";
          else if (currentData.theme === 'dark-pink') bgColor = "bg-[#D4537E]";
          else bgColor = "bg-black dark:bg-white";
        }
        return (
          <div 
            key={index}
            className={`h-[6.5px] rounded-full transition-all duration-300 ${isActive ? `w-7 ${bgColor}` : `w-[6.5px] ${bgColor}`}`}
          />
        );
      })}
    </div>
  );

  return (
    <div className="min-h-[100dvh] bg-[#FFFFFF] dark:bg-[#0a0a0a] transition-colors duration-500 flex flex-col items-center">
      
      {/* Conditionally Render Header vs Top Dots */}
      {currentData.showHeader ? (
        <header className="w-full max-w-md flex items-center justify-between px-6 pt-12 pb-4 animate-in fade-in duration-300">
          <div className="w-10" />
          <h1 className="text-[17px] font-black text-[#0F172A] dark:text-white tracking-widest pl-2">MoodPulse</h1>
          <button className="w-10 text-right text-[15px] font-medium text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white transition-colors">
            Help
          </button>
        </header>
      ) : (
        <div className="w-full animate-in fade-in duration-300">
          {currentData.dotsPosition === 'top' && renderDots()}
        </div>
      )}

      {/* Main Content Area */}
      <main className="w-full max-w-[390px] flex-1 flex flex-col items-center px-6 pt-8">
        
        {/* Dynamic Card */}
        <div className={`w-full ${currentData.layout === 'inner' ? 'aspect-[4/4.8]' : (currentData.id === 4 ? 'aspect-auto' : 'aspect-square')} ${currentData.cardClass} rounded-[36px] flex flex-col items-center justify-center p-8 mb-4 ${currentData.theme === 'dark-pink' || currentData.theme === 'black' ? '' : 'shadow-sm border border-black/[0.02] dark:border-white/5'} relative overflow-hidden transition-all duration-500`}>
          <div key={`ill-${currentStep}`} className="flex flex-col items-center justify-center w-full h-full animate-in slide-in-from-right-8 fade-in duration-500">
            {currentData.layout === 'inner' ? (
              <>
                {currentData.illustration}
                <h2 className="text-[22px] font-extrabold text-[#0F172A] dark:text-white mb-3.5 tracking-tight text-center">
                  {currentData.title}
                </h2>
                <p className="text-[15.5px] text-[#64748B] dark:text-gray-400 leading-[1.65] px-2 text-center">
                  {currentData.description}
                </p>
              </>
            ) : (
              currentData.illustration
            )}
          </div>
        </div>

        {/* Outer Text Content (if applicable) */}
        {currentData.layout === 'outer' && (
          <div key={`text-${currentStep}`} className="flex flex-col items-center text-center animate-in slide-in-from-right-8 fade-in duration-500 mb-8 px-2">
            <h2 className="text-[24px] font-extrabold text-[#0F172A] dark:text-white mb-3.5 tracking-tight">
              {currentData.title}
            </h2>
            <p className="text-[16px] text-[#64748B] dark:text-gray-400 leading-[1.65]">
              {currentData.description}
            </p>
          </div>
        )}

        {/* Bottom Pagination Dots */}
        {currentData.dotsPosition === 'bottom' && renderDots()}

        {/* Action Buttons */}
        <div className="w-full flex flex-col items-center gap-5 mt-auto pb-12">
          <button 
            onClick={handleNext}
            className={`w-full h-[58px] text-[17px] font-bold rounded-[20px] transition-all duration-300 shadow-lg active:scale-[0.98] ${
              currentData.theme === 'pink' 
                ? "bg-[#FF82B6] hover:bg-[#F072A5] active:bg-[#E06496] shadow-[#FF82B6]/25 dark:bg-[#D4537E] dark:hover:bg-[#C0466E] text-white" 
                : currentData.theme === 'dark-pink'
                ? "bg-[#D4537E] hover:bg-[#C0466E] active:bg-[#A8385B] shadow-[#D4537E]/25 text-white"
                : "bg-black hover:bg-black/90 active:bg-black/80 shadow-black/10 dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white"
            }`}
          >
            {currentStep === ONBOARDING_STEPS.length - 1 ? "Get Started" : "Next"}
          </button>
          
          {currentData.showSkip ? (
            <button 
              onClick={() => router.push("/")}
              className="text-[16px] font-semibold text-[#94A3B8] hover:text-[#64748B] dark:hover:text-gray-300 transition-colors py-2"
            >
              {currentStep === ONBOARDING_STEPS.length - 1 ? "Skip for now" : "Skip"}
            </button>
          ) : (
            <div className="h-[40px]" /> /* Placeholder to preserve layout spacing */
          )}
        </div>

      </main>
    </div>
  );
}
