"use client";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function AdminLoginForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const formData =
      new FormData(
        event.currentTarget,
      );

    const email =
      String(
        formData.get("email") || "",
      )
        .trim()
        .toLowerCase();

    const password =
      String(
        formData.get("password") || "",
      );

    const supabase =
      createClient();

    const {
      error,
    } =
      await supabase.auth
        .signInWithPassword({
          email,
          password,
        });

    if (error) {
      setError(
        "Invalid email or password.",
      );

      setLoading(false);

      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form
      className="admin-login-form"
      onSubmit={handleSubmit}
    >
      <div className="admin-login-field">
  <label htmlFor="admin-email">
    EMAIL
  </label>

  <input
    id="admin-email"
    name="email"
    type="email"
    required
    autoComplete="email"
    placeholder="office@minaz.co.uk"
    suppressHydrationWarning
  />
</div>

<div className="admin-login-field">
  <label htmlFor="admin-password">
    PASSWORD
  </label>

  <input
    id="admin-password"
    name="password"
    type="password"
    required
    autoComplete="current-password"
    placeholder="••••••••••••"
    suppressHydrationWarning
  />
</div>

      {error && (
        <div className="admin-login-error">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="admin-login-button"
      >
        <span>
          {loading
            ? "Signing in..."
            : "Enter admin"}
        </span>

        <span>→</span>
      </button>
    </form>
  );
}