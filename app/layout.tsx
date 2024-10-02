import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Boost from "./components/Boost";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

const PoppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "Shorten your URLs with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${PoppinsFont.className} min-h-screen antialiased overflow-x-hidden`}
      >
        <Header />
        <Toaster position="top-center" reverseOrder={true} />
        {children}
        <Boost />
        <Footer />
      </body>
    </html>
  );
}
