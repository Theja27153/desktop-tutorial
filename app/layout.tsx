import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://padmavathi-constructions.example.com"),
  title: {
    default: "Padmavathi Constructions | Diversified Commercial Services",
    template: "%s · Padmavathi Constructions",
  },
  description:
    "Padmavathi Constructions builds, manages, and scales multi-sector businesses across construction, consulting, data, hospitality, franchise, and digital media.",
  openGraph: {
    title: "Padmavathi Constructions",
    description:
      "Diversified commercial services partner in Karimnagar delivering construction support, consulting, data services, restaurant operations, franchise management, and digital media.",
    url: "https://padmavathi-constructions.example.com",
    siteName: "Padmavathi Constructions",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
