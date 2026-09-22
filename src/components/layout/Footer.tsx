import Link from "next/link";

import CookieSettingsButton from "@/components/legal/CookieSettingsButton";
import NewsletterForm from "@/components/forms/NewsletterForm";

const socialLinks = [
  {
    label: "LinkedIn",
    short: "LI",
    href: "http://www.linkedin.com/company/minaztl",
  },
  {
    label: "Instagram",
    short: "IG",
    href: "https://www.instagram.com/minaztransport",
  },
  {
    label: "Facebook",
    short: "FB",
    href: "https://www.facebook.com/profile.php?id=61594490909987",
  },
  {
    label: "Pinterest",
    short: "PI",
    href: "https://uk.pinterest.com/MINAZTL",
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-newsletter">
        <div className="footer-newsletter-copy">
          <span>MINAZ INTELLIGENCE</span>

          <strong>
            Freight and market intelligence,
            delivered to your inbox.
          </strong>
        </div>

        <div className="footer-newsletter-form">
          <NewsletterForm source="footer" />
        </div>
      </div>
      <div className="container footer-main">
        <div className="footer-brand">
          <Link
            href="/"
            className="footer-logo"
          >
            <span className="footer-logo-mark">
              <i />
              <i />
            </span>

            <span>
              <strong>MINAZ</strong>
              <small>
                TRANSPORT AND LOGISTICS
              </small>
            </span>
          </Link>

          <p>
            Freight forwarding and logistics
            coordination connecting the United
            Kingdom with Europe and international
            markets.
          </p>

          <div className="footer-socials">
            {socialLinks.map(
              (social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    social.label
                  }
                >
                  <span>
                    {social.short}
                  </span>

                  <strong>
                    {social.label}
                  </strong>

                  <i>↗</i>
                </a>
              ),
            )}
          </div>
        </div>

        <div className="footer-column">
          <span>SERVICES</span>

          <Link href="/services/road-freight">
            Road Freight
          </Link>

          <Link href="/services/air-freight">
            Air Freight
          </Link>

          <Link href="/services/ocean-freight">
            Ocean Freight
          </Link>

          <Link href="/services/cargo-express">
            Cargo Express
          </Link>

          <Link href="/services/logistics">
            Logistics
          </Link>

          <Link href="/services/transport-coordination">
            Transport Coordination
          </Link>
        </div>

        <div className="footer-column">
          <span>COMPANY</span>

          <Link href="/about">
            About
          </Link>

          <Link href="/insights">
            Insights
          </Link>

          <Link href="/gallery">
            Gallery
          </Link>

          <Link href="/contact">
            Contact
          </Link>

          <Link href="/quote">
            Get a quote
          </Link>
        </div>

        <div className="footer-column footer-contact">
          <span>CONTACT</span>

          <strong>
            MINAZ TRANSPORT
            <br />
            AND LOGISTICS LTD
          </strong>

          <p>
            5 South Charlotte Street
            <br />
            Edinburgh EH2 4AN
            <br />
            United Kingdom
          </p>

          <a href="mailto:office@minaz.co.uk">
            office@minaz.co.uk
          </a>

          <a href="tel:+447704815760">
            +44 770 481 5760
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <div>
          <span>
            © {new Date().getFullYear()} MINAZ
            Transport and Logistics Ltd
          </span>

          <span>
            Company No. SC882408
          </span>
        </div>

        <div className="footer-legal">
          <Link href="/privacy">
            Privacy
          </Link>

          <Link href="/terms">
            Terms
          </Link>

          <CookieSettingsButton />
        </div>
      </div>
    </footer>
  );
}