import type { Metadata } from "next";

const SITE_URL = "https://minaz.co.uk";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function createMetadata({
  title,
  description,
  path,
  image = "/hero-minaz.jpg",
}: SeoOptions): Metadata {
  const canonical =
    path === "/"
      ? SITE_URL
      : `${SITE_URL}${path}`;

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      type: "website",
      locale: "en_GB",

      title,
      description,

      url: canonical,

      siteName:
        "MINAZ Transport and Logistics",

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title,
      description,

      images: [image],
    },
  };
}