import Link from "next/link";

import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";

import AdminStatusSelect from "@/components/admin/AdminStatusSelect";

export const dynamic =
  "force-dynamic";

function date(value: string) {
  return new Intl.DateTimeFormat(
    "en-GB",
    {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Europe/London",
    },
  ).format(
    new Date(value),
  );
}

function reference(
  id: string,
) {
  return `MINAZ-${id
    .replaceAll("-", "")
    .slice(0, 8)
    .toUpperCase()}`;
}

export default async function QuotesPage() {
  await requireAdmin();

  const supabase =
    createAdminClient();

  const {
    data: quotes,
    error,
  } =
    await supabase
      .from("quote_requests")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false,
        },
      );

  if (error) {
    throw new Error(
      error.message,
    );
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <Link
            href="/admin"
            className="admin-logo"
          >
            MINAZ
          </Link>

          <small>
            OPERATIONS
          </small>
        </div>

        <div className="admin-header-right">
          <Link href="/admin">
            DASHBOARD
          </Link>

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

      <section className="admin-list-page">
        <div className="admin-list-head">
          <div>
            <span>
              FREIGHT REQUESTS
            </span>

            <h1>
              QUOTE
              <br />
              <strong>
                REQUESTS.
              </strong>
            </h1>
          </div>

          <div className="admin-list-count">
            <span>TOTAL</span>

            <strong>
              {(quotes?.length ?? 0)
                .toString()
                .padStart(
                  2,
                  "0",
                )}
            </strong>
          </div>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>REFERENCE</th>
                <th>DATE</th>
                <th>CUSTOMER</th>
                <th>ROUTE</th>
                <th>SERVICE</th>
                <th>STATUS</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {quotes?.map(
                (quote) => (
                  <tr key={quote.id}>
                    <td>
                      <strong className="admin-reference">
                        {reference(
                          quote.id,
                        )}
                      </strong>
                    </td>

                    <td>
                      {date(
                        quote.created_at,
                      )}
                    </td>

                    <td>
                      <strong>
                        {quote.company ||
                          quote.name}
                      </strong>

                      <small>
                        {quote.email}
                      </small>
                    </td>

                    <td>
                      <span className="admin-route">
                        {
                          quote.collection_country
                        }
                        <b>→</b>
                        {
                          quote.delivery_country
                        }
                      </span>
                    </td>

                    <td>
                      {quote.service ||
                        "—"}
                    </td>

                    <td>
                      <AdminStatusSelect
                        id={quote.id}
                        type="quote"
                        currentStatus={
                          quote.status
                        }
                        statuses={[
                          "new",
                          "reviewing",
                          "quoted",
                          "won",
                          "lost",
                          "spam",
                        ]}
                      />
                    </td>

                    <td>
                      <Link
                        className="admin-open"
                        href={`/admin/quotes/${quote.id}`}
                      >
                        OPEN →
                      </Link>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}