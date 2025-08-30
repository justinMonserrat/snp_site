import "./globals.css";

export const metadata = {
  title: "SNP Photography",
  description: "Portraits, events, and brand photography.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
