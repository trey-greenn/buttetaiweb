import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/app/lib/auth-context';
import Header from '@/app/components/ui/header';
import Footer from '@/app/components/footer/Footer';
import { GoogleTagManager } from '@next/third-parties/google'



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BuffettAI",
  description: "BuffetAI helps you master your information diet with personalized AI-powered newsletters, study tools, and visual content. Read smarter, learn faster, and stay focused on what matters most.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <><html>
      <body>
        <AuthProvider>
          <Header />
          <GoogleTagManager gtmId="G-5J1WGM88ZS" />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html><Footer /></>

  );
}
