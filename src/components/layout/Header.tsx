"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Insights",
    href: "/insights",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] =
    useState(false);

  /*
   * Close menu after navigation.
   */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /*
   * Prevent page scrolling while
   * mobile navigation is open.
   */
  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    function handleEscape(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`header ${
          menuOpen
            ? "header-menu-open"
            : ""
        }`}
      >
        <div className="container header-inner">
          <Link
            href="/"
            className="brand"
            aria-label="MINAZ home"
          >
            <span
              className="brand-symbol"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
              <span />
            </span>

            <span className="brand-copy">
              <strong>MINAZ</strong>

              <small>
                TRANSPORT AND LOGISTICS
              </small>
            </span>
          </Link>

          <nav
            className="nav"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className={
                  pathname === item.href
                    ? "nav-active"
                    : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link
              href="/login"
              className="header-login"
            >
              LOGIN
            </Link>

            <Link
              href="/quote"
              className="header-quote"
            >
              Get a quote
            </Link>
          </div>

          <button
            type="button"
            className={`mobile-menu-button ${
              menuOpen
                ? "is-open"
                : ""
            }`}
            aria-label={
              menuOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() =>
              setMenuOpen(
                (current) =>
                  !current,
              )
            }
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id="mobile-navigation"
        className={`mobile-navigation ${
          menuOpen
            ? "is-open"
            : ""
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-navigation-grid" />

        <div className="container mobile-navigation-inner">
          <div className="mobile-navigation-label">
            <span>
              NAVIGATION
            </span>

            <small>
              MINAZ / EDINBURGH
            </small>
          </div>

          <nav
            className="mobile-navigation-links"
            aria-label="Mobile navigation"
          >
            {navItems.map(
              (item, index) => (
                <Link
                  href={item.href}
                  key={item.href}
                  className={
                    pathname === item.href
                      ? "is-active"
                      : undefined
                  }
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
                    {item.label}
                  </strong>

                  <i>↗</i>
                </Link>
              ),
            )}
          </nav>

          <div className="mobile-navigation-actions">
            <Link
              href="/login"
              className="mobile-login"
            >
              LOGIN
              <span>→</span>
            </Link>

            <Link
              href="/quote"
              className="mobile-quote"
            >
              GET A QUOTE
              <span>→</span>
            </Link>
          </div>

          <div className="mobile-navigation-footer">
            <a href="mailto:office@minaz.co.uk">
              office@minaz.co.uk
            </a>

            <span>
              EDINBURGH · UNITED KINGDOM
            </span>
          </div>
        </div>
      </div>
    </>
  );
}