import Link from "next/link";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <Header />

      <section className="container not-found-inner">
        <span>
          ERROR / 404
        </span>

        <h1>
          ROUTE
          <br />

          <strong>
            NOT FOUND.
          </strong>
        </h1>

        <p>
          The page you are looking for
          does not exist or has moved.
        </p>

        <Link
          href="/"
          className="button button-primary"
        >
          Return home
          <span>→</span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}