"use client";

import { FormEvent, useState } from "react";

type FormState =
  | {
      type: "idle";
      message: "";
      reference?: never;
    }
  | {
      type: "success";
      message: string;
      reference?: string;
    }
  | {
      type: "error";
      message: string;
      reference?: never;
    };

const services = [
  "Road Freight",
  "Air Freight",
  "Ocean Freight",
  "Cargo Express",
  "Logistics",
  "Transport Coordination",
  "Not sure",
];

export default function QuoteForm() {
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

      service: formData.get("service"),

      collection_country:
        formData.get("collection_country"),

      collection_city:
        formData.get("collection_city"),

      delivery_country:
        formData.get("delivery_country"),

      delivery_city:
        formData.get("delivery_city"),

      cargo_description:
        formData.get("cargo_description"),

      weight_kg:
        formData.get("weight_kg"),

      pallets:
        formData.get("pallets"),

      ready_date:
        formData.get("ready_date"),

      additional_information:
        formData.get("additional_information"),

      website:
        formData.get("website"),
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(
          data.error ||
            "Unable to submit your quote request.",
        );
      }

      form.reset();

setState({
  type: "success",
  message:
    "Your freight request has been received. The MINAZ team will review the shipment details.",
  reference:
    typeof data.reference === "string"
      ? data.reference
      : undefined,
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
      className="minaz-form quote-form"
      onSubmit={handleSubmit}
    >
      <div
        className="form-honeypot"
        aria-hidden="true"
      >
        <label htmlFor="quote-website">
          Website
        </label>

        <input
          id="quote-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <section className="quote-form-section">
        <div className="quote-form-section-head">
          <span>01</span>

          <div>
            <small>CONTACT</small>
            <h3>Your details</h3>
          </div>
        </div>

        <div className="form-grid form-grid-two">
          <div className="form-field">
            <label htmlFor="quote-name">
              Name <span>*</span>
            </label>

            <input
              id="quote-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Your name"
            />
          </div>

          <div className="form-field">
            <label htmlFor="quote-company">
              Company
            </label>

            <input
              id="quote-company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Company name"
            />
          </div>
        </div>

        <div className="form-grid form-grid-two">
          <div className="form-field">
            <label htmlFor="quote-email">
              Email <span>*</span>
            </label>

            <input
              id="quote-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="name@company.com"
            />
          </div>

          <div className="form-field">
            <label htmlFor="quote-phone">
              Phone
            </label>

            <input
              id="quote-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+44 ..."
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="quote-service">
            Service
          </label>

          <select
            id="quote-service"
            name="service"
            defaultValue=""
          >
            <option value="" disabled>
              Select a service
            </option>

            {services.map((service) => (
              <option
                value={service}
                key={service}
              >
                {service}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="quote-form-section">
        <div className="quote-form-section-head">
          <span>02</span>

          <div>
            <small>ROUTE</small>
            <h3>Collection & delivery</h3>
          </div>
        </div>

        <div className="quote-route-grid">
          <div className="quote-route-point">
            <span className="quote-route-label">
              A
            </span>

            <div className="form-field">
              <label htmlFor="collection-country">
                Collection country <span>*</span>
              </label>

              <input
                id="collection-country"
                name="collection_country"
                required
                placeholder="United Kingdom"
              />
            </div>

            <div className="form-field">
              <label htmlFor="collection-city">
                Collection city / postcode
              </label>

              <input
                id="collection-city"
                name="collection_city"
                placeholder="Edinburgh / EH..."
              />
            </div>
          </div>

          <div className="quote-route-line">
            <span>→</span>
          </div>

          <div className="quote-route-point">
            <span className="quote-route-label">
              B
            </span>

            <div className="form-field">
              <label htmlFor="delivery-country">
                Delivery country <span>*</span>
              </label>

              <input
                id="delivery-country"
                name="delivery_country"
                required
                placeholder="Germany"
              />
            </div>

            <div className="form-field">
              <label htmlFor="delivery-city">
                Delivery city / postcode
              </label>

              <input
                id="delivery-city"
                name="delivery_city"
                placeholder="Hamburg / 20..."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="quote-form-section">
        <div className="quote-form-section-head">
          <span>03</span>

          <div>
            <small>CARGO</small>
            <h3>Shipment details</h3>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="cargo-description">
            Cargo description <span>*</span>
          </label>

          <textarea
            id="cargo-description"
            name="cargo_description"
            rows={4}
            required
            placeholder="Palletised goods, machinery, cartons, dimensions..."
          />
        </div>

        <div className="form-grid form-grid-three">
          <div className="form-field">
            <label htmlFor="weight">
              Weight (kg)
            </label>

            <input
              id="weight"
              name="weight_kg"
              type="number"
              min="0"
              step="0.01"
              placeholder="1200"
            />
          </div>

          <div className="form-field">
            <label htmlFor="pallets">
              Pallets
            </label>

            <input
              id="pallets"
              name="pallets"
              type="number"
              min="0"
              step="1"
              placeholder="4"
            />
          </div>

          <div className="form-field">
            <label htmlFor="ready-date">
              Ready date
            </label>

            <input
              id="ready-date"
              name="ready_date"
              type="date"
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="additional-information">
            Additional information
          </label>

          <textarea
            id="additional-information"
            name="additional_information"
            rows={5}
            placeholder="Loading requirements, delivery deadline, special handling, reference numbers..."
          />
        </div>
      </section>

      <div className="quote-submit-area">
        <div>
          <small>READY TO SEND?</small>

          <p>
            Review the shipment details before
            submitting your request.
          </p>
        </div>

        <button
          className="button button-primary quote-submit-button"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Submitting..."
            : "Request quote"}

          <span>→</span>
        </button>
      </div>

      {state.type !== "idle" && (
  <div
    className={`form-message form-message-${state.type}`}
    role="status"
  >
    <p>{state.message}</p>

    {state.type === "success" &&
      state.reference && (
        <div className="quote-reference">
          <span>REQUEST REFERENCE</span>

          <strong>
            {state.reference}
          </strong>

          <small>
            Please keep this reference for any
            correspondence regarding this shipment.
          </small>
        </div>
      )}
  </div>
)}
    </form>
  );
}