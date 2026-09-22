import { NextRequest, NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";

import {
  getEmailConfig,
  getResend,
} from "@/lib/email/resend";

import {
  contactAdminEmail,
  contactCustomerEmail,
} from "@/lib/email/templates";

import {
  subscribeToNewsletter,
} from "@/lib/getresponse";

import {
  NEWSLETTER_CONSENT_TEXT,
} from "@/lib/newsletter/consent";

export const runtime = "nodejs";

function cleanString(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function optionalString(value: unknown) {
  const cleaned = cleanString(value);

  return cleaned || null;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value,
  );
}

export async function POST(
  request: NextRequest,
) {
  try {
    const body =
      await request.json();

    /* BOT HONEYPOT */

    const website =
      cleanString(body.website);

    if (website) {
      return NextResponse.json({
        ok: true,
      });
    }

    /* NORMALIZE */

    const name =
      cleanString(body.name);

    const company =
      optionalString(
        body.company,
      );

    const email =
      cleanString(
        body.email,
      ).toLowerCase();

    const phone =
      optionalString(
        body.phone,
      );

    const subject =
      optionalString(
        body.subject,
      );

    const message =
      cleanString(
        body.message,
      );

    const newsletterConsent =
      body.newsletter_consent === true;

    const newsletterConsentAt =
      newsletterConsent
        ? new Date().toISOString()
        : null;

    /* VALIDATION */

    if (
      !name ||
      !email ||
      !message
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Please complete all required fields.",
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

    if (name.length > 200) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Name is too long.",
        },
        {
          status: 400,
        },
      );
    }

    if (message.length > 10000) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Message is too long.",
        },
        {
          status: 400,
        },
      );
    }

    /* SAVE */

    const supabase =
      createAdminClient();

    const {
      data: enquiry,
      error: databaseError,
    } = await supabase
      .from("contact_requests")
      .insert({
        name,
        company,
        email,
        phone,
        subject,
        message,

        newsletter_consent:
          newsletterConsent,

        newsletter_consent_at:
          newsletterConsentAt,

        newsletter_consent_text:
          newsletterConsent
            ? NEWSLETTER_CONSENT_TEXT
            : null,

        status: "new",
        source: "website",
      })
      .select(
        `
          id,
          created_at
        `,
      )
      .single();

    if (databaseError) {
      console.error(
        "Contact database error:",
        databaseError,
      );

      return NextResponse.json(
        {
          ok: false,
          error:
            "Unable to send your message. Please try again.",
        },
        {
          status: 500,
        },
      );
    }

    /* EMAILS */

    let adminNotificationSent =
      false;

    let customerConfirmationSent =
      false;

    try {
      const resend =
        getResend();

      const {
        from,
        admin,
      } = getEmailConfig();

      const results =
        await Promise.allSettled([
          resend.emails.send({
            from,

            to: admin,

            replyTo: email,

            subject:
              `New MINAZ website enquiry — ${
                company || name
              }`,

            html: contactAdminEmail({
              name,
              company,
              email,
              phone,
              subject,
              message,
            }),
          }),

          resend.emails.send({
            from,

            to: email,

            replyTo: admin,

            subject:
              "We received your enquiry | MINAZ",

            html: contactCustomerEmail({
              name,
            }),
          }),
        ]);

      /* ADMIN RESULT */

      const adminResult =
        results[0];

      if (
        adminResult.status ===
        "fulfilled"
      ) {
        if (
          adminResult.value.error
        ) {
          console.error(
            "Admin notification error:",
            adminResult.value.error,
          );
        } else {
          adminNotificationSent =
            true;
        }
      } else {
        console.error(
          "Admin notification failed:",
          adminResult.reason,
        );
      }

      /* CUSTOMER RESULT */

      const customerResult =
        results[1];

      if (
        customerResult.status ===
        "fulfilled"
      ) {
        if (
          customerResult.value.error
        ) {
          console.error(
            "Customer confirmation error:",
            customerResult.value
              .error,
          );
        } else {
          customerConfirmationSent =
            true;
        }
      } else {
        console.error(
          "Customer confirmation failed:",
          customerResult.reason,
        );
      }
    } catch (emailError) {
      console.error(
        "Contact email system error:",
        emailError,
      );
    }

    /* OPTIONAL NEWSLETTER */

    let newsletterSubscriptionStatus:
      | "not_requested"
      | "queued"
      | "already_subscribed"
      | "failed" =
      "not_requested";

    if (newsletterConsent) {
      const result =
        await subscribeToNewsletter({
          name,
          email,
        });

      if (result.ok) {
        newsletterSubscriptionStatus =
          result.status;
      } else {
        newsletterSubscriptionStatus =
          "failed";
      }
    }

    return NextResponse.json({
      ok: true,

      requestId:
        enquiry.id,

      adminNotificationSent,

      customerConfirmationSent,

      newsletterConsent,

      newsletterSubscriptionStatus,
    });
  } catch (error) {
    console.error(
      "Contact API unexpected error:",
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