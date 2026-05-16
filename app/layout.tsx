import type { Metadata } from "next";
import "@fontsource/material-symbols-outlined";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FAB } from "@/components/fab";
import { siteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: siteContent.layout.title,
  description: siteContent.layout.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground pb-24 md:pb-0">
        <Header />
        {children}
        <Footer />
        <FAB />
      </body>
    </html>
  );
}
