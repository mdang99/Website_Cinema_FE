import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";

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
          <main className="container mx-auto px-4 py-6">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
