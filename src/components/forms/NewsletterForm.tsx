"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  NEWSLETTER_CONSENT_TEXT,
} from "@/lib/newsletter/consent";

type NewsletterFormProps = {
  source?:
    | "website"
    | "insights"
    | "footer";
  compact?: boolean;
};

type State =
  | {
      type: "idle";
      message: "";
    }
  | {
      type:
        | "success"
        | "error";
      message: string;
    };

export default function NewsletterForm({
  source = "website",
  compact = false,
}: NewsletterFormProps) {
  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    state,
    setState,
  ] = useState<State>({
    type: "idle",
    message: "",
  });

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form =
      event.currentTarget;

    const formData =
      new FormData(form);

    const payload = {
      name:
        formData.get(
          "name",
        ),

      email:
        formData.get(
          "email",
        ),

      consent:
        formData.get(
          "consent",
        ) === "on",

      source,

      website:
        formData.get(
          "website",
        ),
    };

    setLoading(true);

    setState({
      type: "idle",
      message: "",
    });

    try {
      const response =
        await fetch(
          "/api/newsletter",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                payload,
              ),
          },
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.ok
      ) {
        throw new Error(
          data.error ||
            "Unable to subscribe.",
        );
      }

      form.reset();

      setState({
        type: "success",
        message:
          data.status ===
          "existing"
            ? "This email is already on the MINAZ mailing list."
            : "Almost done. Please check your inbox and confirm your subscription.",
      });
    } catch (error) {
      setState({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className={
        compact
          ? "newsletter-form newsletter-form-compact"
          : "newsletter-form"
      }
      onSubmit={
        handleSubmit
      }
    >
      <div
        className="form-honeypot"
        aria-hidden="true"
      >
        <label
          htmlFor={`newsletter-website-${source}`}
        >
          Website
        </label>

        <input
          id={`newsletter-website-${source}`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="newsletter-form-fields">
        <div className="newsletter-form-field">
          <label
            htmlFor={`newsletter-name-${source}`}
          >
            Name
          </label>

          <input
            id={`newsletter-name-${source}`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
          />
        </div>

        <div className="newsletter-form-field newsletter-form-field-email">
          <label
            htmlFor={`newsletter-email-${source}`}
          >
            Email
          </label>

          <input
            id={`newsletter-email-${source}`}
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="name@company.com"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="newsletter-form-button"
        >
          <span>
            {loading
              ? "SUBSCRIBING..."
              : "SUBSCRIBE"}
          </span>

          <strong>
            →
          </strong>
        </button>
      </div>

      <label
        className="newsletter-form-consent"
        htmlFor={`newsletter-consent-${source}`}
      >
        <input
          id={`newsletter-consent-${source}`}
          name="consent"
          type="checkbox"
          required
        />

        <span>
          {
            NEWSLETTER_CONSENT_TEXT
          }{" "}

          <a href="/privacy">
            Privacy Policy
          </a>
        </span>
      </label>

      {state.type !==
        "idle" && (
        <div
          className={`newsletter-form-message newsletter-form-message-${state.type}`}
          role="status"
        >
          {
            state.message
          }
        </div>
      )}
    </form>
  );
}
