import type { ReactNode } from "react";
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { Error } from "@/_components/Core/Error";
import { NotFound } from "@/_components/Core/NotFound";
import { NavStateContextProvider } from "@/_components/Nav/NavContextProvider";
import { Nav } from "@/_components/Nav/Nav";
import { Footer } from "@/_components/Core/Footer";
import globalCss from "@/_styles/globals.css?url";
import fontsCss from "@/_styles/fonts.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  errorComponent: (props) => {
    return (
      <RootDocument>
        <Error {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  // https://tanstack.com/router/latest/docs/framework/react/guide/document-head-management
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { author: "MGSimard" },
      {
        title: "Community Ban List",
      },
      { description: "A community-driven effort to identify and track disruptive players in League of Legends." },
      { name: "application-name", content: "Community Ban List" },
      { name: "apple-mobile-web-app-title", content: "Community Ban List" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "theme-color", content: "#c89c3c" },
      { name: "msapplication-TileColor", content: "#c89c3c" },
      // Open Graph / Facebook
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cbl-temp.netlify.app/" },
      { property: "og:title", content: "Community Ban List" },
      { property: "og:site_name", content: "Community Ban List" },
      {
        property: "og:description",
        content: "A community-driven effort to identify and track disruptive players in League of Legends.",
      },
      { property: "og:image", content: "https://cbl-temp.netlify.app/metadata/opengraph-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "600" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: "https://cbl-temp.netlify.app/" },
      { name: "twitter:creator", content: "@MGSimard" },
      { name: "twitter:title", content: "Community Ban List" },
      {
        name: "twitter:description",
        content: "CBL: A community-driven effort to identify and track disruptive players in League of Legends.",
      },
      { name: "twitter:image", content: "https://cbl-temp.netlify.app/metadata/twitter-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: globalCss },
      { rel: "stylesheet", href: fontsCss },
      { rel: "canonical", href: "https://cbl-temp.netlify.app/" },
      { rel: "manifest", href: "/metadata/manifest.webmanifest" },
      { rel: "shortcut icon", href: "/metadata/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/metadata/icon.png" },
      { rel: "icon", type: "image/svg+xml", href: "/metadata/icon.svg" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/metadata/apple-icon.png" },
      { rel: "apple-touch-startup-image", href: "/metadata/apple-icon.png" },
      {
        rel: "preload",
        href: "/assets/header_4k.webp",
        as: "image",
        type: "image/webp",
        fetchPriority: "high",
      },
      {
        rel: "preload",
        href: "/assets/dot-pattern.svg",
        as: "image",
        type: "image/svg+xml",
        fetchPriority: "high",
      },
      {
        rel: "preload",
        href: "/fonts/BeaufortForLOL/BFL-bold.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
        fetchPriority: "high",
      },
      {
        rel: "preload",
        href: "/fonts/Spiegel/spiegel-regular.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
        fetchPriority: "high",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <NavStateContextProvider>
          <Nav />
        </NavStateContextProvider>
        {children}
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}
