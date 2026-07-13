import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WormGear B2B - Professional Reducers & Motors",
  description: "High-quality worm gear reducers and industrial motors for B2B global supply.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <footer className="bg-slate-900 text-slate-400 p-8 text-center border-t border-slate-800">
          <p>&copy; 2026 WormGear B2B. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
