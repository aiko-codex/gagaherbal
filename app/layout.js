import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import AnnouncementBar from "@/components/ui/announcement-bar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
});

export const metadata = {
  title: "GagaHerbal",
  description: "Premium Herbal Products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${lato.variable} antialiased font-sans high-quality-text`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <AnnouncementBar />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
