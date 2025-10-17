import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Reel Buzz - TV Shows | Movies | Get a sneak peak of your favorite movies and tv shows",
  description: "Get a sneak peak of your favorite movies and tv shows",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
