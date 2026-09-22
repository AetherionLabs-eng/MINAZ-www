import {
  NextRequest,
  NextResponse,
} from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";

import {
  getEmailConfig,
  getResend,
} from "@/lib/email/resend";

import {
  quoteAdminEmail,
  quoteCustomerEmail,
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
  const cleaned =
    cleanString(value);

  return cleaned || null;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value,
  );
}

function optionalNumber(
  value: unknown,
) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const parsed =
    Number(value);

  if (
    !Number.isFinite(parsed) ||
    parsed < 0
  ) {
    return null;
  }

  return parsed;
}

function optionalInteger(
  value: unknown,
) {
  const parsed =
    optionalNumber(value);

  if (parsed === null) {
    return null;
  }

  return Math.floor(parsed);
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

    /* CONTACT */

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

    const service =
      optionalString(
        body.service,
      );

    const newsletterConsent =
      body.newsletter_consent === true;

    const newsletterConsentAt =
      newsletterConsent
        ? new Date().toISOString()
        : null;

    /* ROUTE */

    const collectionCountry =
      cleanString(
        body.collection_country,
      );

    const collectionCity =
      optionalString(
        body.collection_city,
      );

    const deliveryCountry =
      cleanString(
        body.delivery_country,
      );

    const deliveryCity =
      optionalString(
        body.delivery_city,
      );

    /* CARGO */

    const cargoDescription =
      cleanString(
        body.cargo_description,
      );

    const weightKg =
      optionalNumber(
        body.weight_kg,
      );

    const pallets =
      optionalInteger(
        body.pallets,
      );

    const readyDate =
      optionalString(
        body.ready_date,
      );

    const additionalInformation =
      optionalString(
        body.additional_information,
      );

    /* VALIDATION */

    if (
      !name ||
      !email ||
      !collectionCountry ||
      !deliveryCountry ||
      !cargoDescription
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

    if (
      cargoDescription.length >
      10000
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Cargo description is too long.",
        },
        {
          status: 400,
        },
      );
    }

    /* DATABASE */

    const supabase =
      createAdminClient();

    const {
      data: quote,
      error: databaseError,
    } = await supabase
      .from("quote_requests")
      .insert({
        name,
        company,
        email,
        phone,

        service,

        collection_country:
          collectionCountry,

        collection_city:
          collectionCity,

        delivery_country:
          deliveryCountry,

        delivery_city:
          deliveryCity,

        cargo_description:
          cargoDescription,

        weight_kg:
          weightKg,

        pallets,

        ready_date:
          readyDate,

        additional_information:
          additionalInformation,

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
        "Quote database error:",
        databaseError,
      );

      return NextResponse.json(
        {
          ok: false,
          error:
            "Unable to submit the quote request. Please try again.",
        },
        {
          status: 500,
        },
      );
    }

    /* REFERENCE */

    const reference =
      `MINAZ-${quote.id
        .replaceAll("-", "")
        .slice(0, 8)
        .toUpperCase()}`;

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

      const routeLabel =
        `${collectionCountry}` +
        ` → ` +
        `${deliveryCountry}`;

      const results =
        await Promise.allSettled([
          /*
           * ADMIN
           */
          resend.emails.send({
            from,

            to: admin,

            replyTo: email,

            subject:
              `New MINAZ freight quote — ${routeLabel}`,

            html: quoteAdminEmail({
              name,
              company,
              email,
              phone,

              service,

              collection_country:
                collectionCountry,

              collection_city:
                collectionCity,

              delivery_country:
                deliveryCountry,

              delivery_city:
                deliveryCity,

              cargo_description:
                cargoDescription,

              weight_kg:
                weightKg,

              pallets,

              ready_date:
                readyDate,

              additional_information:
                additionalInformation,
            }),
          }),

          /*
           * CUSTOMER
           */
          resend.emails.send({
            from,

            to: email,

            replyTo: admin,

            subject:
              `Freight request received — ${reference} | MINAZ`,

            html: quoteCustomerEmail({
              name,

              reference,

              collectionCountry,

              deliveryCountry,
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
            "Quote admin email error:",
            adminResult.value.error,
          );
        } else {
          adminNotificationSent =
            true;
        }
      } else {
        console.error(
          "Quote admin email failed:",
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
            "Quote customer email error:",
            customerResult.value
              .error,
          );
        } else {
          customerConfirmationSent =
            true;
        }
      } else {
        console.error(
          "Quote customer email failed:",
          customerResult.reason,
        );
      }
    } catch (emailError) {
      console.error(
        "Quote email system error:",
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
        quote.id,

      reference,

      adminNotificationSent,

      customerConfirmationSent,

      newsletterConsent,

      newsletterSubscriptionStatus,
    });
  } catch (error) {
    console.error(
      "Quote API unexpected error:",
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