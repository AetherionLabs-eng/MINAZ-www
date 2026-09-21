"use client";

export default function CookieSettingsButton() {
  function openSettings() {
    window.dispatchEvent(
      new Event(
        "minaz:open-cookie-settings",
      ),
    );
  }

  return (
    <button
      type="button"
      className="footer-legal-button"
      onClick={openSettings}
    >
      Cookie settings
    </button>
  );
}