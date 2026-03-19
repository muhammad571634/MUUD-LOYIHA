import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-context";
import { AuthProvider } from "@/lib/auth-context";
import SplashScreen from "@/components/layout/SplashScreen";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "MoodPulse — How are you, really?",
  description:
    "Daily mood-sharing social app. Check in your emotional state, see how your friends feel, and build healthy habits.",
  keywords: "mood, mental health, social, feelings, daily check-in",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MoodPulse"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider>
          <AuthProvider>
            <SplashScreen />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
