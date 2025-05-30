import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ComparisonProvider } from "@/context/ComparisonContext";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediFind - Find the Best Hospitals",
  description: "Find and book appointments at the best hospitals near you",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <ComparisonProvider>
            {children}
          </ComparisonProvider>
        </Providers>
      </body>
    </html>
  );
}
