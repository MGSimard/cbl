import localFont from "next/font/local";

export const beaufortForLol = localFont({
  variable: "--fontHeading",
  fallback: ["Times New Roman", "Georgia", "Garamond", "Times", "serif"],
  src: [
    {
      path: "../styles/fonts/BeaufortForLoL/BFL-light.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../styles/fonts/BeaufortForLoL/BFL-light-italic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../styles/fonts/BeaufortForLoL/BFL-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/fonts/BeaufortForLoL/BFL-regular-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../styles/fonts/BeaufortForLoL/BFL-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../styles/fonts/BeaufortForLoL/BFL-medium-italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../styles/fonts/BeaufortForLoL/BFL-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../styles/fonts/BeaufortForLoL/BFL-bold-italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../styles/fonts/BeaufortForLoL/BFL-heavy.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../styles/fonts/BeaufortForLoL/BFL-heavy-italic.woff2",
      weight: "800",
      style: "italic",
    },
  ],
});

export const spiegel = localFont({
  variable: "--fontText",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "avenir next",
    "avenir",
    "segoe ui",
    "helvetica neue",
    "helvetica",
    "Cantarell",
    "Ubuntu",
    "roboto",
    "noto",
    "arial",
    "sans-serif",
  ],
  src: [
    {
      path: "../styles/fonts/Spiegel/spiegel-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/fonts/Spiegel/spiegel-regular-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../styles/fonts/Spiegel/spiegel-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../styles/fonts/Spiegel/spiegel-semibold-italic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../styles/fonts/Spiegel/spiegel-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../styles/fonts/Spiegel/spiegel-bold-italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
});
