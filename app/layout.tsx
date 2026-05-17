import type { Metadata } from "next";
import "@fontsource/material-symbols-outlined";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
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
      <body className="min-h-full bg-background text-foreground">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
