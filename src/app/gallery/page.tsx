import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import GalleryGrid, {
  type GalleryItem,
} from "@/components/gallery/GalleryGrid";

import { getPublishedInsights } from "@/lib/insights";

export const metadata: Metadata = {
  title:
    "Gallery | MINAZ Transport and Logistics",

  description:
    "Explore transport, logistics and MINAZ Intelligence visuals covering UK, European and international freight markets.",
};

const staticItems: GalleryItem[] = [
  {
    src: "/hero-minaz.jpg",
    title: "UK ↔ Europe",
    category:
      "International Freight",
    description:
      "Freight movement connecting the United Kingdom with European markets.",
  },

  {
    src: "/services-road.jpg",
    title: "Road Freight",
    category:
      "Ground Transport",
    description:
      "Flexible road freight coordination for UK and European movements.",
  },

  {
    src: "/services-air.jpg",
    title: "Air Freight",
    category:
      "International Transport",
    description:
      "Time-sensitive cargo supported through international air freight networks.",
  },

  {
    src: "/services-ocean.jpg",
    title: "Ocean Freight",
    category:
      "Global Freight",
    description:
      "Containerised freight connecting ports and international supply chains.",
  },

  {
    src: "/services-express.jpg",
    title: "Cargo Express",
    category:
      "Time Critical",
    description:
      "Dedicated express movements for urgent and time-sensitive cargo.",
  },

  {
    src: "/services-logistics.jpg",
    title: "Logistics",
    category:
      "Supply Chain",
    description:
      "Practical logistics coordination across warehouse and transport operations.",
  },

  {
    src: "/services-coordination.jpg",
    title:
      "Transport Coordination",
    category:
      "Operations",
    description:
      "Operational oversight connecting cargo, transport and delivery requirements.",
  },
];

export const revalidate = 60;

export default async function GalleryPage() {
  const insights =
    await getPublishedInsights();

  /*
   * Every published MINAZ Intelligence article
   * with an image automatically becomes a
   * Gallery item.
   */
  const intelligenceItems: GalleryItem[] =
    insights
      .filter(
        (insight) =>
          Boolean(insight.image),
      )
      .map((insight) => ({
        src: insight.image!,

        title:
          insight.title,

        category:
          `MINAZ Intelligence · ${insight.category}`,

        description:
          insight.excerpt ||
          insight.lead ||
          "MINAZ Intelligence.",

        href:
          `/insights/${insight.slug}`,
      }));

  /*
   * Avoid duplicate images.
   */
  const seen =
    new Set<string>();

  const items =
    [
      ...staticItems,
      ...intelligenceItems,
    ].filter((item) => {
      if (
        seen.has(item.src)
      ) {
        return false;
      }

      seen.add(item.src);

      return true;
    });

  return (
    <main className="gallery-page">
      <section className="gallery-hero">
        <div className="gallery-hero-grid" />

        <Header />

        <div className="container gallery-hero-inner">
          <div>
            <div className="service-breadcrumb">
              <Link href="/">
                MINAZ
              </Link>

              <span>/</span>

              <strong>
                GALLERY
              </strong>
            </div>

            <span className="service-kicker">
              01 / VISUAL ARCHIVE
            </span>

            <h1>
              MOVEMENT
              <br />

              <span>
                IN FRAME.
              </span>
            </h1>
          </div>

          <div className="gallery-hero-copy">
            <p>
              Transport, logistics and
              intelligence visualised across
              UK, European and international
              freight markets.
            </p>

            <div className="gallery-hero-index">
              <span>ROAD</span>
              <i />
              <span>AIR</span>
              <i />
              <span>OCEAN</span>
              <i />
              <span>INTELLIGENCE</span>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-section">
        <div className="container">
          <div className="gallery-section-head">
            <div>
              <span>
                02 / GALLERY
              </span>

              <h2>
                TRANSPORT.
                <br />

                LOGISTICS.
                <br />

                <strong>
                  INTELLIGENCE.
                </strong>
              </h2>
            </div>

            <p>
              Operational imagery and visual
              intelligence from MINAZ,
              including graphics published by
              MINAZ Intelligence.
            </p>
          </div>

          <GalleryGrid
            items={items}
          />
        </div>
      </section>

      <section className="gallery-cta">
        <div className="container gallery-cta-inner">
          <div>
            <span>
              YOUR NEXT MOVEMENT
            </span>

            <h2>
              LET&apos;S MOVE
              <br />

              <strong>
                BUSINESS FORWARD.
              </strong>
            </h2>
          </div>

          <div>
            <p>
              Tell us what needs to move and
              our team will help coordinate
              the right freight solution.
            </p>

            <Link
              href="/quote"
              className="button button-dark"
            >
              Get a quote
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}