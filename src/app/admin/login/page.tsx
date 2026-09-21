import type { Metadata } from "next";

import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "MINAZ Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <main className="admin-login-page">
      <div className="admin-login-grid" />

      <section className="admin-login-card">
        <div className="admin-login-brand">
          <span>MINAZ</span>
          <small>TRANSPORT AND LOGISTICS</small>
        </div>

        <div className="admin-login-heading">
          <span>ADMINISTRATION</span>

          <h1>
            OPERATIONS
            <br />
            <strong>CONTROL.</strong>
          </h1>

          <p>
            Secure access to website enquiries and
            freight quote requests.
          </p>
        </div>

        <AdminLoginForm />
      </section>
    </main>
  );
}