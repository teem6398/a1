import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/index.css";
import { TranslationProvider } from "./lib/translation-context";
import { ThemeProvider } from "./lib/theme-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "الجامعة | الصفحة الرئيسية",
  description: "موقع الجامعة الرسمي - التميز في التعليم والبحث العلمي",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
        <TranslationProvider>
          {children}
        </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
