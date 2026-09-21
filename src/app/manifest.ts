import type { MetadataRoute } from "next";

export default function manifest():
  MetadataRoute.Manifest {
  return {
    name:
      "MINAZ Transport and Logistics",

    short_name:
      "MINAZ",

    description:
      "UK-based freight forwarding and logistics coordination.",

    start_url: "/",

    display: "standalone",

    background_color:
      "#07111c",

    theme_color:
      "#07111c",

    categories: [
      "business",
      "transportation",
      "logistics",
    ],

    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },

      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}