import type { Metadata } from "next";
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields

export const siteMetadata: Metadata = {
  authors: [{ name: "MGSimard", url: "https://mgsimard.dev" }],
  applicationName: "Community Ban List",
  metadataBase: new URL("https://cbl.nexus"),
  title: {
    default: "Community Ban List",
    template: "CBL | %s",
  },
  description: "DESC",
  manifest: "/metadata/manifest.webmanifest",
  icons: [
    { rel: "shortcut icon", url: "/metadata/favicon.ico" },
    { rel: "icon", type: "image/png", sizes: "96x96", url: "/metadata/icon.png" },
    { rel: "icon", type: "image/svg+xml", url: "/metadata/icon.svg" },
    { rel: "apple-touch-icon", sizes: "180x180", url: "/metadata/apple-icon.png" },
  ],
  appleWebApp: {
    title: "Community Ban List",
    statusBarStyle: "black-translucent",
    startupImage: "/metadata/apple-icon.png",
  },
  openGraph: {
    title: "Community Ban List",
    description: "DESC",
    url: "https://cbl.nexus",
    type: "website",
    siteName: "Community Ban List",
    images: [{ url: "http://localhost:3000/metadata/opengraph-image.png", width: 1200, height: 600 }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Community Ban List",
    description: "DESC",
    images: ["/metadata/twitter-image.png"],
    creator: "@MGSimard",
    site: "@MGSimard",
  },
};
