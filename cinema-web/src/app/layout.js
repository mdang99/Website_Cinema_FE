import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import ScrollToTop from "@/components/layout/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cinema",
  description: "Website xem phim Cinema"
};


export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="bg-gradient-to-b from-black via-dark to-black text-white">
        <AuthProvider>
          <Navbar />
          <main className="mx-auto px-[20px] py-6">{children}</main>
          <Footer />
          <ScrollToTop className="fixed bottom-6 right-6" />
        </AuthProvider>
      </body>
    </html>
  );
}
