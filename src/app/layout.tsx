import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/Sidebar";
import DroughtBackdrop from "@/components/DroughtBackdrop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CASCADE | Drought Intelligence",
  description: "Advanced agricultural drought monitoring and impact analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#06110D] text-emerald-50 overflow-x-hidden relative pb-16 md:pb-8`}>
        
        <DroughtBackdrop />

        <div className="relative z-10 flex min-h-screen flex-col md:flex-row">
          <Sidebar />
          
          <div className="flex-1 w-full max-w-full overflow-y-auto animate-fade-in-up">
            {children}
          </div>
        </div>

        {/* Live Telemetry Ticker - FIXED: Added whitespace-nowrap and flex-shrink-0 */}
        <div className="fixed bottom-[60px] md:bottom-0 left-0 w-full h-8 bg-[#040D0A]/90 border-t border-emerald-900/50 z-40 overflow-hidden flex items-center backdrop-blur-md pointer-events-none">
           <div className="ticker-scroll flex whitespace-nowrap gap-12 text-[10px] font-mono text-emerald-500 tracking-widest font-bold pr-12 w-max">
              
              {/* Set 1 */}
              <span className="flex-shrink-0">[SYSTEM] LIVE TELEMETRY STREAM ACTIVE</span>
              <span className="flex-shrink-0 text-cyan-400 drop-shadow-[0_0_5px_#38BDF8]">◆ SENSOR 04 (UPPER BASIN): MOISTURE DROP -2.1%</span>
              <span className="flex-shrink-0 text-emerald-400">◆ SENSOR 12 (EASTERN): NOMINAL</span>
              <span className="flex-shrink-0 text-amber-400 drop-shadow-[0_0_5px_#F59E0B]">◆ ALERT: SOIL TEMP ELEVATED IN SECTOR 7</span>
              <span className="flex-shrink-0">◆ NETWORK LATENCY: 12ms</span>
              <span className="flex-shrink-0 text-cyan-400">◆ SENSOR 09 (CENTRAL): RAINFALL DETECTED +4.2mm</span>
              <span className="flex-shrink-0">[SYSTEM] END OF STREAM</span>

              {/* Set 2 (Exact Duplicate for Seamless Looping) */}
              <span className="flex-shrink-0">[SYSTEM] LIVE TELEMETRY STREAM ACTIVE</span>
              <span className="flex-shrink-0 text-cyan-400 drop-shadow-[0_0_5px_#38BDF8]">◆ SENSOR 04 (UPPER BASIN): MOISTURE DROP -2.1%</span>
              <span className="flex-shrink-0 text-emerald-400">◆ SENSOR 12 (EASTERN): NOMINAL</span>
              <span className="flex-shrink-0 text-amber-400 drop-shadow-[0_0_5px_#F59E0B]">◆ ALERT: SOIL TEMP ELEVATED IN SECTOR 7</span>
              <span className="flex-shrink-0">◆ NETWORK LATENCY: 12ms</span>
              <span className="flex-shrink-0 text-cyan-400">◆ SENSOR 09 (CENTRAL): RAINFALL DETECTED +4.2mm</span>
              <span className="flex-shrink-0">[SYSTEM] END OF STREAM</span>

           </div>
        </div>
      </body>
    </html>
  );
}