// app/layout.js
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Suspense } from "react";

/**
 * Global Metadata
 * - Keep titles short; use `title.template` for per-page titles.
 * - `themeColor` belongs in the `viewport` export (see below).
 */
export const metadata = {
  metadataBase: new URL("https://sheanicolephotography.com"),
  title: {
    default: "Shea Nicole Photography",
    template: "%s • Shea Nicole Photography",
  },
  description:
    "Photography for families from Rockwall, Texas to Dallas–Fort Worth. Portraits, couples, and lifestyle sessions.",
  icons: {
    icon: [
      { url: "/images/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/images/icons/favicon_32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/images/icons/favicon_192.png",
  },
  openGraph: {
    title: "Shea Nicole Photography",
    description:
      "Photography for families from Rockwall, Texas to Dallas–Fort Worth. Portraits, couples, and lifestyle sessions.",
    url: "https://sheanicolephotography.com",
    siteName: "Shea Nicole Photography",
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630, alt: "Shea Nicole Photography" }],
    locale: "en_US",
    type: "website",
  },
};

/** Viewport (place `themeColor` here, not in metadata) */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F1ED" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Add suppressHydrationWarning on <body> to ignore extension-injected attrs */}
      <body suppressHydrationWarning>
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>

        <main id="main-content">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
