import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Navbar from '@/components/Navbar';
<<<<<<< HEAD
import { Toaster } from 'sonner';
=======
import { ChatbotWindow } from '@/components/Chatbot/ChatbotWindow';
>>>>>>> 453a17177f6c8d34d4d8d1ba476894a9cc2a80b4

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextStep.ai - AI-Powered Career Development",
  description: "Transform your career with AI-powered tools for resume optimization, interview preparation, and personalized career guidance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" richColors />
        <Navbar />
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
        <ChatbotWindow />
      </body>
    </html>
  );
}
