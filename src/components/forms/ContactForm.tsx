"use client";

import { FormEvent, useState } from "react";

type FormState =
  | { type: "idle"; message: "" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState<FormState>({
    type: "idle",
    message: "",
  });

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setLoading(true);

    setState({
      type: "idle",
      message: "",
    });

    const payload = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),

      // Honeypot
      website: formData.get("website"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(
          data.error || "Unable to send your message.",
        );
      }

      form.reset();

      setState({
        type: "success",
        message:
          "Your message has been received. The MINAZ team will review your enquiry.",
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
      className="minaz-form"
      onSubmit={handleSubmit}
    >
      <div
        className="form-honeypot"
        aria-hidden="true"
      >
        <label htmlFor="contact-website">
          Website
        </label>

        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="form-grid form-grid-two">
        <div className="form-field">
          <label htmlFor="contact-name">
            Name <span>*</span>
          </label>

          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your name"
          />
        </div>

        <div className="form-field">
          <label htmlFor="contact-company">
            Company
          </label>

          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
          />
        </div>
      </div>

      <div className="form-grid form-grid-two">
        <div className="form-field">
          <label htmlFor="contact-email">
            Email <span>*</span>
          </label>

          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="name@company.com"
          />
        </div>

        <div className="form-field">
          <label htmlFor="contact-phone">
            Phone
          </label>

          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+44 ..."
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="contact-subject">
          Subject
        </label>

        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder="How can we help?"
        />
      </div>

      <div className="form-field">
        <label htmlFor="contact-message">
          Message <span>*</span>
        </label>

        <textarea
          id="contact-message"
          name="message"
          required
          rows={7}
          placeholder="Tell us about your enquiry."
        />
      </div>

      <div className="form-submit-row">
        <button
          className="button button-primary form-submit"
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send enquiry"}

          <span>→</span>
        </button>

        <span className="form-required">
          * REQUIRED FIELDS
        </span>
      </div>

      {state.type !== "idle" && (
        <div
          className={`form-message form-message-${state.type}`}
          role="status"
        >
          {state.message}
        </div>
      )}
    </form>
  );
}