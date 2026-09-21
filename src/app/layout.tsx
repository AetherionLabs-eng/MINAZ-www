import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/legal/CookieConsent";
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://minaz.co.uk"),

  title: {
    default: "MINAZ Transport and Logistics",
    template: "%s | MINAZ",
  },

  description:
    "UK-based freight forwarding and logistics coordination connecting businesses across the United Kingdom, Europe and international markets.",

  applicationName: "MINAZ Transport and Logistics",

  authors: [
    {
      name: "MINAZ Transport and Logistics Ltd",
    },
  ],

  creator: "MINAZ Transport and Logistics Ltd",
  publisher: "MINAZ Transport and Logistics Ltd",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "MINAZ Transport and Logistics",

    title: "MINAZ Transport and Logistics",

    description:
      "UK-based freight forwarding and logistics coordination connecting businesses across the United Kingdom, Europe and international markets.",

    url: "https://minaz.co.uk",

    images: [
      {
        url: "/hero-minaz.jpg",
        width: 1200,
        height: 630,
        alt: "MINAZ Transport and Logistics",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "MINAZ Transport and Logistics",

    description:
      "UK-based freight forwarding and logistics coordination connecting businesses across the United Kingdom, Europe and international markets.",

    images: ["/hero-minaz.jpg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>{children}
        <CookieConsent />
      </body>
    </html>
  );
}