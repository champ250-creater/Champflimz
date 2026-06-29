import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/layout/Navbar"; // Will rebuild this

const fontDisplay = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const fontUi = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ChampFlimz | Premium Cinematic Streaming",
  description: "Experience the next generation of movie and series streaming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${fontDisplay.variable} ${fontUi.variable} ${fontMono.variable} antialiased min-h-screen flex flex-col`}>
        {/* <Navbar /> */}
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
