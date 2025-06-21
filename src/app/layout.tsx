import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SellMyMind - Turn Your Mind Into Money",
  description: "Create and sell AI agents trained on your knowledge. No coding needed. Join the waitlist for early access.",
  keywords: "AI agents, artificial intelligence, monetize knowledge, sell expertise, create AI, no coding",
  authors: [{ name: "SellMyMind" }],
  openGraph: {
    title: "SellMyMind - Turn Your Mind Into Money",
    description: "Create and sell AI agents trained on your knowledge. No coding needed.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SellMyMind - Turn Your Mind Into Money",
    description: "Create and sell AI agents trained on your knowledge. No coding needed.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
