import "server-only";

import { Resend } from "resend";

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }

  return new Resend(apiKey);
}

export function getEmailConfig() {
  const from =
    process.env.RESEND_FROM_EMAIL ||
    "MINAZ Website <website@minaz.co.uk>";

  const admin =
    process.env.MINAZ_ADMIN_EMAIL ||
    "office@minaz.co.uk";

  return {
    from,
    admin,
  };
}