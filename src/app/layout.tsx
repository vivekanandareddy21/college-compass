import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "College Compass | Find and Compare Your Dream Colleges",
  description: "Secure your future. Search, filter, compare, and bookmark top colleges across the nation with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col justify-between antialiased`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1 bg-slate-50/50">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
