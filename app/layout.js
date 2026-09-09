import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; // Your custom global styles should go below Bootstrap
import BootstrapClient from './components/BootstrapClient/BootsrapClient.js';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Reel Buzz - Latest TV & Movie Trailers",
  description: "Get a sneak peak of your favorite movies and tv shows",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children} <BootstrapClient /></body>
    </html>
  );
}
