import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diecast Hub - Premium 1:18 Scale Model Cars",
  description: "Discover luxury diecast model cars from the world's finest manufacturers. Premium 1:18 scale collectibles for serious collectors and enthusiasts.",
  keywords: "diecast, model cars, 1:18 scale, collectibles, Hot Wheels, Maisto, luxury cars",
  authors: [{ name: "Diecast Hub" }],
  openGraph: {
    title: "Diecast Hub - Premium Model Cars",
    description: "Your premier destination for high-quality 1:18 scale diecast model cars",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-background antialiased">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
