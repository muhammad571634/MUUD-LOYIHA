"use client";

import { useRouter } from "next/navigation";

const FEATURES = [
  {
    title: "Unlimited History",
    description: "Access every mood and memory without limits.",
    icon: (
      <svg className="w-6 h-6 text-[#E65100]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M12 7v5l4 2" />
      </svg>
    ),
    imageBg: "bg-[#EAEAEA] dark:bg-[#2A2A2A]",
    imageContent: (
      <div className="w-10 h-10 bg-white rounded shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <div className="h-2.5 bg-[#EF9A9A] w-full" />
        <div className="flex-1 grid grid-cols-4 gap-[1px] p-[2px] opacity-20">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-black/50 rounded-[1px]" />
          ))}
        </div>
      </div>
    )
  },
  {
    title: "AI Weekly Insights",
    description: "Personalized emotional analysis and patterns.",
    icon: (
      <svg className="w-6 h-6 text-[#E65100]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    imageBg: "bg-[#457b7a]",
    imageContent: (
      <div className="w-10 h-10 flex items-end justify-center gap-1 p-1">
        <div className="w-1.5 h-3 bg-white/60 rounded-t-sm" />
        <div className="w-1.5 h-6 bg-white/90 rounded-t-sm" />
        <div className="w-1.5 h-4 bg-white/60 rounded-t-sm" />
        <div className="w-1.5 h-8 bg-white/90 rounded-t-sm" />
      </div>
    )
  },
  {
    title: "Music Status",
    description: "Connect Spotify to track mood via music.",
    icon: (
      <svg className="w-6 h-6 text-[#E65100]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    imageBg: "bg-black",
    imageContent: (
      <div className="w-full h-full flex items-center justify-center overflow-hidden opacity-80">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent animate-pulse" />
        <div className="absolute flex items-center gap-[2px]">
          {[...Array(7)].map((_, i) => (
            <div key={i} className={`w-[2px] bg-white/80 rounded-full h-${[3, 5, 8, 4, 6, 3, 5][i]} animate-[pulse_${(i+1)*0.5}s_ease-in-out_infinite]`} style={{ height: `${[8, 16, 24, 12, 20, 10, 14][i]}px` }} />
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Custom Emojis",
    description: "Exclusive pack of expressive mood icons.",
    icon: (
      <svg className="w-6 h-6 text-[#E65100]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    imageBg: "bg-[#F5F5F5]",
    imageContent: (
      <div className="w-12 h-12 flex flex-wrap gap-1 p-1 items-center justify-center opacity-80">
        <span className="text-[10px]">😍</span>
        <span className="text-[10px]">🥺</span>
        <span className="text-[10px]">🥳</span>
        <span className="text-[10px]">🤠</span>
        <span className="text-[10px]">😎</span>
        <span className="text-[10px]">🤩</span>
      </div>
    )
  }
];

export default function PlusPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0a0a0a] transition-colors duration-500 pb-20">
      
      {/* Top Bar (Transparent) */}
      <header className="absolute top-0 w-full z-40 bg-transparent">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 h-14">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <h1 className="text-base font-bold text-gray-900 dark:text-white drop-shadow-sm">MoodPulse Plus</h1>
          <div className="w-9" /> {/* Spacer */}
        </div>
      </header>

      {/* Hero Banner Area */}
      {/* Need a gradient that is somewhat like a dark magenta/brown/orange. We use a mask over a solid to mix colors. */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: '380px' }}>
        {/* Mockup shows gradient from purple to orange to deep brown */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#800080] via-[#E65100] to-[#3E2723] opacity-90 dark:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent mix-blend-multiply" />
        
        {/* To blend perfectly into the light gray background or dark mode below, we don't need a fade out, mockup shows a sharp cut */}
        
        <div className="relative max-w-md mx-auto px-6 h-full flex flex-col justify-end pb-10 pt-24">
          <div className="bg-[#E65100] text-white px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest inline-flex self-start mb-4 shadow-sm">
            Premium Experience
          </div>
          <h2 className="text-white text-4xl font-black leading-[1.1] tracking-tight mb-2 drop-shadow-md">
            Unlock Your Full <br /> Potential
          </h2>
          <p className="text-white/90 text-[15px] font-medium drop-shadow-sm">
            Join 50,000+ users tracking their growth
          </p>
        </div>
      </div>

      <main className="max-w-md mx-auto px-4 -mt-2">
        {/* Intro */}
        <div className="text-center pt-8 pb-6">
          <h3 className="text-lg font-black text-foreground mb-1">Experience MoodPulse Plus</h3>
          <p className="text-sm text-muted-foreground font-medium">Elevate your emotional wellbeing with pro tools</p>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-4 flex items-center shadow-sm border border-border/30 transition-colors duration-500 hover:shadow-md cursor-pointer group">
              {/* Left Icon */}
              <div className="w-[52px] h-[52px] rounded-full bg-[#FFF3E0] dark:bg-[#3E2723]/30 flex-shrink-0 flex items-center justify-center mr-4 group-hover:scale-105 transition-transform duration-300">
                {feature.icon}
              </div>
              
              {/* Middle Text */}
              <div className="flex-1 pr-3">
                <h4 className="text-[15px] font-black text-[#1F2937] dark:text-white leading-snug mb-0.5">
                  {feature.title}
                </h4>
                <p className="text-[13px] text-muted-foreground leading-tight">
                  {feature.description}
                </p>
              </div>
              
              {/* Right Image/Graphic area */}
              <div className={`w-[60px] h-[60px] rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden relative shadow-inner ${feature.imageBg}`}>
                {feature.imageContent}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing & CTA */}
        <div className="mt-8 pt-6 pb-12 flex flex-col items-center text-center px-4">
          <p className="text-[14px] text-muted-foreground font-medium mb-1">
            Billed monthly. Cancel anytime.
          </p>
          <p className="text-[16px] text-[#E65100] font-black mb-5">
            7-day free trial included
          </p>

          <button className="w-full h-14 bg-[#E65100] active:bg-[#C94700] hover:bg-[#F55B0A] text-white rounded-xl shadow-lg shadow-[#E65100]/25 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] font-black text-[17px]">
            Upgrade for $4.99/mo
            <svg className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="flex items-center justify-center gap-4 mt-6">
            <button className="text-[12px] font-semibold text-muted-foreground hover:text-foreground transition-colors">Restore Purchase</button>
            <button className="text-[12px] font-semibold text-muted-foreground hover:text-foreground transition-colors">Terms of Service</button>
            <button className="text-[12px] font-semibold text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</button>
          </div>
        </div>
      </main>

    </div>
  );
}
