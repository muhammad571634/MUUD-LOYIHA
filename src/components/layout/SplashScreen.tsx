"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // SessionStorage yordamida ilova faqat birinchi marta ochilganda Splashni ko'rsatiladi
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setShow(false);
      return;
    }
    
    // 1.8 soniyadan keyin animatsiyani yopish
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("hasSeenSplash", "true");
    }, 1800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a]"
        >
          {/* Katta animatsiyali yurak - App Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", times: [0, 0.6, 1] }}
            className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-[#D4537E] to-[#E8719A] flex items-center justify-center shadow-2xl shadow-[#D4537E]/40 mb-6"
          >
            <motion.svg 
              className="w-12 h-12 text-white" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </motion.svg>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-[32px] font-black tracking-tight text-[#0F172A] dark:text-white"
          >
            MoodPulse
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-[14px] font-medium text-[#64748B] dark:text-gray-400 mt-2.5 tracking-wide uppercase"
          >
            How are you, really?
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
