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

  const [ready, setReady] =
    useState(false);

  const [visible, setVisible] =
    useState(false);

  const [preferencesOpen, setPreferencesOpen] =
    useState(false);

  const [analytics, setAnalytics] =
    useState(false);

  const [marketing, setMarketing] =
    useState(false);

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      setReady(true);
      return;
    }

    try {
      const existing =
        localStorage.getItem(STORAGE_KEY);

      if (!existing) {
        const timer = window.setTimeout(() => {
          setVisible(true);
          setReady(true);
        }, 500);

        return () =>
          window.clearTimeout(timer);
      }

      const consent =
        JSON.parse(existing) as Consent;

      setAnalytics(Boolean(consent.analytics));
      setMarketing(Boolean(consent.marketing));
      setReady(true);
    } catch {
      setVisible(true);
      setReady(true);
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

          setAnalytics(Boolean(consent.analytics));
          setMarketing(Boolean(consent.marketing));
        }
      } catch {
        // Ignore malformed local storage.
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

  function saveConsent(options: {
    analytics: boolean;
    marketing: boolean;
  }) {
    const consent: Consent = {
      necessary: true,
      analytics: options.analytics,
      marketing: options.marketing,
      updatedAt: new Date().toISOString(),
      version: 1,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(consent),
    );

    window.dispatchEvent(
      new CustomEvent(
        "minaz:cookie-consent-updated",
        {
          detail: consent,
        },
      ),
    );

    setAnalytics(options.analytics);
    setMarketing(options.marketing);

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
    !ready
  ) {
    return null;
  }

  /*
   * After the visitor has made a choice,
   * keep a small permanent launcher in
   * the lower-left corner.
   */
  if (!visible) {
    return (
      <button
        type="button"
        className="cookie-launcher"
        onClick={() => {
          setPreferencesOpen(true);
          setVisible(true);
        }}
        aria-label="Open cookie settings"
        title="Cookie settings"
      >
        <span aria-hidden="true">◔</span>
      </button>
    );
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
            <span>PRIVACY / COOKIES</span>

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
          <div className="cookie-panel-head cookie-panel-head-settings">
            <span>COOKIE SETTINGS</span>

            <strong>
              Cookie
              <br />
              settings.
            </strong>

            <p>
              Change the same preferences available
              from the Privacy page and footer.
            </p>
          </div>

          <div className="cookie-preferences">
            <div className="cookie-preference-row">
              <div>
                <strong>
                  Essential cookies
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
                  Analytics cookies
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
                  Marketing cookies
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

          <div className="cookie-actions cookie-actions-settings">
            <button
              type="button"
              className="cookie-button"
              onClick={necessaryOnly}
            >
              ESSENTIAL ONLY
            </button>

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

          <Link
            className="cookie-full-settings-link"
            href="/privacy"
          >
            OPEN PRIVACY & COOKIE INFORMATION
          </Link>
        </>
      )}
    </div>
  );
}
