import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Suspense } from "react";

export const metadata = {
  title: "Shea Nicole Photography",
  description: "Photography for families from Rockwall, Texas to Dallas-Fort Worth.",
  icons: {
    icon: [
      { url: "/images/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/images/icons/favicon_32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/images/icons/favicon_192.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}

