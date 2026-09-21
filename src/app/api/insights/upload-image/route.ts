import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  timingSafeEqual,
} from "crypto";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const BUCKET =
  "insights-media";

const MAX_FILE_SIZE =
  4 * 1024 * 1024;

const ALLOWED_TYPES = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
} as const;

function secureEqual(
  a: string,
  b: string,
) {
  const aBuffer =
    Buffer.from(a);

  const bBuffer =
    Buffer.from(b);

  if (
    aBuffer.length !==
    bBuffer.length
  ) {
    return false;
  }

  return timingSafeEqual(
    aBuffer,
    bBuffer,
  );
}

function cleanSlug(
  value: string,
) {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /[^a-z0-9-]/g,
      "",
    );
}

async function isAuthorized(
  request: NextRequest,
) {
  /*
   * ---------------------------------------
   * CONTENT FACTORY SECRET
   * ---------------------------------------
   */

  const authorization =
    request.headers.get(
      "authorization",
    );

  const suppliedSecret =
    authorization?.startsWith(
      "Bearer ",
    )
      ? authorization.slice(7)
      : "";

  const expectedSecret =
    process.env
      .CONTENT_FACTORY_SECRET;

  if (
    suppliedSecret &&
    expectedSecret &&
    secureEqual(
      suppliedSecret,
      expectedSecret,
    )
  ) {
    return true;
  }

  /*
   * ---------------------------------------
   * ADMIN SESSION
   * ---------------------------------------
   */

  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const allowedEmail =
    process.env
      .MINAZ_ADMIN_EMAIL
      ?.trim()
      .toLowerCase();

  const userEmail =
    user.email
      ?.trim()
      .toLowerCase();

  return (
    Boolean(allowedEmail) &&
    userEmail === allowedEmail
  );
}

export async function POST(
  request: NextRequest,
) {
  try {
    /*
     * =====================================
     * AUTH
     * =====================================
     */

    const authorized =
      await isAuthorized(request);

    if (!authorized) {
      return NextResponse.json(
        {
          ok: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    /*
     * =====================================
     * FORM DATA
     * =====================================
     */

    const formData =
      await request.formData();

    const slugValue =
      formData.get("slug");

    const fileValue =
      formData.get("file");

    if (
      typeof slugValue !==
      "string"
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Missing article slug.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !(fileValue instanceof File)
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Missing image file.",
        },
        {
          status: 400,
        },
      );
    }

    const slug =
      cleanSlug(slugValue);

    if (!slug) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Invalid article slug.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * =====================================
     * VALIDATE IMAGE
     * =====================================
     */

    const extension =
      ALLOWED_TYPES[
        fileValue.type as keyof typeof ALLOWED_TYPES
      ];

    if (!extension) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Only PNG, JPG and WEBP images are allowed.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      fileValue.size >
      MAX_FILE_SIZE
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Image is too large. Maximum size is 4 MB.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * =====================================
     * SUPABASE
     * =====================================
     */

    const admin =
      createAdminClient();

    /*
     * Article must exist first.
     */

    const {
      data: article,
      error: articleError,
    } =
      await admin
        .from("insights")
        .select(
          `
            id,
            slug,
            image_url
          `,
        )
        .eq(
          "slug",
          slug,
        )
        .maybeSingle();

    if (articleError) {
      console.error(
        "Insight lookup error:",
        articleError,
      );

      return NextResponse.json(
        {
          ok: false,
          error:
            "Unable to find article.",
        },
        {
          status: 500,
        },
      );
    }

    if (!article) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Article does not exist.",
        },
        {
          status: 404,
        },
      );
    }

    /*
     * =====================================
     * CLEAN OLD HERO FILES
     * =====================================
     *
     * Prevent unused files if image format
     * changes later.
     */

    const folder =
      `articles/${slug}`;

    await admin.storage
      .from(BUCKET)
      .remove([
        `${folder}/hero.png`,
        `${folder}/hero.jpg`,
        `${folder}/hero.webp`,
      ]);

    /*
     * =====================================
     * UPLOAD
     * =====================================
     */

    const storagePath =
      `${folder}/hero.${extension}`;

    const bytes =
      Buffer.from(
        await fileValue.arrayBuffer(),
      );

    const {
      error: uploadError,
    } =
      await admin.storage
        .from(BUCKET)
        .upload(
          storagePath,
          bytes,
          {
            contentType:
              fileValue.type,

            cacheControl:
              "31536000",

            upsert: true,
          },
        );

    if (uploadError) {
      console.error(
        "Insight image upload error:",
        uploadError,
      );

      return NextResponse.json(
        {
          ok: false,
          error:
            "Unable to upload image.",
        },
        {
          status: 500,
        },
      );
    }

    /*
     * =====================================
     * PUBLIC URL
     * =====================================
     */

    const {
      data: publicUrlData,
    } =
      admin.storage
        .from(BUCKET)
        .getPublicUrl(
          storagePath,
        );

    const publicUrl =
      publicUrlData.publicUrl;

    /*
     * =====================================
     * UPDATE ARTICLE
     * =====================================
     */

    const {
      data: updatedArticle,
      error: updateError,
    } =
      await admin
        .from("insights")
        .update({
          image_url:
            publicUrl,

          updated_at:
            new Date()
              .toISOString(),
        })
        .eq(
          "slug",
          slug,
        )
        .select(
          `
            id,
            slug,
            title,
            image_url,
            status
          `,
        )
        .single();

    if (updateError) {
      console.error(
        "Insight image DB update error:",
        updateError,
      );

      return NextResponse.json(
        {
          ok: false,
          error:
            "Image uploaded but article update failed.",
        },
        {
          status: 500,
        },
      );
    }

    /*
     * =====================================
     * SUCCESS
     * =====================================
     */

    return NextResponse.json({
      ok: true,

      article:
        updatedArticle,

      storage: {
        bucket: BUCKET,
        path:
          storagePath,
        publicUrl,
      },
    });
  } catch (error) {
    console.error(
      "Insight image upload unexpected error:",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          "Unable to process image upload.",
      },
      {
        status: 500,
      },
    );
  }
}