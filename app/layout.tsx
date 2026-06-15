import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://altimamillwork.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Altima Millwork Blog | Commercial Interiors & Custom Millwork",
    template: "%s | Altima Millwork"
  },
  description:
    "Commercial renovation, bespoke millwork, cabinetry, casework, and interior build insights from Altima Millwork in Brampton and the GTA.",
  openGraph: {
    title: "Altima Millwork Blog",
    description:
      "Expert insights for commercial interiors, architectural millwork, cabinetry, and turnkey renovation projects.",
    url: "/",
    siteName: "Altima Millwork",
    images: [
      {
        url: "/assets/slider1.jpg",
        width: 1400,
        height: 900,
        alt: "Altima Millwork commercial interior project"
      }
    ],
    locale: "en_CA",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Altima Millwork Blog",
    description:
      "Commercial renovation and custom millwork insights from Altima Millwork.",
    images: ["/assets/slider1.jpg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
