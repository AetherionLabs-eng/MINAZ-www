import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
export const revalidate = 60;
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  getInsightBySlug,
  getRelatedInsights,
} from "@/lib/insights";
const SITE_URL = "https://minaz.co.uk";

function getAbsoluteImageUrl(
  image?: string | null,
) {
  if (!image) {
    return `${SITE_URL}/hero-minaz.jpg`;
  }

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return `${SITE_URL}${
    image.startsWith("/") ? "" : "/"
  }${image}`;
}
type Props = {
  params: Promise<{
    slug: string;
  }>;
};



export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const article =
    await getInsightBySlug(slug);

  if (!article) {
    return {
      title: "Insight not found",
    };
  }

  const image =
    getAbsoluteImageUrl(
      article.image,
    );

  /*
   * Global layout already adds "| MINAZ",
   * so remove it if seo_title already
   * contains it.
   */
  const title =
    (
      article.seoTitle ||
      article.title
    ).replace(
      /\s*\|\s*MINAZ\s*$/i,
      "",
    );

  const description =
    article.seoDescription ||
    article.excerpt;

  const canonical =
    `${SITE_URL}/insights/${article.slug}`;

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      type: "article",

      locale: "en_GB",

      siteName:
        "MINAZ Transport and Logistics",

      title,
      description,

      url: canonical,

      images: [
        {
          url: image,
          alt: article.title,
        },
      ],

      publishedTime:
        article.publishedAt ||
        undefined,
    },

    twitter: {
      card:
        "summary_large_image",

      title,
      description,

      images: [
        image,
      ],
    },
  };
}

export default async function InsightArticlePage({
  params,
}: Props) {
  const { slug } = await params;
  const article = await getInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = await getRelatedInsights(
  article.slug,
  2,
);

  const articleUrl = `https://minaz.co.uk/insights/${article.slug}`;

  const articleImage =
  getAbsoluteImageUrl(
    article.image,
  );

const jsonLd = {
  "@context":
    "https://schema.org",

  "@type":
    "Article",

  headline:
    article.title,

  description:
    article.lead ||
    article.excerpt,

  datePublished:
    article.publishedAt,

  image: [
    articleImage,
  ],

  mainEntityOfPage:
    `${SITE_URL}/insights/${article.slug}`,

  author: {
    "@type":
      "Organization",

    name:
      "MINAZ Transport and Logistics",

    url:
      SITE_URL,
  },

  publisher: {
    "@type":
      "Organization",

    name:
      "MINAZ Transport and Logistics",

    url:
      SITE_URL,
  },
};

  return (
    <main className="article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <section className="article-hero">
        <div className="article-grid" />

        <Header />

        <div className="container article-hero-inner">
          <div className="article-breadcrumb">
            <Link href="/">MINAZ</Link>
            <span>/</span>
            <Link href="/insights">INSIGHTS</Link>
            <span>/</span>
            <strong>{article.category.toUpperCase()}</strong>
          </div>

          <div className="article-title-grid">
            <div>
              <div className="article-meta">
                <span>{article.category.toUpperCase()}</span>
                <i />
                <span>{article.displayDate}</span>
                <i />
                <span>{article.readingTime}</span>
              </div>

              <h1>{article.title}</h1>
            </div>

            <div className="article-title-side">
              <h2>{article.subtitle}</h2>

              {article.lead && <p>{article.lead}</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="article-image-section">
        <div className="container">
          <div
            className="article-main-image"
            style={{
              backgroundImage: `
                linear-gradient(
                  0deg,
                  rgba(7,17,28,0.08),
                  rgba(7,17,28,0.02)
                ),
                url("${article.image}")
              `,
            }}
          >
            <div className="article-image-label">
              <span>MINAZ INTELLIGENCE</span>
              <strong>{article.category.toUpperCase()}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="article-content">
        <div className="container article-content-grid">
          <aside className="article-sidebar">
            <div className="article-sidebar-sticky">
              <span>ARTICLE</span>

              <div>
                <small>PUBLISHED</small>
                <strong>{article.displayDate}</strong>
              </div>

              <div>
                <small>READING TIME</small>
                <strong>{article.readingTime}</strong>
              </div>

              <div>
                <small>TOPIC</small>
                <strong>{article.category}</strong>
              </div>
            </div>
          </aside>

          <article className="article-body">
            {article.takeaway && (
              <div className="article-takeaway">
                <span>MINAZ KEY TAKEAWAY</span>

                <p>{article.takeaway}</p>
              </div>
            )}

            {article.sections?.map((section, index) => (
              <section
                className="article-text-section"
                key={section.heading}
              >
                <div className="article-section-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h2>{section.heading}</h2>

                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}

            {article.timeline &&
              article.timeline.length > 0 && (
                <section className="article-timeline">
                  <span>IMPLEMENTATION TIMELINE</span>

                  <div className="article-timeline-grid">
                    {article.timeline.map((item) => (
                      <div
                        className="article-timeline-item"
                        key={item.date}
                      >
                        <strong>{item.date}</strong>

                        <h3>{item.title}</h3>

                        <p>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {article.sources &&
              article.sources.length > 0 && (
                <section className="article-sources">
                  <span>SOURCES</span>

                  <div>
                    {article.sources.map((source, index) => (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={source.url}
                      >
                        <small>
                          {String(index + 1).padStart(2, "0")}
                        </small>

                        <strong>{source.label}</strong>

                        <i>↗</i>
                      </a>
                    ))}
                  </div>
                </section>
              )}
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="article-related">
          <div className="container">
            <div className="article-related-head">
              <span>RELATED INTELLIGENCE</span>

              <Link href="/insights">
                VIEW ALL INSIGHTS ↗
              </Link>
            </div>

            <div className="article-related-grid">
              {related.map((item) => (
                <Link
                  href={`/insights/${item.slug}`}
                  className="article-related-item"
                  key={item.slug}
                >
                  <span>{item.category.toUpperCase()}</span>

                  <h2>{item.title}</h2>

                  <p>{item.excerpt}</p>

                  <div>
                    <small>{item.displayDate}</small>
                    <strong>↗</strong>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="article-cta">
        <div className="container article-cta-inner">
          <div>
            <span>FROM INTELLIGENCE TO EXECUTION</span>

            <h2>
              NEED SUPPORT WITH
              <br />
              <strong>YOUR FREIGHT?</strong>
            </h2>
          </div>

          <div>
            <p>
              Talk to MINAZ about your next UK, European or
              international freight movement.
            </p>

            <Link href="/quote" className="button button-dark">
              Request a quote <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}