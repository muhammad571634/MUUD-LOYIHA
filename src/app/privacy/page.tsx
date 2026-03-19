"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";

export default function PrivacySettingsPage() {
  const router = useRouter();
  
  // States
  const [visibility, setVisibility] = useState("friends"); // 'public', 'friends', 'private'
  const [syncContacts, setSyncContacts] = useState(true);
  const [findByUsername, setFindByUsername] = useState(true);

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0a0a0a] transition-colors duration-500 pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-gray-100 dark:border-white/10 transition-colors duration-500">
        <div className="max-w-md mx-auto flex items-center px-4 h-[60px]">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h1 className="text-[19px] font-black text-[#0F172A] dark:text-white ml-2 tracking-tight">Privacy Settings</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto pt-5 pb-8 px-4 space-y-7">
        
        {/* WHO CAN SEE MY PULSE */}
        <section>
          <h2 className="text-[12px] font-bold text-[#64748B] dark:text-gray-400 uppercase tracking-widest mb-3 ml-1">
            Who can see my pulse
          </h2>
          <div className="bg-white dark:bg-[#1C1C28] rounded-[24px] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden transition-colors duration-500">
            <div className="divide-y divide-gray-100 dark:divide-white/5">
              
              {/* Option: Public */}
              <div 
                className="flex items-center justify-between p-4 px-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                onClick={() => setVisibility('public')}
              >
                <span className="text-[16px] font-medium text-[#0F172A] dark:text-white">Public (Everyone)</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${visibility === 'public' ? 'border-[#D4537E]' : 'border-gray-300 dark:border-gray-600'}`}>
                  {visibility === 'public' && <div className="w-3 h-3 rounded-full bg-[#D4537E]" />}
                </div>
              </div>

              {/* Option: Friends */}
              <div 
                className="flex items-center justify-between p-4 px-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                onClick={() => setVisibility('friends')}
              >
                <span className="text-[16px] font-medium text-[#0F172A] dark:text-white">Friends Only (Default)</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${visibility === 'friends' ? 'border-[#D4537E]' : 'border-gray-300 dark:border-gray-600'}`}>
                  {visibility === 'friends' && <div className="w-3 h-3 rounded-full bg-[#D4537E]" />}
                </div>
              </div>

              {/* Option: Private */}
              <div 
                className="flex items-center justify-between p-4 px-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                onClick={() => setVisibility('private')}
              >
                <span className="text-[16px] font-medium text-[#0F172A] dark:text-white">Private (Only me)</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${visibility === 'private' ? 'border-[#D4537E]' : 'border-gray-300 dark:border-gray-600'}`}>
                  {visibility === 'private' && <div className="w-3 h-3 rounded-full bg-[#D4537E]" />}
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* CONNECTIVITY */}
        <section>
          <h2 className="text-[12px] font-bold text-[#64748B] dark:text-gray-400 uppercase tracking-widest mb-3 ml-1">
            Connectivity
          </h2>
          <div className="bg-white dark:bg-[#1C1C28] rounded-[24px] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden transition-colors duration-500">
            <div className="divide-y divide-gray-100 dark:divide-white/5">
              
              {/* Sync Contacts */}
              <div className="flex items-center justify-between p-4 px-5">
                <div className="pr-4">
                  <h3 className="text-[16px] font-medium text-[#0F172A] dark:text-white leading-snug">Sync Contacts</h3>
                  <p className="text-[13px] text-[#94A3B8] dark:text-gray-500 mt-0.5">Find friends from your address book</p>
                </div>
                {/* Toggle switch */}
                <button 
                  onClick={() => setSyncContacts(!syncContacts)}
                  className={`relative flex-shrink-0 w-[52px] h-7 rounded-full transition-colors duration-300 ${syncContacts ? 'bg-[#D4537E] border-transparent' : 'bg-transparent border-[1.5px] border-gray-300 dark:border-gray-600'}`}
                >
                  <div className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${syncContacts ? 'bg-white' : 'bg-gray-300 dark:bg-gray-600'} rounded-full transition-transform duration-300 shadow-sm ${syncContacts ? 'left-[2px] translate-x-[24px]' : 'left-[3px] translate-x-0'}`} />
                </button>
              </div>

              {/* Find by username */}
              <div className="flex items-center justify-between p-4 px-5">
                <div className="pr-4">
                  <h3 className="text-[16px] font-medium text-[#0F172A] dark:text-white leading-snug">Find me by username</h3>
                  <p className="text-[13px] text-[#94A3B8] dark:text-gray-500 mt-0.5">Allow others to search for your profile</p>
                </div>
                {/* Toggle switch */}
                <button 
                  onClick={() => setFindByUsername(!findByUsername)}
                  className={`relative flex-shrink-0 w-[52px] h-7 rounded-full transition-colors duration-300 ${findByUsername ? 'bg-[#D4537E] border-transparent' : 'bg-transparent border-[1.5px] border-gray-300 dark:border-gray-600'}`}
                >
                  <div className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${findByUsername ? 'bg-white' : 'bg-gray-300 dark:bg-gray-600'} rounded-full transition-transform duration-300 shadow-sm ${findByUsername ? 'left-[2px] translate-x-[24px]' : 'left-[3px] translate-x-0'}`} />
                </button>
              </div>

            </div>
          </div>
        </section>


        {/* DATA & PRIVACY */}
        <section>
          <h2 className="text-[12px] font-bold text-[#64748B] dark:text-gray-400 uppercase tracking-widest mb-3 ml-1">
            Data & Privacy
          </h2>
          <div className="bg-white dark:bg-[#1C1C28] rounded-[24px] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden transition-colors duration-500">
            <div className="divide-y divide-gray-100 dark:divide-white/5">
              
              {/* Export */}
              <button className="w-full flex items-center justify-between p-4 px-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <span className="text-[16px] font-medium text-[#0F172A] dark:text-white">Export My Data</span>
                <svg className="w-5 h-5 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              {/* Clear History */}
              <button className="w-full flex items-center justify-between p-4 px-5 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-colors">
                <span className="text-[16px] font-medium text-[#D4537E] dark:text-[#E8719A]">Clear History</span>
                <svg className="w-5 h-5 text-[#D4537E] dark:text-[#E8719A] opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                </svg>
              </button>

              {/* Delete Account */}
              <button className="w-full flex items-center justify-between p-4 px-5 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                <span className="text-[16px] font-medium text-[#EF4444]">Delete Account</span>
                <svg className="w-5 h-5 text-[#EF4444] opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
                </svg>
              </button>

            </div>
          </div>
        </section>

        {/* Footer Text */}
        <div className="px-5 py-2 text-center pb-8">
          <p className="text-[13px] text-[#94A3B8] dark:text-gray-500 leading-relaxed font-medium">
            By managing these settings, you control how MoodPulse handles your personal data. Learn more in our <button className="text-[#D4537E] dark:text-[#E8719A] hover:underline underline-offset-2">Privacy Policy</button>.
          </p>
        </div>

      </main>
      
      <BottomNav />
    </div>
  );
}
