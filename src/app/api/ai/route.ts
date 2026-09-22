import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  getPublishedInsights,
} from "@/lib/insights";

export const runtime = "nodejs";

type HistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

type RateBucket = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS =
  10 * 60 * 1000;

const RATE_LIMIT_MAX =
  12;

const rateBuckets =
  new Map<string, RateBucket>();

function cleanString(
  value: unknown,
) {
  return typeof value ===
    "string"
    ? value.trim()
    : "";
}

function getClientIp(
  request: NextRequest,
) {
  const forwarded =
    request.headers
      .get("x-forwarded-for")
      ?.split(",")[0]
      ?.trim();

  return (
    forwarded ||
    request.headers.get(
      "x-real-ip",
    ) ||
    "unknown"
  );
}

function isRateLimited(
  request: NextRequest,
) {
  const now =
    Date.now();

  const ip =
    getClientIp(request);

  const existing =
    rateBuckets.get(ip);

  if (
    !existing ||
    existing.resetAt <= now
  ) {
    rateBuckets.set(
      ip,
      {
        count: 1,
        resetAt:
          now +
          RATE_LIMIT_WINDOW_MS,
      },
    );

    return false;
  }

  if (
    existing.count >=
    RATE_LIMIT_MAX
  ) {
    return true;
  }

  existing.count += 1;

  return false;
}

function normalizeHistory(
  value: unknown,
): HistoryMessage[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is HistoryMessage =>
        Boolean(
          item &&
            typeof item ===
              "object" &&
            (
              (item as HistoryMessage)
                .role ===
                "user" ||
              (item as HistoryMessage)
                .role ===
                "assistant"
            ) &&
            typeof (
              item as HistoryMessage
            ).content ===
              "string",
        ),
    )
    .slice(-8)
    .map((item) => ({
      role:
        item.role,

      content:
        item.content
          .trim()
          .slice(
            0,
            1600,
          ),
    }));
}

function extractOutputText(
  response: any,
) {
  if (
    typeof response?.output_text ===
    "string" &&
    response.output_text.trim()
  ) {
    return response.output_text.trim();
  }

  const parts: string[] = [];

  for (
    const item of
    response?.output ?? []
  ) {
    if (
      item?.type !==
      "message"
    ) {
      continue;
    }

    for (
      const content of
      item?.content ?? []
    ) {
      if (
        content?.type ===
          "output_text" &&
        typeof content?.text ===
          "string"
      ) {
        parts.push(
          content.text,
        );
      }
    }
  }

  return parts
    .join("\n")
    .trim();
}

export async function POST(
  request: NextRequest,
) {
  try {
    if (
      isRateLimited(request)
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Too many requests. Please try again shortly.",
        },
        {
          status: 429,
        },
      );
    }

    const apiKey =
      process.env
        .OPENAI_API_KEY
        ?.trim();

    if (!apiKey) {
      console.error(
        "MINAZ AI: OPENAI_API_KEY is not configured.",
      );

      return NextResponse.json(
        {
          ok: false,
          error:
            "Assistant is not configured.",
        },
        {
          status: 503,
        },
      );
    }

    const body =
      await request.json();

    const message =
      cleanString(
        body.message,
      ).slice(
        0,
        1200,
      );

    if (!message) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Please enter a question.",
        },
        {
          status: 400,
        },
      );
    }

    const history =
      normalizeHistory(
        body.history,
      );

    let insightContext = "";

    try {
      const insights =
        (
          await getPublishedInsights()
        ).slice(0, 5);

      if (insights.length) {
        insightContext =
          "\n\nRECENT MINAZ INTELLIGENCE:\n" +
          insights
            .map(
              (article) =>
                `- ${article.title}: ${article.excerpt} URL: https://minaz.co.uk/insights/${article.slug}`,
            )
            .join("\n");
      }
    } catch (error) {
      console.error(
        "MINAZ AI insight context error:",
        error,
      );
    }

    const instructions = `
You are MINAZ AI, the website assistant for MINAZ Transport and Logistics Ltd.

COMPANY:
MINAZ TRANSPORT AND LOGISTICS LTD
Company No. SC882408
5 South Charlotte Street, Edinburgh EH2 4AN, United Kingdom
Email: office@minaz.co.uk
Phone: +44 770 481 5760
Website: https://minaz.co.uk

SERVICES:
- Road Freight
- Air Freight
- Ocean Freight
- Cargo Express
- Logistics
- Transport Coordination

ROLE:
Help visitors understand MINAZ services, website content, freight/logistics concepts, recent MINAZ Intelligence articles, and how to request a quote.

STYLE:
Professional, concise, useful, calm, business-focused. Use British English by default. If the visitor writes in another language, answer in that language.

STRICT RULES:
- Never invent freight rates, transit times, shipment status, customer names, partnerships, fleet ownership, licences, routes, warehouses, performance statistics or capabilities not supplied in this context.
- MINAZ is a freight forwarding and logistics coordination company. Do not imply it owns trucks, aircraft, vessels or warehouses unless explicitly stated in provided context.
- Do not claim that a shipment is booked, tracked, insured or confirmed.
- For a price, specific route feasibility, booking, urgent shipment or detailed cargo request, direct the visitor to https://minaz.co.uk/quote.
- For account-specific or shipment-specific information, tell the visitor to contact the MINAZ team.
- Do not ask for highly sensitive information.
- Stay within MINAZ, freight, logistics, trade, website navigation and directly related topics. For unrelated requests, politely explain that you are the MINAZ freight and logistics assistant.
- When citing a recent MINAZ Intelligence article, give its minaz.co.uk URL if relevant.
${insightContext}
`.trim();

    const input = [
      ...history,
      {
        role: "user",
        content:
          message,
      },
    ];

    const model =
      process.env
        .OPENAI_ASSISTANT_MODEL
        ?.trim() ||
      "gpt-5.4-mini";

    const openAiResponse =
      await fetch(
        "https://api.openai.com/v1/responses",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${apiKey}`,
          },

          body:
            JSON.stringify({
              model,
              instructions,
              input,
              max_output_tokens:
                550,
              store: false,
            }),

          signal:
            AbortSignal.timeout(
              25000,
            ),
        },
      );

    const data =
      await openAiResponse.json();

    if (
      !openAiResponse.ok
    ) {
      console.error(
        "MINAZ AI OpenAI error:",
        openAiResponse.status,
        data,
      );

      return NextResponse.json(
        {
          ok: false,
          error:
            "Assistant is temporarily unavailable.",
        },
        {
          status: 502,
        },
      );
    }

    const answer =
      extractOutputText(data);

    if (!answer) {
      console.error(
        "MINAZ AI returned no text:",
        data,
      );

      return NextResponse.json(
        {
          ok: false,
          error:
            "Assistant returned an empty response.",
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json({
      ok: true,
      answer,
      model,
    });
  } catch (error) {
    console.error(
      "MINAZ AI unexpected error:",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          "Assistant is temporarily unavailable.",
      },
      {
        status: 500,
      },
    );
  }
}
