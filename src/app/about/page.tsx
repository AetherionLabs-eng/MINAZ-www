import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About MINAZ | Transport and Logistics",
  description:
    "MINAZ Transport and Logistics is an Edinburgh-based freight forwarding and logistics company connecting the United Kingdom with Europe and international markets.",
};

const principles = [
  {
    number: "01",
    title: "Clear Coordination",
    text: "One operational flow, clear communication and visibility throughout the movement.",
  },
  {
    number: "02",
    title: "Flexible Execution",
    text: "Transport solutions adapted around cargo, route, timing and delivery requirements.",
  },
  {
    number: "03",
    title: "International Perspective",
    text: "UK-based logistics coordination connected with European and global freight markets.",
  },
  {
    number: "04",
    title: "Operational Focus",
    text: "Practical freight execution built around keeping cargo moving efficiently.",
  },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-grid" />

        <Header />

        <div className="container about-hero-inner">
          <div>
            <div className="service-breadcrumb">
              <Link href="/">MINAZ</Link>
              <span>/</span>
              <strong>ABOUT</strong>
            </div>

            <span className="service-kicker">01 / ABOUT MINAZ</span>

            <h1>
              BUILT AROUND
              <br />
              <span>MOVEMENT.</span>
            </h1>
          </div>

          <div className="about-hero-copy">
            <p>
              MINAZ Transport and Logistics is an Edinburgh-based freight
              forwarding and logistics company connecting businesses with
              transport networks across the United Kingdom, Europe and
              international markets.
            </p>

            <p>
              We focus on coordination, communication and operational control —
              turning individual transport requirements into clear freight
              movements.
            </p>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="about-intro">
        <div className="container about-intro-grid">
          <div>
            <span className="section-index">02 / WHO WE ARE</span>

            <h2>
              LOGISTICS WITH
              <br />
              <span>CLARITY.</span>
            </h2>
          </div>

          <div className="about-intro-copy">
            <p>
              Freight forwarding is not simply about finding a vehicle, vessel
              or flight. Every shipment involves timing, communication,
              documentation, route planning and coordination between multiple
              parties.
            </p>

            <p>
              MINAZ brings those elements together into one operational flow,
              giving customers a clear point of contact from transport request
              through final delivery.
            </p>

            <Link href="/services" className="text-link">
              Explore our services <span>↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="about-principles">
        <div className="container">
          <div className="about-principles-head">
            <span>03 / HOW WE WORK</span>
            <p>Four principles behind every movement.</p>
          </div>

          <div className="about-principles-grid">
            {principles.map((item) => (
              <article className="about-principle" key={item.number}>
                <span>{item.number}</span>

                <h3>{item.title}</h3>

                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EDINBURGH */}
      <section className="about-location">
        <div className="container about-location-grid">
          <div className="about-location-heading">
            <span>04 / EDINBURGH</span>

            <h2>
              UK BASED.
              <br />
              <strong>EUROPE CONNECTED.</strong>
            </h2>
          </div>

          <div className="about-location-info">
            <div className="about-location-address">
              <span>HEAD OFFICE</span>

              <strong>MINAZ TRANSPORT AND LOGISTICS LTD</strong>

              <p>
                5 South Charlotte Street
                <br />
                Edinburgh EH2 4AN
                <br />
                United Kingdom
              </p>
            </div>

            <div className="about-company-data">
              <div>
                <small>COMPANY NUMBER</small>
                <strong>SC882408</strong>
              </div>

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
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container about-cta-inner">
          <div>
            <span>LET&apos;S TALK LOGISTICS</span>

            <h2>
              READY TO MOVE
              <br />
              <strong>BUSINESS FORWARD?</strong>
            </h2>
          </div>

          <div>
            <p>
              Tell us what needs to move and our team will help coordinate the
              right freight solution.
            </p>

            <Link href="/quote" className="button button-dark">
              Get a quote <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}