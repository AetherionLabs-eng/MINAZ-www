import {
  NextRequest,
  NextResponse,
} from "next/server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const allowedStatuses = [
  "new",
  "in_progress",
  "resolved",
  "spam",
];

export async function PATCH(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  const { id } =
    await context.params;

  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  const adminEmail =
    process.env.MINAZ_ADMIN_EMAIL
      ?.trim()
      .toLowerCase();

  if (
    !user ||
    !adminEmail ||
    user.email
      ?.trim()
      .toLowerCase() !==
      adminEmail
  ) {
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

  const body =
    await request.json();

  const status =
    String(
      body.status || "",
    ).toLowerCase();

  if (
    !allowedStatuses.includes(
      status,
    )
  ) {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid status",
      },
      {
        status: 400,
      },
    );
  }

  const admin =
    createAdminClient();

  const { error } =
    await admin
      .from("contact_requests")
      .update({
        status,
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", id);

  if (error) {
    console.error(error);

    return NextResponse.json(
      {
        ok: false,
        error:
          "Unable to update enquiry.",
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({
    ok: true,
  });
}