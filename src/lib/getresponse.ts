type SubscribeToNewsletterInput = {
  name: string;
  email: string;
};

export type NewsletterSubscriptionResult =
  | {
      ok: true;
      status: "queued" | "already_subscribed";
    }
  | {
      ok: false;
      status: "not_configured" | "failed";
      httpStatus?: number;
      error?: string;
    };

const GETRESPONSE_API_URL =
  "https://api.getresponse.com/v3";

export async function subscribeToNewsletter({
  name,
  email,
}: SubscribeToNewsletterInput): Promise<NewsletterSubscriptionResult> {
  const apiKey =
    process.env.GETRESPONSE_API_KEY?.trim();

  const campaignId =
    process.env.GETRESPONSE_CAMPAIGN_ID?.trim();

  if (!apiKey || !campaignId) {
    console.error(
      "GetResponse is not configured: missing GETRESPONSE_API_KEY or GETRESPONSE_CAMPAIGN_ID.",
    );

    return {
      ok: false,
      status: "not_configured",
    };
  }

  try {
    const response = await fetch(
      `${GETRESPONSE_API_URL}/contacts`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": `api-key ${apiKey}`,
        },

        body: JSON.stringify({
          name: name.trim().slice(0, 128),
          email: email.trim().toLowerCase(),

          campaign: {
            campaignId,
          },
        }),

        cache: "no-store",

        signal: AbortSignal.timeout(8000),
      },
    );

    if (response.status === 202) {
      return {
        ok: true,
        status: "queued",
      };
    }

    if (response.status === 409) {
      return {
        ok: true,
        status: "already_subscribed",
      };
    }

    const responseText =
      await response.text();

    console.error(
      "GetResponse subscription error:",
      response.status,
      responseText,
    );

    return {
      ok: false,
      status: "failed",
      httpStatus: response.status,
      error: responseText.slice(0, 2000),
    };
  } catch (error) {
    console.error(
      "GetResponse request failed:",
      error,
    );

    return {
      ok: false,
      status: "failed",
      error:
        error instanceof Error
          ? error.message
          : "Unknown GetResponse error",
    };
  }
}
