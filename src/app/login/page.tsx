import type {
  Metadata,
} from "next";

import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login | MINAZ",

  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  redirect(
    "/admin/login",
  );
}