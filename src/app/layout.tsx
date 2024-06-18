import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
      <body className={inter.className}>
      {/* <div className="fixed text-blue-50 font-bold text-9xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        <h1 className="hidden sm:block">sm</h1>
        <h1 className="hidden md:block">md</h1>
        <h1 className="hidden lg:block">lg</h1>
        <h1 className="hidden xl:block">xl</h1>
      </div> */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
