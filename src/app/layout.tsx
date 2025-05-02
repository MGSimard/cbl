import type { Metadata, Viewport } from "next";
import { siteMetadata } from "@/utils/siteMetadata";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "next-themes";
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
    <html lang="en" suppressHydrationWarning className={`${beaufortForLol.variable} ${spiegel.variable}`}>
      <body>
        <ThemeProvider defaultTheme="dark" enableSystem={false}>
          <ThemeToggle />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
