import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type Section = {
  heading: string;
  paragraphs: string[];
};

type TimelineItem = {
  date: string;
  title: string;
  text: string;
};

type Source = {
  label: string;
  url: string;
};

type PublishPayload = {
  slug?: string;

  category: string;

  title: string;
  subtitle?: string;
  excerpt: string;
  lead?: string;

  image_url?: string;
  reading_time?: string;

  featured?: boolean;

  takeaway?: string;

  sections?: Section[];
  timeline?: TimelineItem[];
  sources?: Source[];

  seo_title?: string;
  seo_description?: string;

  status?: "draft" | "review" | "published";
  published_at?: string;
};

function secureEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validatePayload(payload: PublishPayload) {
  if (!payload.title?.trim()) {
    return "Missing title";
  }

  if (!payload.category?.trim()) {
    return "Missing category";
  }

  if (!payload.excerpt?.trim()) {
    return "Missing excerpt";
  }

  if (payload.sections && !Array.isArray(payload.sections)) {
    return "sections must be an array";
  }

  if (payload.timeline && !Array.isArray(payload.timeline)) {
    return "timeline must be an array";
  }

  if (payload.sources && !Array.isArray(payload.sources)) {
    return "sources must be an array";
  }

  if (payload.sources) {
    for (const source of payload.sources) {
      if (!source.label?.trim()) {
        return "Every source must have a label";
      }

      if (!source.url || !isHttpUrl(source.url)) {
        return `Invalid source URL: ${source.url}`;
      }
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    /*
     * -------------------------------------------------------
     * AUTHORIZATION
     * -------------------------------------------------------
     */

    const expectedSecret = process.env.CONTENT_FACTORY_SECRET;

    if (!expectedSecret) {
      return NextResponse.json(
        {
          ok: false,
          error: "CONTENT_FACTORY_SECRET is not configured",
        },
        { status: 500 },
      );
    }

    const authorization = request.headers.get("authorization");

    const suppliedSecret = authorization?.startsWith("Bearer ")
      ? authorization.slice(7)
      : "";

    if (
      !suppliedSecret ||
      !secureEqual(suppliedSecret, expectedSecret)
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    /*
     * -------------------------------------------------------
     * BODY
     * -------------------------------------------------------
     */

    let payload: PublishPayload;

    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid JSON body",
        },
        { status: 400 },
      );
    }

    const validationError = validatePayload(payload);

    if (validationError) {
      return NextResponse.json(
        {
          ok: false,
          error: validationError,
        },
        { status: 400 },
      );
    }

    /*
     * -------------------------------------------------------
     * ARTICLE VALUES
     * -------------------------------------------------------
     */

    const slug =
      payload.slug?.trim() || slugify(payload.title);

    if (!slug) {
      return NextResponse.json(
        {
          ok: false,
          error: "Unable to generate slug",
        },
        { status: 400 },
      );
    }

    const status = payload.status ?? "published";

    const publishedAt =
      status === "published"
        ? payload.published_at ?? new Date().toISOString()
        : null;

    /*
     * -------------------------------------------------------
     * DATABASE
     * -------------------------------------------------------
     */

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("insights")
      .upsert(
        {
          slug,

          category: payload.category.trim(),

          title: payload.title.trim(),
          subtitle: payload.subtitle?.trim() || null,
          excerpt: payload.excerpt.trim(),
          lead: payload.lead?.trim() || null,

          image_url: payload.image_url?.trim() || null,
          reading_time:
            payload.reading_time?.trim() || "5 MIN READ",

          featured: payload.featured ?? false,

          status,

          takeaway: payload.takeaway?.trim() || null,

          sections: payload.sections ?? [],
          timeline: payload.timeline ?? [],
          sources: payload.sources ?? [],

          seo_title:
            payload.seo_title?.trim() ||
            `${payload.title.trim()} | MINAZ Intelligence`,

          seo_description:
            payload.seo_description?.trim() ||
            payload.excerpt.trim(),

          published_at: publishedAt,
        },
        {
          onConflict: "slug",
        },
      )
      .select(
        `
          id,
          slug,
          title,
          status,
          featured,
          published_at,
          updated_at
        `,
      )
      .single();

    if (error) {
      console.error("Insight publish error:", error);

      return NextResponse.json(
        {
          ok: false,
          error: error.message,
        },
        { status: 500 },
      );
    }

    /*
     * -------------------------------------------------------
     * RESPONSE
     * -------------------------------------------------------
     */

    return NextResponse.json({
      ok: true,

      article: data,

      url:
        status === "published"
          ? `/insights/${data.slug}`
          : null,
    });
  } catch (error) {
    console.error("Unexpected content factory error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}