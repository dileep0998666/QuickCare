import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/auth-context";


export const metadata: Metadata = {
  title: "QuickCare - Healthcare Management System",
  description: "Modern healthcare appointment booking and management platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts CDN */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto+Mono:wght@100..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
