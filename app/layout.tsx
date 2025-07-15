import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/app/lib/auth-context';
import Header from '@/app/components/ui/header';
import Footer from '@/app/components/footer/Footer';
import Script from "next/script";

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
  other: {
    "trustpilot-one-time-domain-verification-id": "eb1264c5-2004-4891-bca6-d141907824b9"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="trustpilot-one-time-domain-verification-id" content="eb1264c5-2004-4891-bca6-d141907824b9"/>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body>
        <AuthProvider>
          <Header />
          {/* Google Analytics Implementation */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-5J1WGM88ZS"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5J1WGM88ZS');
            `}
          </Script>
          <Script
            src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
            strategy="afterInteractive"
            type="text/javascript"
          />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}