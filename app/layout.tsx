import type { Metadata } from "next";
import { OfflineHelperBot } from "@/components/OfflineHelperBot";
import { GSAPConfig } from "@/components/GSAPConfig";
import { WelcomeGate } from "@/components/WelcomeGate";
import { WaveBackground } from "@/components/WaveBackground";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = Sora({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Money Mentor",
  description: "Smart Financial Advisor for India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} antialiased`}
    >
      <body className="bg-slate-950 text-slate-100 selection:bg-blue-500/30">
        <GSAPConfig />
        <WaveBackground />
        <SmoothScroll>
          <WelcomeGate>
            {children}
            <OfflineHelperBot />
          </WelcomeGate>
        </SmoothScroll>
      </body>
    </html>
  );
}
