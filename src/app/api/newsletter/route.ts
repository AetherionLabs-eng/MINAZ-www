import {
  NextRequest,
  NextResponse,
} from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";

import {
  subscribeToNewsletter,
} from "@/lib/getresponse";

import {
  NEWSLETTER_CONSENT_TEXT,
} from "@/lib/newsletter/consent";

export const runtime = "nodejs";

function cleanString(
  value: unknown,
) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function isValidEmail(
  value: string,
) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value,
  );
}

const allowedSources = new Set([
  "website",
  "insights",
  "footer",
]);

export async function POST(
  request: NextRequest,
) {
  try {
    const body =
      await request.json();

    /* BOT HONEYPOT */

    const website =
      cleanString(
        body.website,
      );

    if (website) {
      return NextResponse.json({
        ok: true,
      });
    }

    const name =
      cleanString(
        body.name,
      );

    const email =
      cleanString(
        body.email,
      ).toLowerCase();

    const sourceRaw =
      cleanString(
        body.source,
      );

    const source =
      allowedSources.has(
        sourceRaw,
      )
        ? sourceRaw
        : "website";

    const consent =
      body.consent === true;

    if (!email) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Please enter your email address.",
        },
        {
          status: 400,
        },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    if (!consent) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Please confirm that you would like to receive MINAZ email updates.",
        },
        {
          status: 400,
        },
      );
    }

    const result =
      await subscribeToNewsletter({
        name,
        email,
      });

    const status =
      result.ok
        ? result.status ===
          "already_subscribed"
          ? "existing"
          : "pending_confirmation"
        : "failed";

    const supabase =
      createAdminClient();

    const {
      error: databaseError,
    } =
      await supabase
        .from(
          "newsletter_subscriptions",
        )
        .upsert(
          {
            email,
            name:
              name || null,
            source,
            consent_text:
              NEWSLETTER_CONSENT_TEXT,
            consent_at:
              new Date()
                .toISOString(),
            getresponse_status:
              status,
          },
          {
            onConflict:
              "email",
          },
        );

    if (databaseError) {
      console.error(
        "Newsletter database error:",
        databaseError,
      );
    }

    if (!result.ok) {
      console.error(
        "Newsletter GetResponse error:",
        result,
      );

      return NextResponse.json(
        {
          ok: false,
          error:
            "We could not start the subscription process. Please try again.",
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json({
      ok: true,
      status,
    });
  } catch (error) {
    console.error(
      "Newsletter API unexpected error:",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          "Invalid request. Please try again.",
      },
      {
        status: 400,
      },
    );
  }
}
