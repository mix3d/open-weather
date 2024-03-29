import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather by Zipcode",
  description: "Using OpenWeatherMap APIs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gradient-to-b from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-900">
      <body className={inter.className + " "}>{children}</body>
    </html>
  );
}
