import type { Metadata, Viewport } from "next";
import { siteMetadata } from "@/utils/siteMetadata";
import { ReactScan } from "@/components/ReactScan";
import { PreloadForce } from "@/components/PreloadForce";
import { Footer } from "@/components/Footer";
import { beaufortForLol, spiegel } from "@/utils/localFonts";
import "@/styles/globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#010a13" },
  ],
};
export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${beaufortForLol.variable} ${spiegel.variable}`}>
      {/* <ReactScan /> */}
      <body>
        <PreloadForce />
        {children}
        <Footer />
      </body>
    </html>
  );
}
