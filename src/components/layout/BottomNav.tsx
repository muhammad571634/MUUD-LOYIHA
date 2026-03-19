"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { sounds } from "@/lib/sounds";

const tabs = [
  { id: "home", label: "Home", href: "/", icon: HomeIcon },
  { id: "discover", label: "Discover", href: "/discover", icon: DiscoverIcon },
  { id: "checkin", label: "", href: "/checkin", icon: CheckInIcon, isCenter: true },
  { id: "friends", label: "Friends", href: "/friends", icon: FriendsIcon },
  { id: "profile", label: "Profile", href: "/profile", icon: ProfileIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-border/50 transition-colors duration-500">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;

          if (tab.isCenter) {
            return (
              <Link
                key={tab.id}
                href={tab.href}
                onClick={() => sounds.playPop()}
                className="relative -top-4 flex items-center justify-center w-[58px] h-[58px] rounded-full bg-gradient-to-br from-[#D4537E] to-[#E8719A] shadow-lg shadow-[#D4537E]/40 transition-all duration-200 hover:scale-105 active:scale-95 border-[3px] border-white dark:border-[#0a0a0a]"
              >
                <tab.icon className="w-7 h-7 text-white" />
              </Link>
            );
          }

          return (
            <Link
              key={tab.id}
              href={tab.href}
              onClick={() => { if (!isActive) sounds.playTap(); }}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 transition-colors duration-200 ${
                isActive
                  ? "text-[#D4537E]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon
                className={`w-6 h-6 transition-all duration-200 ${
                  isActive ? "scale-110" : ""
                }`}
                filled={isActive}
              />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// --- SVG Icon Components ---

function HomeIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {filled ? (
        <path d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V10.5Z" fill="currentColor" />
      ) : (
        <path d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function DiscoverIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {filled ? (
        <path d="M21 21l-4.35-4.35M19 11A8 8 0 113 11a8 8 0 0116 0z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M21 21l-4.35-4.35M19 11A8 8 0 113 11a8 8 0 0116 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function CheckInIcon({ className }: { className?: string }) {
  // A yellow smiley face inside the pink circle
  return (
    <div className="w-full h-full flex items-center justify-center text-[28px] drop-shadow-sm leading-none">
      <svg className="w-8 h-8 text-[#FFD700]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2.5 7c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S8 11.33 8 10.5 8.67 9 9.5 9zm5 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-2.5 9c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/>
      </svg>
    </div>
  );
}

function FriendsIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {filled ? (
        <path d="M16 21V19C16 16.7909 14.2091 15 12 15H6C3.79086 15 2 16.7909 2 19V21M22 21V19C22 17.1362 20.7252 15.5701 19 15.126M15 3.12602C16.7252 3.57006 18 5.13616 18 7C18 8.86384 16.7252 10.4299 15 10.874M12 7C12 9.20914 10.2091 11 8 11C5.79086 11 4 9.20914 4 7C4 4.79086 5.79086 3 8 3C10.2091 3 12 4.79086 12 7Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M16 21V19C16 16.7909 14.2091 15 12 15H6C3.79086 15 2 16.7909 2 19V21M22 21V19C22 17.1362 20.7252 15.5701 19 15.126M15 3.12602C16.7252 3.57006 18 5.13616 18 7C18 8.86384 16.7252 10.4299 15 10.874M12 7C12 9.20914 10.2091 11 8 11C5.79086 11 4 9.20914 4 7C4 4.79086 5.79086 3 8 3C10.2091 3 12 4.79086 12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function StatsIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {filled ? (
        <path d="M6 20V14M12 20V10M18 20V4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M6 20V14M12 20V10M18 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function ProfileIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {filled ? (
        <>
          <circle cx="12" cy="8" r="4" fill="currentColor" />
          <path d="M20 21C20 17.134 16.4183 14 12 14C7.58172 14 4 17.134 4 21" fill="currentColor" />
        </>
      ) : (
        <>
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M20 21C20 17.134 16.4183 14 12 14C7.58172 14 4 17.134 4 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
