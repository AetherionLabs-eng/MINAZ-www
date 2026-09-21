import Link from "next/link";
import { notFound } from "next/navigation";

import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";

import AdminStatusSelect from "@/components/admin/AdminStatusSelect";

export const dynamic =
  "force-dynamic";

export default async function ContactDetailPage({
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
    data: contact,
  } =
    await supabase
      .from("contact_requests")
      .select("*")
      .eq("id", id)
      .single();

  if (!contact) {
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
          <Link href="/admin/contacts">
            ← CONTACTS
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
              WEBSITE ENQUIRY
            </span>

            <h1>
              {contact.name}
            </h1>

            <p>
              {contact.subject ||
                "General enquiry"}
            </p>
          </div>

          <AdminStatusSelect
            id={contact.id}
            type="contact"
            currentStatus={
              contact.status
            }
            statuses={[
              "new",
              "in_progress",
              "resolved",
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
              {contact.company ||
                contact.name}
            </h2>

            <dl>
              <div>
                <dt>Name</dt>
                <dd>
                  {contact.name}
                </dd>
              </div>

              <div>
                <dt>Email</dt>

                <dd>
                  <a
                    href={`mailto:${contact.email}`}
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt>Phone</dt>

                <dd>
                  {contact.phone ? (
                    <a
                      href={`tel:${contact.phone}`}
                    >
                      {
                        contact.phone
                      }
                    </a>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
            </dl>
          </section>

          <section className="admin-detail-card admin-detail-wide">
            <span>
              MESSAGE
            </span>

            <h2>
              {contact.subject ||
                "General enquiry"}
            </h2>

            <div className="admin-message-box">
              {contact.message}
            </div>

            <div className="admin-contact-actions">
              <a
                href={`mailto:${contact.email}`}
              >
                REPLY BY EMAIL →
              </a>

              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                >
                  CALL CUSTOMER →
                </a>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}