import type {
  Metadata,
} from "next";

import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title:
    "Subscription confirmed",

  description:
    "Your MINAZ Intelligence email subscription has been confirmed.",

  robots: {
    index: false,
    follow: false,
  },
};

export default function NewsletterConfirmedPage() {
  return (
    <main className="newsletter-confirmed-page">
      <section className="newsletter-confirmed-hero">
        <div className="newsletter-confirmed-grid" />

        <Header />

        <div className="container newsletter-confirmed-inner">
          <span>
            MINAZ INTELLIGENCE
          </span>

          <h1>
            SUBSCRIPTION
            <br />

            <strong>
              CONFIRMED.
            </strong>
          </h1>

          <p>
            You are now subscribed to MINAZ Transport and Logistics email
            updates and market intelligence.
          </p>

          <div className="newsletter-confirmed-actions">
            <Link
              href="/insights"
              className="button button-primary"
            >
              Explore Insights
              <span>→</span>
            </Link>

            <Link
              href="/"
              className="button button-secondary"
            >
              Back to MINAZ
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
