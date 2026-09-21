import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Freight & Logistics Services | MINAZ",
  description:
    "Road, air and ocean freight, cargo express, logistics and transport coordination connecting the United Kingdom with Europe and global markets.",
};

export default function ServicesPage() {
  return (
    <main className="services-page">
      <section className="services-overview-hero">
        <div className="services-overview-grid" />

        <Header />

        <div className="container services-overview-hero-inner">
          <div>
            <div className="service-breadcrumb">
              <Link href="/">MINAZ</Link>
              <span>/</span>
              <strong>SERVICES</strong>
            </div>

            <span className="service-kicker">01 / CAPABILITIES</span>

            <h1>
              FREIGHT.
              <br />
              LOGISTICS.
              <br />
              <span>CONTROL.</span>
            </h1>
          </div>

          <div className="services-overview-intro">
            <p>
              MINAZ provides freight forwarding and logistics solutions built
              around cargo requirements, route, timing and operational control.
            </p>

            <p>
              From road freight across Europe to international air and ocean
              transport, each movement is coordinated through one clear
              operational flow.
            </p>

            <Link href="/quote" className="button button-primary">
              Get a quote <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="services-directory">
        <div className="container">
          <div className="services-directory-head">
            <span>02 / SERVICES</span>

            <p>
              Six core capabilities. One operational approach.
            </p>
          </div>

          <div className="services-directory-list">
            {services.map((service) => (
              <Link
                href={`/services/${service.slug}`}
                className="services-directory-item"
                key={service.slug}
              >
                <div className="services-directory-image">
                  <div
                    className="services-directory-photo"
                    style={{
                      backgroundImage: `
                        linear-gradient(
                          90deg,
                          rgba(7,17,28,0.08),
                          rgba(7,17,28,0.4)
                        ),
                        linear-gradient(
                          0deg,
                          rgba(7,17,28,0.72),
                          transparent 55%
                        ),
                        url("${service.image}")
                      `,
                    }}
                  />
                </div>

                <div className="services-directory-content">
                  <div className="services-directory-top">
                    <span>{service.index}</span>
                    <small>{service.name.toUpperCase()}</small>
                  </div>

                  <div className="services-directory-main">
                    <h2>{service.name}</h2>

                    <p>{service.description}</p>
                  </div>

                  <div className="services-directory-bottom">
                    <span>VIEW SERVICE</span>
                    <strong>↗</strong>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="services-network">
        <div className="container services-network-inner">
          <div>
            <span>03 / NETWORK</span>

            <h2>
              UNITED KINGDOM
              <br />
              <strong>CONNECTED.</strong>
            </h2>
          </div>

          <div className="services-network-copy">
            <p>
              Edinburgh-based freight and logistics coordination connecting
              businesses with transport networks across the United Kingdom,
              Europe and international markets.
            </p>

            <div className="services-network-flow">
              <span>UK</span>
              <i>↔</i>
              <span>EUROPE</span>
              <i>↔</i>
              <span>WORLD</span>
            </div>
          </div>
        </div>
      </section>

      <section className="service-cta">
        <div className="container service-cta-inner">
          <div>
            <span>NOT SURE WHICH SERVICE FITS?</span>
            <h2>LET&apos;S PLAN THE RIGHT MOVEMENT.</h2>
          </div>

          <Link href="/quote" className="button button-dark">
            Request a quote <span>→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}