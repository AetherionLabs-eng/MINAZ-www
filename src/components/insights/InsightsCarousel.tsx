"use client";

import Link from "next/link";
import { useRef } from "react";

type InsightsCarouselItem = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  readingTime: string;
  displayDate: string;
};

type InsightsCarouselProps = {
  articles: InsightsCarouselItem[];
};

export default function InsightsCarousel({
  articles,
}: InsightsCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  function move(direction: -1 | 1) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const firstCard =
      track.querySelector<HTMLElement>(".latest-insight");

    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "20") || 20;
    const amount =
      (firstCard?.offsetWidth ?? track.clientWidth * 0.8) + gap;

    track.scrollBy({
      left: direction * amount,
      behavior: "smooth",
    });
  }

  return (
    <div className="insights-carousel">
      <div className="insights-carousel-toolbar">
        <span>ALL PUBLISHED INSIGHTS</span>

        <div
          className="insights-carousel-controls"
          aria-label="Latest insight carousel controls"
        >
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous insights"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next insights"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="insights-carousel-track"
        aria-label="Latest MINAZ Intelligence articles"
      >
        {articles.map((article, index) => (
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
                <span>{article.category.toUpperCase()}</span>
                <small>{article.displayDate}</small>
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
  );
}
