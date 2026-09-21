import type {
  MetadataRoute,
} from "next";

export default function robots():
  MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",

        allow: "/",

        disallow: [
          "/admin/",
          "/api/",
        ],
      },
    ],

    sitemap:
      "https://minaz.co.uk/sitemap.xml",

    host:
      "https://minaz.co.uk",
  };
}