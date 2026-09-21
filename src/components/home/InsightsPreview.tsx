import Link from "next/link";

import { getPublishedInsights } from "@/lib/insights";

export default async function InsightsPreview() {
  const insights = await getPublishedInsights();

  const latestInsights = insights.slice(0, 3);

  /*
   * If there are no published articles,
   * do not show an empty intelligence section.
   */
  if (latestInsights.length === 0) {
    return null;
  }

  return (
    <section
      className="insights-preview"
      id="insights"
    >
      <div className="container insights-header">
        <div>
          <span className="section-index">
            05 / INTELLIGENCE
          </span>

          <h2>
            MARKET
            <br />
            <span>
              INTELLIGENCE.
            </span>
          </h2>
        </div>

        <div className="insights-intro">
          <p>
            Logistics is shaped by trade,
            regulation, infrastructure and
            economic change. MINAZ Intelligence
            follows the developments that matter
            to businesses moving goods between
            the UK and Europe.
          </p>

          <Link
            href="/insights"
            className="text-link"
          >
            View all insights
            <span>↗</span>
          </Link>
        </div>
      </div>

      <div className="container insights-grid">
        {latestInsights.map(
          (article, index) => (
            <Link
              href={`/insights/${article.slug}`}
              className="insight-item"
              key={article.slug}
            >
              <div className="insight-top">
                <span>
                  {String(
                    index + 1,
                  ).padStart(
                    2,
                    "0",
                  )}
                </span>

                <small>
                  {article.category}
                </small>
              </div>

              <div className="insight-body">
                <span className="insight-date">
                  {article.displayDate}
                </span>

                <h3>
                  {article.title}
                </h3>

                <p>
                  {article.excerpt}
                </p>
              </div>

              <div className="insight-bottom">
                <span>
                  READ INSIGHT
                </span>

                <strong>
                  ↗
                </strong>
              </div>
            </Link>
          ),
        )}
      </div>
    </section>
  );
}