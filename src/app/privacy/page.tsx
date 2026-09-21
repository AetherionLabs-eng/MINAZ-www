import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | MINAZ Transport and Logistics",
  description:
    "Privacy information explaining how MINAZ Transport and Logistics Ltd collects, uses and protects personal data.",
};

const lastUpdated = "21 September 2026";

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <section className="legal-hero">
        <div className="legal-grid" />

        <Header />

        <div className="container legal-hero-inner">
          <div>
            <div className="service-breadcrumb">
              <Link href="/">MINAZ</Link>
              <span>/</span>
              <strong>PRIVACY</strong>
            </div>

            <span className="service-kicker">
              LEGAL / PRIVACY
            </span>

            <h1>
              PRIVACY
              <br />
              <span>POLICY.</span>
            </h1>
          </div>

          <div className="legal-hero-copy">
            <p>
              This Privacy Policy explains how MINAZ
              Transport and Logistics Ltd collects,
              uses, stores and protects personal
              information when you use our website or
              contact us.
            </p>

            <div className="legal-updated">
              <span>LAST UPDATED</span>
              <strong>{lastUpdated}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="legal-content">
        <div className="container legal-layout">
          <aside className="legal-sidebar">
            <span>PRIVACY POLICY</span>

            <nav>
              <a href="#who-we-are">01 / Who we are</a>
              <a href="#data-we-collect">
                02 / Data we collect
              </a>
              <a href="#how-we-use-data">
                03 / How we use data
              </a>
              <a href="#legal-basis">
                04 / Legal basis
              </a>
              <a href="#sharing">
                05 / Sharing data
              </a>
              <a href="#international">
                06 / International transfers
              </a>
              <a href="#retention">
                07 / Retention
              </a>
              <a href="#cookies">
                08 / Cookies
              </a>
              <a href="#rights">
                09 / Your rights
              </a>
              <a href="#security">
                10 / Security
              </a>
              <a href="#complaints">
                11 / Complaints
              </a>
              <a href="#contact">
                12 / Contact
              </a>
            </nav>
          </aside>

          <article className="legal-article">
            <section id="who-we-are">
              <span className="legal-number">01</span>

              <h2>Who we are</h2>

              <p>
                MINAZ Transport and Logistics Ltd
                (&quot;MINAZ&quot;, &quot;we&quot;,
                &quot;us&quot; or &quot;our&quot;) is
                responsible for the personal information
                described in this Privacy Policy.
              </p>

              <div className="legal-info-box">
                <strong>
                  MINAZ TRANSPORT AND LOGISTICS LTD
                </strong>

                <p>
                  Company Number: SC882408
                  <br />
                  5 South Charlotte Street
                  <br />
                  Edinburgh EH2 4AN
                  <br />
                  United Kingdom
                </p>

                <a href="mailto:office@minaz.co.uk">
                  office@minaz.co.uk
                </a>
              </div>
            </section>

            <section id="data-we-collect">
              <span className="legal-number">02</span>

              <h2>Personal data we collect</h2>

              <p>
                The information we collect depends on how
                you interact with MINAZ.
              </p>

              <h3>Contact enquiries</h3>

              <p>
                When you contact us through our website,
                by email or by telephone, we may collect
                your name, company name, email address,
                telephone number, subject of enquiry and
                the contents of your message.
              </p>

              <h3>Freight quote requests</h3>

              <p>
                When requesting a quotation, we may also
                collect information relating to the
                proposed shipment, including collection
                and delivery locations, cargo
                description, weight, number of pallets,
                requested dates and other operational
                information you provide.
              </p>

              <h3>Technical information</h3>

              <p>
                When you access our website, limited
                technical information may be processed
                automatically, such as IP address,
                browser information, device information,
                request logs and security-related data.
              </p>

              <p>
                Please avoid submitting sensitive or
                special-category personal information
                unless it is genuinely necessary for
                your enquiry and we have requested it.
              </p>
            </section>

            <section id="how-we-use-data">
              <span className="legal-number">03</span>

              <h2>How we use personal data</h2>

              <p>We may use personal information to:</p>

              <ul>
                <li>
                  respond to enquiries and communicate
                  with you;
                </li>

                <li>
                  prepare and assess freight quotations;
                </li>

                <li>
                  plan and coordinate requested transport
                  and logistics services;
                </li>

                <li>
                  maintain records of communications,
                  enquiries and commercial discussions;
                </li>

                <li>
                  operate, maintain and secure our
                  website and systems;
                </li>

                <li>
                  prevent misuse, fraud and security
                  incidents;
                </li>

                <li>
                  comply with legal, tax, accounting and
                  regulatory obligations;
                </li>

                <li>
                  establish, exercise or defend legal
                  claims where necessary.
                </li>
              </ul>
            </section>

            <section id="legal-basis">
              <span className="legal-number">04</span>

              <h2>Legal basis for processing</h2>

              <p>
                Depending on the circumstances, we may
                process personal information on one or
                more of the following bases:
              </p>

              <div className="legal-table">
                <div>
                  <strong>
                    Contract / pre-contract steps
                  </strong>

                  <p>
                    Where processing is necessary to
                    respond to a request for a quotation,
                    discuss a proposed service or perform
                    a contract.
                  </p>
                </div>

                <div>
                  <strong>Legitimate interests</strong>

                  <p>
                    Where processing is reasonably
                    necessary for running our business,
                    communicating with customers,
                    improving operations, maintaining
                    records and protecting our systems.
                  </p>
                </div>

                <div>
                  <strong>Legal obligation</strong>

                  <p>
                    Where information must be processed
                    or retained to comply with applicable
                    legal, accounting, tax or regulatory
                    requirements.
                  </p>
                </div>

                <div>
                  <strong>Consent</strong>

                  <p>
                    Where consent is specifically
                    requested for a particular activity
                    and applicable law requires or permits
                    us to rely on consent.
                  </p>
                </div>
              </div>
            </section>

            <section id="sharing">
              <span className="legal-number">05</span>

              <h2>Who we share data with</h2>

              <p>
                We do not sell personal information.
              </p>

              <p>
                We may share information where necessary
                with service providers that support our
                business and website, including:
              </p>

              <ul>
                <li>
                  cloud hosting and infrastructure
                  providers;
                </li>

                <li>
                  database and data-storage providers;
                </li>

                <li>
                  transactional email providers;
                </li>

                <li>
                  IT, cybersecurity and website support
                  providers;
                </li>

                <li>
                  professional advisers such as
                  accountants, insurers or legal
                  advisers;
                </li>

                <li>
                  transport, logistics or operational
                  counterparties where disclosure is
                  necessary to respond to or perform a
                  requested service;
                </li>

                <li>
                  government authorities or other
                  parties where disclosure is required
                  by law.
                </li>
              </ul>

              <p>
                Our current website infrastructure
                includes third-party technology
                providers such as Supabase, Vercel and
                Resend.
              </p>
            </section>

            <section id="international">
              <span className="legal-number">06</span>

              <h2>International data transfers</h2>

              <p>
                Some service providers or their
                infrastructure may process personal data
                outside the United Kingdom.
              </p>

              <p>
                Where international transfers are
                subject to data-protection restrictions,
                we seek to use appropriate safeguards or
                another lawful transfer mechanism as
                required by applicable law.
              </p>
            </section>

            <section id="retention">
              <span className="legal-number">07</span>

              <h2>How long we keep information</h2>

              <p>
                We retain personal information only for
                as long as reasonably necessary for the
                purpose for which it was collected and
                for any applicable legal, regulatory,
                accounting or claims requirements.
              </p>

              <p>
                General enquiries and unsuccessful quote
                requests will normally be retained only
                for a reasonable period after the last
                meaningful communication.
              </p>

              <p>
                Where an enquiry results in a commercial
                relationship or transaction, relevant
                business records may be retained for up
                to six years or longer where required by
                law or reasonably necessary in
                connection with legal claims.
              </p>

              <p>
                Security and technical logs are retained
                according to operational and security
                requirements and are deleted or
                anonymised when no longer required.
              </p>
            </section>

            <section id="cookies">
              <span className="legal-number">08</span>

              <h2>Cookies and similar technologies</h2>

              <p>
                Our website may use cookies or similar
                technologies that are strictly necessary
                for security, administration or
                functionality.
              </p>

              <p>
                If we introduce non-essential analytics,
                advertising or marketing technologies,
                we will provide appropriate information
                and request consent where required before
                they are activated.
              </p>

              <p>
                You can also control cookies using your
                browser settings, although disabling
                essential technologies may affect
                website functionality.
              </p>
            </section>

            <section id="rights">
              <span className="legal-number">09</span>

              <h2>Your data protection rights</h2>

              <p>
                Depending on the circumstances and the
                legal basis used, you may have rights
                including:
              </p>

              <ul>
                <li>
                  the right to access personal data we
                  hold about you;
                </li>

                <li>
                  the right to ask us to correct
                  inaccurate or incomplete information;
                </li>

                <li>
                  the right to request deletion of
                  personal information in certain
                  circumstances;
                </li>

                <li>
                  the right to request restriction of
                  processing;
                </li>

                <li>
                  the right to object to certain
                  processing based on legitimate
                  interests;
                </li>

                <li>
                  the right to data portability where
                  applicable;
                </li>

                <li>
                  the right to withdraw consent where
                  processing is based on consent.
                </li>
              </ul>

              <div className="legal-highlight">
                <strong>RIGHT TO OBJECT</strong>

                <p>
                  Where we process your personal data on
                  the basis of legitimate interests, you
                  may have the right to object to that
                  processing.
                </p>
              </div>

              <p>
                To exercise your rights, contact us at{" "}
                <a href="mailto:office@minaz.co.uk">
                  office@minaz.co.uk
                </a>
                .
              </p>
            </section>

            <section id="security">
              <span className="legal-number">10</span>

              <h2>Data security</h2>

              <p>
                We use reasonable technical and
                organisational measures intended to
                protect personal information against
                unauthorised access, accidental loss,
                misuse, disclosure or alteration.
              </p>

              <p>
                No internet or electronic storage system
                can be guaranteed to be completely
                secure, and users should take appropriate
                care when transmitting information
                online.
              </p>
            </section>

            <section id="complaints">
              <span className="legal-number">11</span>

              <h2>Questions and complaints</h2>

              <p>
                If you have a concern about how we handle
                personal information, please contact us
                first so that we can investigate the
                matter.
              </p>

              <p>
                You also have the right to raise a
                complaint with the UK Information
                Commissioner&apos;s Office (ICO).
              </p>

              <a
                className="legal-external-link"
                href="https://ico.org.uk/make-a-complaint/"
                target="_blank"
                rel="noopener noreferrer"
              >
                INFORMATION COMMISSIONER&apos;S OFFICE ↗
              </a>
            </section>

            <section id="contact">
              <span className="legal-number">12</span>

              <h2>Contact us</h2>

              <p>
                Questions about this Privacy Policy or
                our use of personal information can be
                sent to:
              </p>

              <div className="legal-info-box">
                <strong>
                  MINAZ TRANSPORT AND LOGISTICS LTD
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
              </div>
            </section>

            <section>
              <span className="legal-number">13</span>

              <h2>Changes to this policy</h2>

              <p>
                We may update this Privacy Policy from
                time to time to reflect changes in our
                operations, technology or applicable
                requirements.
              </p>

              <p>
                The latest version will be published on
                this page together with the date of the
                most recent update.
              </p>
            </section>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}