import Link from "next/link";
import { notFound } from "next/navigation";

import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";

import AdminStatusSelect from "@/components/admin/AdminStatusSelect";

export const dynamic =
  "force-dynamic";

function reference(
  id: string,
) {
  return `MINAZ-${id
    .replaceAll("-", "")
    .slice(0, 8)
    .toUpperCase()}`;
}

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  await requireAdmin();

  const { id } =
    await params;

  const supabase =
    createAdminClient();

  const {
    data: quote,
  } =
    await supabase
      .from("quote_requests")
      .select("*")
      .eq("id", id)
      .single();

  if (!quote) {
    notFound();
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
          <Link href="/admin/quotes">
            ← QUOTES
          </Link>

          <Link href="/admin">
            DASHBOARD
          </Link>
        </div>
      </header>

      <section className="admin-detail-page">
        <div className="admin-detail-head">
          <div>
            <span>
              FREIGHT REQUEST
            </span>

            <h1>
              {reference(
                quote.id,
              )}
            </h1>

            <p>
              {quote.collection_country}
              {" → "}
              {quote.delivery_country}
            </p>
          </div>

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
        </div>

        <div className="admin-detail-grid">
          <section className="admin-detail-card">
            <span>
              CUSTOMER
            </span>

            <h2>
              {quote.name}
            </h2>

            <dl>
              <div>
                <dt>Company</dt>
                <dd>
                  {quote.company ||
                    "—"}
                </dd>
              </div>

              <div>
                <dt>Email</dt>

                <dd>
                  <a
                    href={`mailto:${quote.email}`}
                  >
                    {quote.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt>Phone</dt>

                <dd>
                  {quote.phone ? (
                    <a
                      href={`tel:${quote.phone}`}
                    >
                      {
                        quote.phone
                      }
                    </a>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>

              <div>
                <dt>Service</dt>
                <dd>
                  {quote.service ||
                    "—"}
                </dd>
              </div>
            </dl>
          </section>

          <section className="admin-detail-card admin-detail-card-red">
            <span>
              ROUTE
            </span>

            <div className="admin-big-route">
              <div>
                <small>
                  COLLECTION
                </small>

                <strong>
                  {
                    quote.collection_country
                  }
                </strong>

                <p>
                  {quote.collection_city ||
                    "—"}
                </p>
              </div>

              <b>→</b>

              <div>
                <small>
                  DELIVERY
                </small>

                <strong>
                  {
                    quote.delivery_country
                  }
                </strong>

                <p>
                  {quote.delivery_city ||
                    "—"}
                </p>
              </div>
            </div>
          </section>

          <section className="admin-detail-card admin-detail-wide">
            <span>
              CARGO
            </span>

            <h2>
              Shipment details
            </h2>

            <dl className="admin-cargo-data">
              <div>
                <dt>
                  Weight
                </dt>

                <dd>
                  {quote.weight_kg
                    ? `${quote.weight_kg} kg`
                    : "—"}
                </dd>
              </div>

              <div>
                <dt>
                  Pallets
                </dt>

                <dd>
                  {quote.pallets ??
                    "—"}
                </dd>
              </div>

              <div>
                <dt>
                  Ready date
                </dt>

                <dd>
                  {quote.ready_date ||
                    "—"}
                </dd>
              </div>
            </dl>

            <div className="admin-message-box">
              {
                quote.cargo_description
              }
            </div>

            {quote.additional_information && (
              <>
                <h3>
                  Additional information
                </h3>

                <div className="admin-message-box">
                  {
                    quote.additional_information
                  }
                </div>
              </>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}