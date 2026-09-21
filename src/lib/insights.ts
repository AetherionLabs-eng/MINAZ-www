import { createClient } from "@/lib/supabase/server";

export type InsightCategory =
  | "Customs & Regulation"
  | "UK & EU Trade"
  | "Road Freight"
  | "Supply Chain"
  | "Market Intelligence";

export type InsightSource = {
  label: string;
  url: string;
};

export type InsightSection = {
  heading: string;
  paragraphs: string[];
};

export type InsightTimelineItem = {
  date: string;
  title: string;
  text: string;
};

export type Insight = {
  id: string;

  slug: string;
  category: InsightCategory | string;

  title: string;
  subtitle: string | null;
  excerpt: string;
  lead: string | null;

  image: string;
  readingTime: string;

  featured: boolean;
  takeaway: string | null;

  sections: InsightSection[];
  timeline: InsightTimelineItem[];
  sources: InsightSource[];

  seoTitle: string | null;
  seoDescription: string | null;

  publishedAt: string;
  displayDate: string;
};

type InsightRow = {
  id: string;

  slug: string;
  category: string;

  title: string;
  subtitle: string | null;
  excerpt: string;
  lead: string | null;

  image_url: string | null;
  reading_time: string | null;

  featured: boolean;
  takeaway: string | null;

  sections: unknown;
  timeline: unknown;
  sources: unknown;

  seo_title: string | null;
  seo_description: string | null;

  published_at: string;
};

function formatDisplayDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Europe/London",
  })
    .format(new Date(date))
    .toUpperCase();
}

function mapInsight(row: InsightRow): Insight {
  return {
    id: row.id,

    slug: row.slug,
    category: row.category,

    title: row.title,
    subtitle: row.subtitle,
    excerpt: row.excerpt,
    lead: row.lead,

    image: row.image_url || "/insights/placeholder.jpg",
    readingTime: row.reading_time || "5 MIN READ",

    featured: row.featured,
    takeaway: row.takeaway,

    sections: Array.isArray(row.sections)
      ? (row.sections as InsightSection[])
      : [],

    timeline: Array.isArray(row.timeline)
      ? (row.timeline as InsightTimelineItem[])
      : [],

    sources: Array.isArray(row.sources)
      ? (row.sources as InsightSource[])
      : [],

    seoTitle: row.seo_title,
    seoDescription: row.seo_description,

    publishedAt: row.published_at,
    displayDate: formatDisplayDate(row.published_at),
  };
}

const selectFields = `
  id,
  slug,
  category,
  title,
  subtitle,
  excerpt,
  lead,
  image_url,
  reading_time,
  featured,
  takeaway,
  sections,
  timeline,
  sources,
  seo_title,
  seo_description,
  published_at
`;

export async function getPublishedInsights(): Promise<Insight[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("insights")
    .select(selectFields)
    .eq("status", "published")
    .not("published_at", "is", null)
    .order("published_at", {
      ascending: false,
    });

  if (error) {
    console.error("getPublishedInsights:", error);
    return [];
  }

  return (data as InsightRow[]).map(mapInsight);
}

export async function getFeaturedInsight(): Promise<Insight | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("insights")
    .select(selectFields)
    .eq("status", "published")
    .eq("featured", true)
    .not("published_at", "is", null)
    .order("published_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("getFeaturedInsight:", error);
    return null;
  }

  return data ? mapInsight(data as InsightRow) : null;
}

export async function getInsightBySlug(
  slug: string,
): Promise<Insight | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("insights")
    .select(selectFields)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("getInsightBySlug:", error);
    return null;
  }

  return data ? mapInsight(data as InsightRow) : null;
}

export async function getRelatedInsights(
  slug: string,
  limit = 2,
): Promise<Insight[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("insights")
    .select(selectFields)
    .eq("status", "published")
    .neq("slug", slug)
    .order("published_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    console.error("getRelatedInsights:", error);
    return [];
  }

  return (data as InsightRow[]).map(mapInsight);
}

export const insightCategories: InsightCategory[] = [
  "Customs & Regulation",
  "UK & EU Trade",
  "Road Freight",
  "Supply Chain",
  "Market Intelligence",
];