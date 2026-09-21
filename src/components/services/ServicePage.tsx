import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Service } from "@/data/services";

type Props = {
  service: Service;
};

export default function ServicePage({ service }: Props) {
  return (
    <main className="service-page">
      <section className="service-hero">
        <div className="service-hero-grid" />

        <Header />

        <div className="container service-hero-inner">
          <div className="service-hero-copy">
            <div className="service-breadcrumb">
              <Link href="/">MINAZ</Link>
              <span>/</span>
              <Link href="/services">SERVICES</Link>
              <span>/</span>
              <strong>{service.name.toUpperCase()}</strong>
            </div>

            <span className="service-kicker">
              {service.index} / {service.name.toUpperCase()}
            </span>

            <h1>
              {service.headline}
              <br />
              <span>{service.headlineAccent}</span>
            </h1>

            <p>{service.description}</p>

            <div className="service-hero-actions">
              <Link href="/quote" className="button button-primary">
                Get a quote <span>→</span>
              </Link>

              <Link href="/contact" className="button button-secondary">
                Talk to us <span>↗</span>
              </Link>
            </div>
          </div>

          <div className="service-hero-media">
            <div
              className="service-hero-image"
              style={{
                backgroundImage: `
                  linear-gradient(
                    90deg,
                    #07111c 0%,
                    rgba(7, 17, 28, 0.48) 20%,
                    transparent 58%
                  ),
                  linear-gradient(
                    0deg,
                    rgba(7, 17, 28, 0.8),
                    transparent 45%
                  ),
                  url("${service.image}")
                `,
              }}
            />

            <div className="service-image-label">
              <span>{service.imageLabel}</span>
              <strong>{service.imageSubLabel}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="service-intro">
        <div className="container service-intro-grid">
          <div>
            <span className="section-index">02 / OVERVIEW</span>

            <h2>
              {service.overviewTitle}
              <br />
              <span>{service.overviewAccent}</span>
            </h2>
          </div>

          <div className="service-intro-copy">
            {service.overviewParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="service-capabilities">
        <div className="container">
          <div className="service-capabilities-head">
            <span>03 / CAPABILITIES</span>
            <p>{service.capabilitiesIntro}</p>
          </div>

          <div className="service-capabilities-grid">
            {service.capabilities.map((item) => (
              <article className="service-capability" key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-route">
        <div className="container service-route-inner">
          <div>
            <span>{service.connectionLabel}</span>

            <h2>
              {service.connectionTitle}
              <br />
              <strong>{service.connectionAccent}</strong>
            </h2>
          </div>

          <div className="service-route-copy">
            <p>{service.connectionText}</p>

            <div className="route-flow">
              {service.connectionFlow.map((step, index) => (
                <span key={step} className="route-flow-group">
                  <span>{step}</span>

                  {index !== service.connectionFlow.length - 1 && <i>→</i>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="service-cta">
        <div className="container service-cta-inner">
          <div>
            <span>{service.ctaEyebrow}</span>
            <h2>{service.ctaTitle}</h2>
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