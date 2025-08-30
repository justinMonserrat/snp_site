import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Shea Nicole Photography",
  description: "Portraits, events, and brand photography.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
