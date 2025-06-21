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
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.svg",
        color: "#8b5cf6",
      },
    ],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: "SellMyMind - Turn Your Mind Into Money",
    description: "Create and sell AI agents trained on your knowledge. No coding needed.",
    type: "website",
    siteName: "SellMyMind",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SellMyMind - Turn Your Mind Into Money",
    description: "Create and sell AI agents trained on your knowledge. No coding needed.",
    creator: "@SellMyMind",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
