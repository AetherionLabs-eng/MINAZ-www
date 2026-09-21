import "server-only";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase =
    await createClient();

  const {
    data: {
      user,
    },
  } =
    await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const allowedEmail =
    process.env.MINAZ_ADMIN_EMAIL
      ?.trim()
      .toLowerCase();

  const userEmail =
    user.email
      ?.trim()
      .toLowerCase();

  if (
    !allowedEmail ||
    userEmail !== allowedEmail
  ) {
    await supabase.auth.signOut();

    redirect("/admin/login");
  }

  return user;
}