import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SF Food Truck Finder",
  description:
    "Find food trucks in San Francisco by applicant, street, or location.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a2342] text-white min-h-screen`}
      >
        <main className="max-w-3xl mx-auto py-8 px-4">{children}</main>
      </body>
    </html>
  );
}
