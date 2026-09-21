"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

export type GalleryItem = {
  src: string;
  title: string;
  category: string;
  description: string;
  href?: string;
};

export default function GalleryGrid({
  items,
}: {
  items: GalleryItem[];
}) {
  const [selected, setSelected] =
    useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!selected) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        setSelected(null);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [selected]);

  return (
    <>
      <div className="gallery-grid">
        {items.map((item, index) => (
          <button
            className={`gallery-item gallery-item-${
              (index % 7) + 1
            }`}
            key={`${item.src}-${index}`}
            type="button"
            onClick={() =>
              setSelected(item)
            }
          >
            <div className="gallery-image">
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="gallery-overlay">
              <div>
                <span>
                  {item.category}
                </span>

                <strong>
                  {item.title}
                </strong>
              </div>

              <i>↗</i>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="gallery-modal"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          onClick={() =>
            setSelected(null)
          }
        >
          <button
            type="button"
            className="gallery-modal-close"
            onClick={() =>
              setSelected(null)
            }
            aria-label="Close image"
          >
            ×
          </button>

          <div
            className="gallery-modal-content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="gallery-modal-image">
              <img
                src={selected.src}
                alt={selected.title}
              />
            </div>

            <div className="gallery-modal-caption">
              <span>
                {selected.category}
              </span>

              <h2>
                {selected.title}
              </h2>

              <p>
                {selected.description}
              </p>

              {selected.href && (
                <Link
                  href={selected.href}
                  className="gallery-insight-link"
                >
                  READ THE INSIGHT
                  <span>→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}