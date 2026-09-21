"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "minaz_cookie_consent_v1";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
  version: 1;
};

export default function CookieConsent() {
  const pathname = usePathname();

  const [visible, setVisible] =
    useState(false);

  const [preferencesOpen, setPreferencesOpen] =
    useState(false);

  const [analytics, setAnalytics] =
    useState(false);

  const [marketing, setMarketing] =
    useState(false);

  useEffect(() => {
    /*
     * Nie pokazujemy cookie popupu w adminie.
     */
    if (pathname.startsWith("/admin")) {
      return;
    }

    try {
      const existing =
        localStorage.getItem(STORAGE_KEY);

      if (!existing) {
        const timer = window.setTimeout(() => {
          setVisible(true);
        }, 500);

        return () =>
          window.clearTimeout(timer);
      }

      const consent =
        JSON.parse(existing) as Consent;

      setAnalytics(
        Boolean(consent.analytics),
      );

      setMarketing(
        Boolean(consent.marketing),
      );
    } catch {
      setVisible(true);
    }
  }, [pathname]);

  useEffect(() => {
    function openSettings() {
      try {
        const existing =
          localStorage.getItem(STORAGE_KEY);

        if (existing) {
          const consent =
            JSON.parse(existing) as Consent;

          setAnalytics(
            Boolean(consent.analytics),
          );

          setMarketing(
            Boolean(consent.marketing),
          );
        }
      } catch {
        // ignore
      }

      setPreferencesOpen(true);
      setVisible(true);
    }

    window.addEventListener(
      "minaz:open-cookie-settings",
      openSettings,
    );

    return () => {
      window.removeEventListener(
        "minaz:open-cookie-settings",
        openSettings,
      );
    };
  }, []);

  function saveConsent(
    options: {
      analytics: boolean;
      marketing: boolean;
    },
  ) {
    const consent: Consent = {
      necessary: true,
      analytics:
        options.analytics,
      marketing:
        options.marketing,
      updatedAt:
        new Date().toISOString(),
      version: 1,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(consent),
    );

    /*
     * Przyda się później, kiedy dodamy
     * GA4 / Meta Pixel / inne skrypty.
     */
    window.dispatchEvent(
      new CustomEvent(
        "minaz:cookie-consent-updated",
        {
          detail: consent,
        },
      ),
    );

    setAnalytics(
      options.analytics,
    );

    setMarketing(
      options.marketing,
    );

    setVisible(false);
    setPreferencesOpen(false);
  }

  function acceptAll() {
    saveConsent({
      analytics: true,
      marketing: true,
    });
  }

  function necessaryOnly() {
    saveConsent({
      analytics: false,
      marketing: false,
    });
  }

  function savePreferences() {
    saveConsent({
      analytics,
      marketing,
    });
  }

  if (
    pathname.startsWith("/admin") ||
    !visible
  ) {
    return null;
  }

  return (
    <div
      className={`cookie-panel ${
        preferencesOpen
          ? "cookie-panel-expanded"
          : ""
      }`}
      role="dialog"
      aria-modal="false"
      aria-label="Cookie preferences"
    >
      <div className="cookie-panel-accent" />

      {!preferencesOpen ? (
        <>
          <div className="cookie-panel-head">
            <span>
              PRIVACY / COOKIES
            </span>

            <strong>
              Your privacy.
              <br />
              Your choice.
            </strong>
          </div>

          <p className="cookie-panel-text">
            We use necessary technologies to operate
            and secure this website. Optional
            analytics and marketing technologies are
            used only with your permission.
          </p>

          <p className="cookie-panel-legal">
            You can change your preferences at any
            time. See our{" "}
            <Link href="/privacy">
              Privacy Policy
            </Link>
            .
          </p>

          <div className="cookie-actions">
            <button
              type="button"
              className="cookie-button cookie-button-primary"
              onClick={acceptAll}
            >
              ACCEPT ALL
              <span>→</span>
            </button>

            <button
              type="button"
              className="cookie-button"
              onClick={necessaryOnly}
            >
              NECESSARY ONLY
            </button>

            <button
              type="button"
              className="cookie-settings-link"
              onClick={() =>
                setPreferencesOpen(true)
              }
            >
              MANAGE PREFERENCES
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="cookie-panel-head">
            <span>
              COOKIE SETTINGS
            </span>

            <strong>
              Privacy
              <br />
              preferences.
            </strong>
          </div>

          <div className="cookie-preferences">
            <div className="cookie-preference-row">
              <div>
                <strong>
                  Necessary
                </strong>

                <p>
                  Required for core website,
                  security and administrative
                  functionality.
                </p>
              </div>

              <span className="cookie-required">
                ALWAYS ON
              </span>
            </div>

            <div className="cookie-preference-row">
              <div>
                <strong>
                  Analytics
                </strong>

                <p>
                  Helps us understand website usage
                  and improve performance.
                </p>
              </div>

              <label className="cookie-switch">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) =>
                    setAnalytics(
                      event.target.checked,
                    )
                  }
                />

                <span />
              </label>
            </div>

            <div className="cookie-preference-row">
              <div>
                <strong>
                  Marketing
                </strong>

                <p>
                  Allows optional advertising and
                  campaign measurement technologies.
                </p>
              </div>

              <label className="cookie-switch">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(event) =>
                    setMarketing(
                      event.target.checked,
                    )
                  }
                />

                <span />
              </label>
            </div>
          </div>

          <div className="cookie-actions">
            <button
              type="button"
              className="cookie-button cookie-button-primary"
              onClick={savePreferences}
            >
              SAVE PREFERENCES
              <span>→</span>
            </button>

            <button
              type="button"
              className="cookie-button"
              onClick={acceptAll}
            >
              ACCEPT ALL
            </button>
          </div>
        </>
      )}
    </div>
  );
}