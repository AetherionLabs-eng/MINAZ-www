import {
  NextRequest,
  NextResponse,
} from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const BUCKET = "insights-media";

const MAX_IMAGE_SIZE =
  8 * 1024 * 1024;

const MIME_TYPES: Record<
  string,
  string
> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function isAuthorized(
  request: NextRequest,
) {
  const authorization =
    request.headers.get(
      "authorization",
    );

  const token =
    authorization?.startsWith(
      "Bearer ",
    )
      ? authorization.slice(7)
      : "";

  const cronSecret =
    process.env.CRON_SECRET;

  /*
   * CONTENT_FACTORY_SECRET is accepted as
   * a secondary option for manual testing.
   */
  const factorySecret =
    process.env
      .CONTENT_FACTORY_SECRET;

  return Boolean(
    token &&
      (
        token === cronSecret ||
        token === factorySecret
      ),
  );
}

function validateSourceUrl(
  value: string,
) {
  try {
    const url =
      new URL(value);

    if (
      url.protocol !==
      "https:"
    ) {
      return false;
    }

    const host =
      url.hostname.toLowerCase();

    if (
      host === "localhost" ||
      host === "::1" ||
      host.startsWith(
        "127.",
      ) ||
      host.startsWith(
        "10.",
      ) ||
      host.startsWith(
        "192.168.",
      ) ||
      host.startsWith(
        "169.254.",
      )
    ) {
      return false;
    }

    const match =
      host.match(
        /^172\.(\d+)\./,
      );

    if (match) {
      const second =
        Number(match[1]);

      if (
        second >= 16 &&
        second <= 31
      ) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

async function processJob(
  job: {
    id: string;
    insight_slug: string;
    source_url: string;
    attempts: number;
  },
) {
  const supabase =
    createAdminClient();

  const attempt =
    job.attempts + 1;

  /*
   * Lock job logically.
   */

  const {
    error: processingError,
  } =
    await supabase
      .from(
        "insight_media_jobs",
      )
      .update({
        status:
          "processing",

        attempts:
          attempt,

        error:
          null,
      })
      .eq(
        "id",
        job.id,
      );

  if (processingError) {
    throw processingError;
  }

  try {
    if (
      !validateSourceUrl(
        job.source_url,
      )
    ) {
      throw new Error(
        "Invalid source image URL.",
      );
    }

    /*
     * Download image from temporary
     * external media URL.
     */

    const response =
      await fetch(
        job.source_url,
        {
          signal:
            AbortSignal.timeout(
              20_000,
            ),

          headers: {
            "User-Agent":
              "MINAZ-Content-Factory/1.0",
          },
        },
      );

    if (!response.ok) {
      throw new Error(
        `Image download failed: ${response.status}`,
      );
    }

    const contentType =
      response.headers
        .get("content-type")
        ?.split(";")[0]
        .trim()
        .toLowerCase();

    if (
      !contentType ||
      !MIME_TYPES[
        contentType
      ]
    ) {
      throw new Error(
        `Unsupported image type: ${
          contentType ||
          "unknown"
        }`,
      );
    }

    const extension =
      MIME_TYPES[
        contentType
      ];

    const arrayBuffer =
      await response.arrayBuffer();

    if (
      arrayBuffer.byteLength >
      MAX_IMAGE_SIZE
    ) {
      throw new Error(
        "Image exceeds 8 MB limit.",
      );
    }

    /*
     * Verify article still exists.
     */

    const {
      data: article,
      error: articleError,
    } =
      await supabase
        .from("insights")
        .select(
          `
            id,
            slug,
            status
          `,
        )
        .eq(
          "slug",
          job.insight_slug,
        )
        .maybeSingle();

    if (articleError) {
      throw articleError;
    }

    if (!article) {
      throw new Error(
        "Article no longer exists.",
      );
    }

    /*
     * Storage directory:
     *
     * insights-media/
     *   articles/
     *     article-slug/
     */

    const folder =
      `articles/${job.insight_slug}`;

    /*
     * Remove previous article hero
     * images if this article gets
     * regenerated later.
     */

    const {
      data: existingFiles,
    } =
      await supabase.storage
        .from(BUCKET)
        .list(
          folder,
          {
            limit: 100,
          },
        );

    if (
      existingFiles &&
      existingFiles.length > 0
    ) {
      const paths =
        existingFiles.map(
          (file) =>
            `${folder}/${file.name}`,
        );

      await supabase.storage
        .from(BUCKET)
        .remove(paths);
    }

    /*
     * Unique filename avoids stale CDN
     * cache after regeneration.
     */

    const storagePath =
      `${folder}/hero-${job.id}.${extension}`;

    const {
      error: uploadError,
    } =
      await supabase.storage
        .from(BUCKET)
        .upload(
          storagePath,
          Buffer.from(
            arrayBuffer,
          ),
          {
            contentType,
            cacheControl:
              "31536000",
            upsert: true,
          },
        );

    if (uploadError) {
      throw uploadError;
    }

    /*
     * Permanent Supabase CDN URL.
     */

    const {
      data: publicData,
    } =
      supabase.storage
        .from(BUCKET)
        .getPublicUrl(
          storagePath,
        );

    const permanentUrl =
      publicData.publicUrl;

    /*
     * Only NOW publish article.
     */

    const now =
      new Date()
        .toISOString();

    const {
      error: publishError,
    } =
      await supabase
        .from("insights")
        .update({
          image_url:
            permanentUrl,

          status:
            "published",

          published_at:
            now,

          updated_at:
            now,
        })
        .eq(
          "slug",
          job.insight_slug,
        );

    if (publishError) {
      throw publishError;
    }

    /*
     * Job finished.
     */

    const {
      error: doneError,
    } =
      await supabase
        .from(
          "insight_media_jobs",
        )
        .update({
          status:
            "done",

          error:
            null,
        })
        .eq(
          "id",
          job.id,
        );

    if (doneError) {
      throw doneError;
    }

    return {
      id:
        job.id,

      slug:
        job.insight_slug,

      status:
        "done",

      imageUrl:
        permanentUrl,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown error";

    /*
     * Retry max 3 times.
     */

    await supabase
      .from(
        "insight_media_jobs",
      )
      .update({
        status:
          attempt >= 3
            ? "failed"
            : "pending",

        error:
          message.slice(
            0,
            2000,
          ),
      })
      .eq(
        "id",
        job.id,
      );

    return {
      id:
        job.id,

      slug:
        job.insight_slug,

      status:
        attempt >= 3
          ? "failed"
          : "retry",

      error:
        message,
    };
  }
}

export async function GET(
  request: NextRequest,
) {
  if (
    !isAuthorized(request)
  ) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const supabase =
    createAdminClient();

  /*
   * Process oldest jobs first.
   */

  const {
    data: jobs,
    error,
  } =
    await supabase
      .from(
        "insight_media_jobs",
      )
      .select(
        `
          id,
          insight_slug,
          source_url,
          attempts
        `,
      )
      .eq(
        "status",
        "pending",
      )
      .order(
        "created_at",
        {
          ascending: true,
        },
      )
      .limit(5);

  if (error) {
    console.error(
      "Media job query error:",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          "Unable to retrieve media jobs.",
      },
      {
        status: 500,
      },
    );
  }

  if (
    !jobs ||
    jobs.length === 0
  ) {
    return NextResponse.json({
      ok: true,
      processed: 0,
      results: [],
    });
  }

  const results = [];

  /*
   * Sequential processing is intentional:
   * avoids unnecessary memory spikes.
   */

  for (const job of jobs) {
    const result =
      await processJob(
        job,
      );

    results.push(
      result,
    );
  }

  return NextResponse.json({
    ok: true,

    processed:
      results.length,

    results,
  });
}