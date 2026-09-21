import Link from "next/link";

import InsightsPreview from "@/components/home/InsightsPreview";
import FinalCta from "@/components/home/FinalCta";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const services = [
  "ROAD",
  "AIR",
  "OCEAN",
  "EXPRESS",
  "WAREHOUSING",
  "CUSTOMS",
];

export default function Home() {
  return (
    <main className="site-shell">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        className="hero"
        id="top"
      >
        <div className="hero-grid" />

        <div className="hero-glow hero-glow-one" />

        <div className="hero-glow hero-glow-two" />

        <Header />

        <div className="container hero-content">
          <div className="hero-copy">
            <div className="eyebrow">
              <span />

              EDINBURGH · UNITED KINGDOM / EUROPE &
              WORLDWIDE
            </div>

            <h1>
              MOVING BUSINESS
              <br />

              <em>
                FORWARD.
              </em>
            </h1>

            <p className="hero-description">
              Integrated freight and logistics solutions
              connecting the United Kingdom with Europe
              and global markets.
            </p>

            <div className="hero-actions">
              <Link
                href="/quote"
                className="button button-primary"
              >
                Get a quote
                <span>→</span>
              </Link>

              <Link
                href="/services"
                className="button button-secondary"
              >
                Explore services
                <span>→</span>
              </Link>
            </div>
          </div>

          <div
            className="hero-visual"
            aria-hidden="true"
          >
            <div className="visual-photo" />

            <div className="visual-fade" />

            <div className="visual-caption">
              <span>
                GLOBAL FREIGHT NETWORK
              </span>

              <span>
                55.9533° N / 3.1883° W
              </span>
            </div>
          </div>
        </div>

        <div className="container hero-footer">
          <div
            className="service-rail"
            id="services"
          >
            {services.map(
              (service, index) => (
                <div
                  className="service-item"
                  key={service}
                >
                  <span>
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <strong>
                    {service}
                  </strong>
                </div>
              ),
            )}
          </div>

          <div className="hero-meta">
            <span>
              FREIGHT FORWARDING / 01
            </span>

            <span>
              GLOBAL MOVEMENT, PRECISELY MANAGED
            </span>

            <span>
              EST. EDINBURGH
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          BUILT FOR MOVEMENT
      ====================================================== */}

      <section
        className="movement-section"
        id="about"
      >
        <div className="container movement-layout">
          <div className="movement-heading">
            <span className="section-index">
              02 / MINAZ
            </span>

            <h2>
              BUILT FOR
              <br />

              <span>
                MOVEMENT.
              </span>
            </h2>
          </div>

          <div className="movement-intro">
            <p>
              Freight is more than moving cargo from
              one point to another. It is planning,
              timing, coordination and communication
              working together as one operational flow.
            </p>

            <p>
              MINAZ connects the United Kingdom with
              European and international markets
              through flexible freight forwarding and
              logistics solutions.
            </p>

            <Link
              href="/services"
              className="text-link"
            >
              Explore our capabilities
              <span>↗</span>
            </Link>
          </div>
        </div>

        <div
          className="container movement-capabilities"
          id="services-grid"
        >
          <article className="capability">
            <div className="capability-top">
              <span>
                01
              </span>

              <small>
                FREIGHT
              </small>
            </div>

            <h3>
              International Transport
            </h3>

            <p>
              Road, air and ocean freight coordinated
              around your cargo, route and delivery
              requirements.
            </p>

            <div className="capability-tags">
              <span>
                ROAD
              </span>

              <span>
                AIR
              </span>

              <span>
                OCEAN
              </span>
            </div>
          </article>

          <article className="capability capability-dark">
            <div className="capability-top">
              <span>
                02
              </span>

              <small>
                OPERATIONS
              </small>
            </div>

            <h3>
              Logistics Coordination
            </h3>

            <p>
              Clear communication, transport planning
              and operational oversight from collection
              through final delivery.
            </p>

            <div className="capability-tags">
              <span>
                EXPRESS
              </span>

              <span>
                COORDINATION
              </span>

              <span>
                WAREHOUSING
              </span>
            </div>
          </article>

          <article className="capability capability-red">
            <div className="capability-top">
              <span>
                03
              </span>

              <small>
                CONNECTION
              </small>
            </div>

            <h3>
              UK ↔ Europe
            </h3>

            <p>
              Edinburgh-based logistics support
              connecting businesses with transport
              networks across the United Kingdom and
              Europe.
            </p>

            <div className="capability-route">
              <strong>
                UK
              </strong>

              <span>
                →
              </span>

              <strong>
                EU
              </strong>
            </div>
          </article>
        </div>
      </section>

      {/* =====================================================
          SERVICES SHOWCASE
      ====================================================== */}

      <section
        className="services-showcase"
        id="services-showcase"
      >
        <div className="container services-showcase-grid">
          <div className="services-visual">
            <div className="services-image" />

            <div className="services-image-overlay" />

            <div className="services-visual-caption">
              <span>
                03 / SERVICES
              </span>

              <strong>
                FREIGHT. LOGISTICS. CONTROL.
              </strong>
            </div>
          </div>

          <div className="services-list-wrap">
            <div className="services-heading">
              <span>
                OUR CAPABILITIES
              </span>

              <h2>
                SERVICES BUILT
                <br />
                AROUND MOVEMENT.
              </h2>
            </div>

            <div className="services-list">
              <Link
                href="/services/road-freight"
                className="service-row active"
              >
                <span className="service-number">
                  01
                </span>

                <div>
                  <strong>
                    Road Freight
                  </strong>

                  <small>
                    FTL, LTL and dedicated transport
                    across Europe.
                  </small>
                </div>

                <span className="service-arrow">
                  ↗
                </span>
              </Link>

              <Link
                href="/services/air-freight"
                className="service-row"
              >
                <span className="service-number">
                  02
                </span>

                <div>
                  <strong>
                    Air Freight
                  </strong>

                  <small>
                    Time-critical international cargo
                    solutions.
                  </small>
                </div>

                <span className="service-arrow">
                  ↗
                </span>
              </Link>

              <Link
                href="/services/ocean-freight"
                className="service-row"
              >
                <span className="service-number">
                  03
                </span>

                <div>
                  <strong>
                    Ocean Freight
                  </strong>

                  <small>
                    FCL and LCL shipping for global
                    cargo flows.
                  </small>
                </div>

                <span className="service-arrow">
                  ↗
                </span>
              </Link>

              <Link
                href="/services/cargo-express"
                className="service-row"
              >
                <span className="service-number">
                  04
                </span>

                <div>
                  <strong>
                    Cargo Express
                  </strong>

                  <small>
                    Fast dedicated transport for urgent
                    shipments.
                  </small>
                </div>

                <span className="service-arrow">
                  ↗
                </span>
              </Link>

              <Link
                href="/services/logistics"
                className="service-row"
              >
                <span className="service-number">
                  05
                </span>

                <div>
                  <strong>
                    Logistics
                  </strong>

                  <small>
                    Planning, coordination and
                    operational support.
                  </small>
                </div>

                <span className="service-arrow">
                  ↗
                </span>
              </Link>

              <Link
                href="/services/transport-coordination"
                className="service-row"
              >
                <span className="service-number">
                  06
                </span>

                <div>
                  <strong>
                    Transport Coordination
                  </strong>

                  <small>
                    Clear communication and control
                    across every stage.
                  </small>
                </div>

                <span className="service-arrow">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS
      ====================================================== */}

      <section
        className="process-section"
        id="process"
      >
        <div className="container process-header">
          <div>
            <span className="section-index">
              04 / PROCESS
            </span>

            <h2>
              FROM REQUEST
              <br />
              TO{" "}
              <span>
                DELIVERY.
              </span>
            </h2>
          </div>

          <div className="process-intro">
            <p>
              Every shipment follows a clear
              operational flow. From the first
              transport request to final delivery,
              MINAZ coordinates the details,
              communication and execution required to
              keep cargo moving.
            </p>
          </div>
        </div>

        <div className="container process-flow">
          <article className="process-step">
            <div className="process-number">
              01
            </div>

            <div className="process-content">
              <span>
                REQUEST
              </span>

              <h3>
                Tell us what needs to move.
              </h3>

              <p>
                Share the collection point,
                destination, cargo details and required
                delivery timeframe.
              </p>
            </div>

            <div className="process-arrow">
              →
            </div>
          </article>

          <article className="process-step">
            <div className="process-number">
              02
            </div>

            <div className="process-content">
              <span>
                PLAN
              </span>

              <h3>
                We build the right transport solution.
              </h3>

              <p>
                Route, transport mode, timing and
                operational requirements are
                coordinated around the shipment.
              </p>
            </div>

            <div className="process-arrow">
              →
            </div>
          </article>

          <article className="process-step">
            <div className="process-number">
              03
            </div>

            <div className="process-content">
              <span>
                COORDINATE
              </span>

              <h3>
                One clear operational flow.
              </h3>

              <p>
                We coordinate carriers, documentation
                and communication throughout the
                movement.
              </p>
            </div>

            <div className="process-arrow">
              →
            </div>
          </article>

          <article className="process-step process-step-final">
            <div className="process-number">
              04
            </div>

            <div className="process-content">
              <span>
                DELIVER
              </span>

              <h3>
                Cargo reaches its destination.
              </h3>

              <p>
                Final delivery is coordinated with
                clear communication from collection
                through completion.
              </p>
            </div>

            <div className="process-status">
              <span />

              DELIVERY COMPLETE
            </div>
          </article>
        </div>

        <div className="container process-footer">
          <div>
            <span>
              UK BASED
            </span>

            <strong>
              EDINBURGH
            </strong>
          </div>

          <div className="process-footer-line" />

          <p>
            Road · Air · Ocean · Express · Logistics ·
            Transport Coordination
          </p>
        </div>
      </section>

      {/* =====================================================
          REAL SUPABASE INSIGHTS
      ====================================================== */}

      <InsightsPreview />

      <FinalCta />

      <Footer />
    </main>
  );
}