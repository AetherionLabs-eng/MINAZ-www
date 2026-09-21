import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import {
  getPublishedInsights,
  insightCategories,
} from "@/lib/insights";

export const metadata: Metadata = {
  title: "MINAZ Intelligence | Logistics & Freight Insights",
  description:
    "Market intelligence, customs updates, freight trends and UK-EU logistics insights from MINAZ Transport and Logistics.",
};

export const revalidate = 60;

export default async function InsightsPage() {
  const insights = await getPublishedInsights();

  const featured =
    insights.find((article) => article.featured) ?? insights[0];

  /*
   * Visible fallback.
   * If Supabase returns nothing, we want to SEE the problem,
   * not get a blank dark screen.
   */
  if (!featured) {
    return (
      <main className="insights-page">
        <section className="insights-page-hero">
          <div className="insights-page-grid" />

          <Header />

          <div className="container insights-page-hero-inner">
            <div>
              <div className="service-breadcrumb">
                <Link href="/">MINAZ</Link>
                <span>/</span>
                <strong>INSIGHTS</strong>
              </div>

              <span className="service-kicker">
                01 / MINAZ INTELLIGENCE
              </span>

              <h1>
                INTELLIGENCE
                <br />
                FOR <span>MOVEMENT.</span>
              </h1>
            </div>

            <div className="insights-page-intro">
              <p>
                No published insights were returned from Supabase.
              </p>

              <p>
                Check the database connection, RLS policy and published
                article status.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  const latest = insights.filter(
    (article) => article.slug !== featured.slug,
  );

  return (
    <main className="insights-page">
      {/* ===================================================
          HERO
      =================================================== */}

      <section className="insights-page-hero">
        <div className="insights-page-grid" />

        <Header />

        <div className="container insights-page-hero-inner">
          <div>
            <div className="service-breadcrumb">
              <Link href="/">MINAZ</Link>
              <span>/</span>
              <strong>INSIGHTS</strong>
            </div>

            <span className="service-kicker">
              01 / MINAZ INTELLIGENCE
            </span>

            <h1>
              INTELLIGENCE
              <br />
              FOR <span>MOVEMENT.</span>
            </h1>
          </div>

          <div className="insights-page-intro">
            <p>
              Trade, regulation, infrastructure and economic change
              all shape how goods move.
            </p>

            <p>
              MINAZ Intelligence follows the developments that matter
              to businesses trading between the United Kingdom,
              Europe and global markets.
            </p>

            <div className="insights-page-meta">
              <span>UK BASED</span>
              <i />
              <span>EUROPEAN PERSPECTIVE</span>
              <i />
              <span>FREIGHT FOCUSED</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          FEATURED
      =================================================== */}

      <section className="insights-featured">
        <div className="container">
          <div className="insights-section-head">
            <span>02 / FEATURED</span>
            <p>Latest market intelligence from MINAZ.</p>
          </div>

          <Link
            href={`/insights/${featured.slug}`}
            className="featured-insight"
          >
            <div className="featured-insight-media">
              <div
                className="featured-insight-image"
                style={{
                  backgroundImage: `
                    linear-gradient(
                      90deg,
                      rgba(7,17,28,0.12),
                      rgba(7,17,28,0.28)
                    ),
                    linear-gradient(
                      0deg,
                      rgba(7,17,28,0.72),
                      transparent 55%
                    ),
                    url("${featured.image}")
                  `,
                }}
              />

              <div className="featured-insight-image-meta">
                <span>
                  {featured.category.toUpperCase()}
                </span>

                <strong>{featured.displayDate}</strong>
              </div>
            </div>

            <div className="featured-insight-copy">
              <div className="featured-insight-top">
                <span>FEATURED INSIGHT</span>
                <small>{featured.readingTime}</small>
              </div>

              <div className="featured-insight-main">
                <h2>{featured.title}</h2>

                {featured.subtitle && (
                  <h3>{featured.subtitle}</h3>
                )}

                <p>{featured.excerpt}</p>
              </div>

              <div className="featured-insight-bottom">
                <span>READ FULL INSIGHT</span>
                <strong>↗</strong>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ===================================================
          LATEST
      =================================================== */}

      {latest.length > 0 && (
        <section className="insights-latest">
          <div className="container">
            <div className="insights-section-head insights-section-head-dark">
              <span>03 / LATEST</span>

              <p>
                Analysis for freight, trade and supply chains.
              </p>
            </div>

            <div className="insights-latest-grid">
              {latest.map((article, index) => (
                <Link
                  href={`/insights/${article.slug}`}
                  className="latest-insight"
                  key={article.slug}
                >
                  <div className="latest-insight-media">
                    <div
                      className="latest-insight-image"
                      style={{
                        backgroundImage: `
                          linear-gradient(
                            0deg,
                            rgba(7,17,28,0.72),
                            transparent 60%
                          ),
                          url("${article.image}")
                        `,
                      }}
                    />

                    <span className="latest-insight-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="latest-insight-copy">
                    <div className="latest-insight-meta">
                      <span>
                        {article.category.toUpperCase()}
                      </span>

                      <small>
                        {article.displayDate}
                      </small>
                    </div>

                    <h2>{article.title}</h2>

                    <p>{article.excerpt}</p>

                    <div className="latest-insight-bottom">
                      <span>{article.readingTime}</span>
                      <strong>↗</strong>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================================================
          CATEGORIES
      =================================================== */}

      <section className="insights-categories">
        <div className="container insights-categories-inner">
          <div>
            <span className="section-index">
              04 / TOPICS
            </span>

            <h2>
              FOLLOW THE
              <br />
              <span>MARKET.</span>
            </h2>
          </div>

          <div className="insights-category-list">
            {insightCategories.map((category, index) => (
              <div
                className="insights-category-row"
                key={category}
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong>{category}</strong>

                <i>→</i>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          CTA
      =================================================== */}

      <section className="insights-cta">
        <div className="container insights-cta-inner">
          <div>
            <span>
              MARKET INTELLIGENCE. OPERATIONAL EXECUTION.
            </span>

            <h2>
              INSIGHT IS USEFUL.
              <br />
              <strong>MOVEMENT MATTERS.</strong>
            </h2>
          </div>

          <div>
            <p>
              Need support with a freight movement between
              the UK and Europe?
            </p>

            <Link
              href="/quote"
              className="button button-dark"
            >
              Request a quote <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}