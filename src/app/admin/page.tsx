import Link from "next/link";

import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();

  const supabase =
    createAdminClient();

  const [
    quoteResult,
    contactResult,
    newQuoteResult,
    newContactResult,
  ] =
    await Promise.all([
      supabase
        .from("quote_requests")
        .select("*", {
          count: "exact",
          head: true,
        }),

      supabase
        .from("contact_requests")
        .select("*", {
          count: "exact",
          head: true,
        }),

      supabase
        .from("quote_requests")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq(
          "status",
          "new",
        ),

      supabase
        .from("contact_requests")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq(
          "status",
          "new",
        ),
    ]);

  const totalQuotes =
    quoteResult.count ?? 0;

  const totalContacts =
    contactResult.count ?? 0;

  const newQuotes =
    newQuoteResult.count ?? 0;

  const newContacts =
    newContactResult.count ?? 0;

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <span className="admin-logo">
            MINAZ
          </span>

          <small>
            OPERATIONS
          </small>
        </div>

        <div className="admin-header-right">
          <span>
            WEBSITE CONTROL
          </span>

          <form
            action="/api/admin/logout"
            method="POST"
          >
            <button type="submit">
              SIGN OUT
            </button>
          </form>
        </div>
      </header>

      <section className="admin-dashboard">
        <div className="admin-dashboard-head">
          <span>
            CONTROL CENTRE
          </span>

          <h1>
            GOOD
            <br />
            <strong>AFTERNOON.</strong>
          </h1>

          <p>
            Website enquiries and freight
            requests from MINAZ customers.
          </p>
        </div>

        <div className="admin-stat-grid">
          <article>
            <span>
              01
            </span>

            <small>
              NEW QUOTES
            </small>

            <strong>
              {newQuotes
                .toString()
                .padStart(
                  2,
                  "0",
                )}
            </strong>
          </article>

          <article>
            <span>
              02
            </span>

            <small>
              NEW ENQUIRIES
            </small>

            <strong>
              {newContacts
                .toString()
                .padStart(
                  2,
                  "0",
                )}
            </strong>
          </article>

          <article>
            <span>
              03
            </span>

            <small>
              TOTAL QUOTES
            </small>

            <strong>
              {totalQuotes
                .toString()
                .padStart(
                  2,
                  "0",
                )}
            </strong>
          </article>

          <article>
            <span>
              04
            </span>

            <small>
              TOTAL CONTACTS
            </small>

            <strong>
              {totalContacts
                .toString()
                .padStart(
                  2,
                  "0",
                )}
            </strong>
          </article>
        </div>

        <div className="admin-module-grid">
          <Link
            href="/admin/quotes"
            className="admin-module admin-module-red"
          >
            <span>
              FREIGHT
            </span>

            <h2>
              QUOTE
              <br />
              REQUESTS
            </h2>

            <p>
              Review incoming shipment
              requests and manage quotation
              status.
            </p>

            <strong>
              OPEN MODULE →
            </strong>
          </Link>

          <Link
            href="/admin/contacts"
            className="admin-module"
          >
            <span>
              CONTACT
            </span>

            <h2>
              WEBSITE
              <br />
              ENQUIRIES
            </h2>

            <p>
              Review general enquiries
              submitted through the MINAZ
              website.
            </p>

            <strong>
              OPEN MODULE →
            </strong>
          </Link>
        </div>
      </section>
    </main>
  );
}