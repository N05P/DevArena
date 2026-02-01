import type { Metadata } from "next";
import {Schibsted_Grotesk, Martian_Mono, Noto_Sans_Samaritan} from "next/font/google";
import "./globals.css";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const MartianMono = Martian_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevArena",
  description: "The Hub for Every Developer Event You won't miss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${schibstedGrotesk.variable} ${MartianMono.variable} min-h-screen antialiased`}
      >
      <Navbar/>
      <div className="absolute inset-0 top-0 z-[-1] min-h-screen ">
          <LightRays
              raysOrigin="bottom-center"
              raysColor="#5dfeca"
              raysSpeed={1}
              lightSpread={0}
              rayLength={1.4}
              followMouse={true}
              mouseInfluence={0.02}
              noiseAmount={0.0}
              distortion={0.01}
          />
      </div>
      <main>
          {children}
      </main>

      </body>
    </html>
  );
}
