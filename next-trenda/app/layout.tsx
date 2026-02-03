import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trenda - Your Creative Platform",
  description: "Build, Learn, and Create with Trenda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
