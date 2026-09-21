import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact MINAZ | Transport and Logistics",
  description:
    "Contact MINAZ Transport and Logistics in Edinburgh for freight forwarding, transport and logistics enquiries.",
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-grid" />

        <Header />

        <div className="container contact-hero-inner">
          <div>
            <div className="service-breadcrumb">
              <Link href="/">MINAZ</Link>
              <span>/</span>
              <strong>CONTACT</strong>
            </div>

            <span className="service-kicker">
              01 / CONTACT MINAZ
            </span>

            <h1>
              START THE
              <br />
              <span>CONVERSATION.</span>
            </h1>
          </div>

          <div className="contact-hero-copy">
            <p>
              Talk to MINAZ about freight, logistics,
              transport coordination or an upcoming
              shipment.
            </p>

            <p>
              Our Edinburgh office supports businesses
              moving goods across the United Kingdom,
              Europe and international markets.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-main">
        <div className="container contact-main-grid">
          <aside className="contact-details">
            <span className="section-index">
              02 / CONTACT
            </span>

            <h2>
              EDINBURGH
              <br />
              <strong>UNITED KINGDOM.</strong>
            </h2>

            <div className="contact-detail-list">
              <div>
                <small>EMAIL</small>

                <a href="mailto:office@minaz.co.uk">
                  office@minaz.co.uk
                </a>
              </div>

              <div>
                <small>PHONE</small>

                <a href="tel:+447704815760">
                  +44 770 481 5760
                </a>
              </div>

              <div>
                <small>OFFICE</small>

                <p>
                  5 South Charlotte Street
                  <br />
                  Edinburgh EH2 4AN
                  <br />
                  United Kingdom
                </p>
              </div>

              <div>
                <small>COMPANY</small>

                <strong>
                  MINAZ TRANSPORT AND LOGISTICS LTD
                </strong>

                <p>Company No. SC882408</p>
              </div>
            </div>

            <a
              className="contact-map-link"
              href="https://www.google.com/maps/search/?api=1&query=5+South+Charlotte+Street,+Edinburgh+EH2+4AN,+United+Kingdom"
              target="_blank"
              rel="noopener noreferrer"
            >
              VIEW LOCATION <span>↗</span>
            </a>
          </aside>

          <div className="contact-form-panel">
            <div className="contact-form-head">
              <span>GENERAL ENQUIRY</span>

              <h2>
                HOW CAN
                <br />
                WE HELP?
              </h2>

              <p>
                For shipment pricing, use our dedicated
                quote form. For everything else, send us
                a message below.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <section className="contact-quote-link">
        <div className="container contact-quote-inner">
          <div>
            <span>HAVE A SHIPMENT?</span>

            <h2>
              REQUEST A
              <strong> FREIGHT QUOTE.</strong>
            </h2>
          </div>

          <Link
            href="/quote"
            className="button button-dark"
          >
            Get a quote <span>→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}