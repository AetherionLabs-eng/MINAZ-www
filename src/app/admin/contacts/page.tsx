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

export default async function ContactsPage() {
  await requireAdmin();

  const supabase =
    createAdminClient();

  const {
    data: contacts,
    error,
  } =
    await supabase
      .from("contact_requests")
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
        </div>
      </header>

      <section className="admin-list-page">
        <div className="admin-list-head">
          <div>
            <span>
              WEBSITE CONTACT
            </span>

            <h1>
              CUSTOMER
              <br />
              <strong>
                ENQUIRIES.
              </strong>
            </h1>
          </div>

          <div className="admin-list-count">
            <span>TOTAL</span>

            <strong>
              {(contacts?.length ?? 0)
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
                <th>DATE</th>
                <th>NAME</th>
                <th>COMPANY</th>
                <th>SUBJECT</th>
                <th>STATUS</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {contacts?.map(
                (contact) => (
                  <tr key={contact.id}>
                    <td>
                      {date(
                        contact.created_at,
                      )}
                    </td>

                    <td>
                      <strong>
                        {contact.name}
                      </strong>

                      <small>
                        {contact.email}
                      </small>
                    </td>

                    <td>
                      {contact.company ||
                        "—"}
                    </td>

                    <td>
                      {contact.subject ||
                        "General enquiry"}
                    </td>

                    <td>
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
                    </td>

                    <td>
                      <Link
                        className="admin-open"
                        href={`/admin/contacts/${contact.id}`}
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