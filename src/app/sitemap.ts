import type {
  MetadataRoute,
} from "next";

import {
  getPublishedInsights,
} from "@/lib/insights";

const SITE =
  "https://minaz.co.uk";

export const revalidate =
  3600;

export default async function sitemap():
  Promise<MetadataRoute.Sitemap> {
  const insights =
    await getPublishedInsights();

  const staticPages:
    MetadataRoute.Sitemap =
    [
      {
        url: SITE,
        changeFrequency:
          "weekly",
        priority: 1,
      },

      {
        url:
          `${SITE}/services`,
        changeFrequency:
          "monthly",
        priority: 0.9,
      },

      {
        url:
          `${SITE}/insights`,
        changeFrequency:
          "daily",
        priority: 0.9,
      },

      {
        url:
          `${SITE}/about`,
        changeFrequency:
          "monthly",
        priority: 0.7,
      },

      {
        url:
          `${SITE}/gallery`,
        changeFrequency:
          "weekly",
        priority: 0.7,
      },

      {
        url:
          `${SITE}/contact`,
        changeFrequency:
          "monthly",
        priority: 0.8,
      },

      {
        url:
          `${SITE}/quote`,
        changeFrequency:
          "monthly",
        priority: 0.9,
      },

      {
        url:
          `${SITE}/privacy`,
        changeFrequency:
          "yearly",
        priority: 0.2,
      },

      {
        url:
          `${SITE}/terms`,
        changeFrequency:
          "yearly",
        priority: 0.2,
      },
    ];

  const serviceSlugs = [
    "road-freight",
    "air-freight",
    "ocean-freight",
    "cargo-express",
    "logistics",
    "transport-coordination",
  ];

  const servicePages:
    MetadataRoute.Sitemap =
    serviceSlugs.map(
      (slug) => ({
        url:
          `${SITE}/services/${slug}`,

        changeFrequency:
          "monthly",

        priority: 0.8,
      }),
    );

  const insightPages:
    MetadataRoute.Sitemap =
    insights.map(
      (insight) => ({
        url:
          `${SITE}/insights/${insight.slug}`,

        lastModified:
          insight.publishedAt
            ? new Date(
                insight.publishedAt,
              )
            : undefined,

        changeFrequency:
          "monthly",

        priority: 0.7,
      }),
    );

  return [
    ...staticPages,
    ...servicePages,
    ...insightPages,
  ];
}