import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Node.js Event Loop – Visual Explanation",
  description:
    "An interactive and visual explanation of how the Node.js Event Loop works — including phases, callbacks, timers, and async operations. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.",
  keywords: [
    "Node.js",
    "Event Loop",
    "Asynchronous JavaScript",
    "Concurrency",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "JavaScript internals",
    "Node.js architecture"
  ],
  authors: [{ name: "Suneel Kumar" }],
  icons: {
    icon: "/Event-loop/nodejs-event-loop-official.png", // ✅ Adjusted for GitHub Pages path
  },
  openGraph: {
    title: "Node.js Event Loop - Visual Explanation",
    description:
      "Explore the Node.js Event Loop visually. Learn how async tasks, timers, and callbacks flow through each phase.",
    url: "https://suneelkumarr.github.io/Event-loop",
    siteName: "Node.js Event Loop",
    type: "website",
    images: [
      {
        url: "https://suneelkumarr.github.io/Event-loop/nodejs-event-loop-official.png",
        width: 1200,
        height: 630,
        alt: "Node.js Event Loop Diagram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Node.js Event Loop – Visual Explanation",
    description:
      "Understand the Node.js Event Loop visually with an interactive Next.js project.",
    images: [
      "https://suneelkumarr.github.io/Event-loop/nodejs-event-loop-official.png",
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
