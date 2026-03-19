"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
});

// Himoyasiz (login talab qilmaydigan) yo'llar
const PUBLIC_ROUTES = ["/login", "/onboarding", "/auth/callback"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Mavjud sessionni tekshirish
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Auth o'zgarishlarini real-time kuzatish
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Route himoyasi: login bo'lmagan foydalanuvchini redirect qilish
  useEffect(() => {
    if (loading) return;

    const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

    if (!user && !isPublicRoute) {
      router.replace("/login");
    }
  }, [user, loading, pathname, router]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {/* Yuklanayotganda chiroyli spinner */}
      {loading ? (
        <div className="min-h-[100dvh] bg-white dark:bg-[#0a0a0a] flex items-center justify-center">
          <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#D4537E] to-[#E8719A] flex items-center justify-center shadow-lg shadow-[#D4537E]/30 animate-pulse">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
