import type { Metadata } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "The Vent Men | Video-Verified Duct Cleaning in Calgary",
  description:
    "Calgary's trusted furnace and duct cleaning service. We show up on time, document everything on video, and prove your system is clean. Get your instant quote today.",
  keywords: [
    "duct cleaning Calgary",
    "furnace cleaning Calgary",
    "HVAC cleaning",
    "air duct cleaning",
    "video verified cleaning",
    "Calgary duct cleaners",
  ],
  authors: [{ name: "The Vent Men" }],
  openGraph: {
    title: "The Vent Men | Video-Verified Duct Cleaning",
    description:
      "Furnace cleaning you can actually trust. We document everything on video.",
    url: "https://theventmen.ca",
    siteName: "The Vent Men",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${sourceSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
