import type { Metadata } from "next";

import "./globals.css";

import AppShell from "@/components/layout/AppShell";
import ToastProvider from "@/components/ui/ToastProvider";

export const metadata: Metadata = {
  title: "HomeFlow CRM",
  description: "Ingatlan CRM",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="hu">
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased">
        <ToastProvider>
          <AppShell>
            {children}
          </AppShell>
        </ToastProvider>
      </body>
    </html>
  );
}