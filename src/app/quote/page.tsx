import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QuoteForm from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Freight Quote | MINAZ",
  description:
    "Request a freight transport quote from MINAZ Transport and Logistics for UK, European and international cargo movements.",
};

export default function QuotePage() {
  return (
    <main className="quote-page">
      <section className="quote-hero">
        <div className="quote-grid" />

        <Header />

        <div className="container quote-hero-inner">
          <div>
            <div className="service-breadcrumb">
              <Link href="/">MINAZ</Link>
              <span>/</span>
              <strong>GET A QUOTE</strong>
            </div>

            <span className="service-kicker">
              01 / FREIGHT REQUEST
            </span>

            <h1>
              TELL US
              <br />
              WHAT NEEDS
              <br />
              <span>TO MOVE.</span>
            </h1>
          </div>

          <div className="quote-hero-copy">
            <p>
              Share the route, cargo and timing
              requirements for your shipment.
            </p>

            <p>
              MINAZ will use the information to review
              the movement and coordinate the appropriate
              freight solution.
            </p>

            <div className="quote-hero-meta">
              <span>ROAD</span>
              <i />
              <span>AIR</span>
              <i />
              <span>OCEAN</span>
              <i />
              <span>EXPRESS</span>
            </div>
          </div>
        </div>
      </section>

      <section className="quote-main">
        <div className="container quote-main-grid">
          <aside className="quote-sidebar">
            <span className="section-index">
              02 / REQUEST
            </span>

            <h2>
              ONE FORM.
              <br />
              <strong>ONE FLOW.</strong>
            </h2>

            <p>
              Provide as much shipment detail as
              possible. Better information helps us
              understand the movement more accurately.
            </p>

            <div className="quote-sidebar-process">
              <div>
                <span>01</span>
                <strong>SUBMIT</strong>
              </div>

              <div>
                <span>02</span>
                <strong>REVIEW</strong>
              </div>

              <div>
                <span>03</span>
                <strong>COORDINATE</strong>
              </div>
            </div>
          </aside>

          <div className="quote-form-panel">
            <QuoteForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}