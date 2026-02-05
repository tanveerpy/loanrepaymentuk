import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "UK Director Salary vs Dividend Calculator 2025/26",
    template: "%s | Director Tax Calculator"
  },
  description: "Optimize your 2025/26 Director salary and dividends. Accurate UK tax calculator including Corporation Tax, Student Loans (Plan 1/2/4/5), and National Insurance.",
  metadataBase: new URL("https://directortaxcalculator.com"), // Replace with actual domain when live
  keywords: ["Director Salary Calculator", "Dividend Tax 2025/26", "Corporation Tax Calculator", "UK Tax Calculator", "Efficient Salary 2025"],
  authors: [{ name: "Director Tax Team" }],
  creator: "Director Tax Team",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://directortaxcalculator.com",
    title: "UK Director Salary vs Dividend Calculator 2025/26",
    description: "Maximize your take-home pay. Compare low salary vs high salary strategies for UK Limited Company Directors.",
    siteName: "Director Tax Calculator",
    images: [{
      url: "/og-image.png", // Needs generation
      width: 1200,
      height: 630,
      alt: "Director Tax Calculator Preview"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Director Salary vs Dividend Calculator 2025/26",
    description: "Maximize your take-home pay. Accurate tax modeling for 2025/26.",
    images: ["/og-image.png"], // Needs generation
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
