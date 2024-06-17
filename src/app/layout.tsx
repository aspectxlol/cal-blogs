import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CaL-Blogs",
  description: "Calvin and Louie does Blogs and other fun Stuff",
  authors: [
    { name: "Louie", url: "https://github.com/aspectxlol" },
    { name: "Calvin", url: "https://cal-blogs.vercel.app/about-us/calvin" }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
