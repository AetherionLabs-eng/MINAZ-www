import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Website Terms | MINAZ Transport and Logistics",
  description:
    "Terms governing use of the MINAZ Transport and Logistics website.",
};

const lastUpdated = "21 September 2026";

export default function TermsPage() {
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
              <strong>TERMS</strong>
            </div>

            <span className="service-kicker">
              LEGAL / WEBSITE TERMS
            </span>

            <h1>
              WEBSITE
              <br />
              <span>TERMS.</span>
            </h1>
          </div>

          <div className="legal-hero-copy">
            <p>
              These terms govern access to and use of
              the MINAZ Transport and Logistics website.
            </p>

            <p>
              Separate terms may apply to freight,
              forwarding, logistics and transport
              services arranged by MINAZ.
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
            <span>WEBSITE TERMS</span>

            <nav>
              <a href="#about">
                01 / About these terms
              </a>

              <a href="#website">
                02 / Website use
              </a>

              <a href="#information">
                03 / Website information
              </a>

              <a href="#quotes">
                04 / Quotes & enquiries
              </a>

              <a href="#transport">
                05 / Transport services
              </a>

              <a href="#user-responsibilities">
                06 / User responsibilities
              </a>

              <a href="#intellectual-property">
                07 / Intellectual property
              </a>

              <a href="#third-party">
                08 / Third-party links
              </a>

              <a href="#availability">
                09 / Availability
              </a>

              <a href="#liability">
                10 / Liability
              </a>

              <a href="#privacy">
                11 / Privacy
              </a>

              <a href="#law">
                12 / Governing law
              </a>
            </nav>
          </aside>

          <article className="legal-article">
            <section id="about">
              <span className="legal-number">01</span>

              <h2>About these terms</h2>

              <p>
                These Website Terms apply to your use of
                the website operated by:
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

              <p>
                By using this website, you agree to
                comply with these terms. If you do not
                agree with them, you should not use the
                website.
              </p>
            </section>

            <section id="website">
              <span className="legal-number">02</span>

              <h2>Use of this website</h2>

              <p>
                You may use this website for lawful
                business and informational purposes,
                including learning about MINAZ services,
                contacting us and submitting freight
                enquiries or quotation requests.
              </p>

              <p>You must not:</p>

              <ul>
                <li>
                  use the website for any unlawful,
                  fraudulent or abusive purpose;
                </li>

                <li>
                  attempt to gain unauthorised access to
                  the website, systems, databases or
                  administrative functions;
                </li>

                <li>
                  introduce malware, malicious code or
                  other harmful material;
                </li>

                <li>
                  interfere with the operation,
                  availability or security of the
                  website;
                </li>

                <li>
                  use automated tools in a manner that
                  causes unreasonable load or disruption.
                </li>
              </ul>
            </section>

            <section id="information">
              <span className="legal-number">03</span>

              <h2>Website information</h2>

              <p>
                Information on this website is provided
                for general information about MINAZ,
                freight forwarding, logistics and
                related services.
              </p>

              <p>
                We seek to keep website content accurate
                and current, but freight markets,
                regulations, schedules, customs
                requirements, routes and operational
                conditions may change.
              </p>

              <p>
                Website content should therefore not be
                treated as professional, legal, customs,
                tax or regulatory advice and should not
                be relied upon as a binding service
                commitment unless separately confirmed
                by MINAZ in writing.
              </p>
            </section>

            <section id="quotes">
              <span className="legal-number">04</span>

              <h2>Enquiries and quotation requests</h2>

              <p>
                Submission of a contact form or freight
                quotation request does not by itself
                create a contract between you and MINAZ.
              </p>

              <p>
                A quotation request is an invitation for
                MINAZ to review the proposed movement.
                Any quotation or proposed service may be
                subject to matters including:
              </p>

              <ul>
                <li>
                  availability of suitable transport
                  capacity;
                </li>

                <li>
                  accuracy and completeness of shipment
                  information;
                </li>

                <li>
                  cargo characteristics and dimensions;
                </li>

                <li>
                  route and delivery requirements;
                </li>

                <li>
                  customs, sanctions and regulatory
                  requirements;
                </li>

                <li>
                  dangerous-goods or special-handling
                  requirements;
                </li>

                <li>
                  commercial and credit approval;
                </li>

                <li>
                  any additional terms stated in the
                  quotation or transport order.
                </li>
              </ul>

              <p>
                A transport or logistics contract is
                formed only when the relevant order,
                quotation or booking is accepted or
                confirmed in accordance with the
                applicable commercial terms.
              </p>
            </section>

            <section id="transport">
              <span className="legal-number">05</span>

              <h2>Transport and logistics services</h2>

              <p>
                These Website Terms govern use of the
                website only.
              </p>

              <div className="legal-highlight">
                <strong>
                  IMPORTANT
                </strong>

                <p>
                  Transport, forwarding and logistics
                  services may be subject to separate
                  quotations, transport orders, service
                  conditions and MINAZ General Terms of
                  Carriage.
                </p>
              </div>

              <p>
                Where separate contractual conditions
                apply to a particular shipment or
                service, those conditions govern that
                service to the extent of any conflict
                with these Website Terms.
              </p>
            </section>

            <section id="user-responsibilities">
              <span className="legal-number">06</span>

              <h2>Your responsibilities</h2>

              <p>
                When providing information through this
                website, you are responsible for
                ensuring that the information is
                accurate, complete and lawful.
              </p>

              <p>
                In relation to freight enquiries, this
                includes providing accurate information
                concerning cargo, weight, dimensions,
                collection and delivery details, special
                handling requirements and any relevant
                regulatory characteristics.
              </p>

              <p>
                You should not submit confidential or
                sensitive information unless it is
                necessary for the purpose of your
                enquiry.
              </p>
            </section>

            <section id="intellectual-property">
              <span className="legal-number">07</span>

              <h2>Intellectual property</h2>

              <p>
                Unless otherwise stated, website design,
                text, graphics, branding, logos and
                other original website content are owned
                by or licensed to MINAZ.
              </p>

              <p>
                You may view and use website content for
                legitimate internal business and
                informational purposes.
              </p>

              <p>
                You may not reproduce, republish,
                distribute, sell, modify or commercially
                exploit substantial parts of the website
                without prior written permission, except
                where permitted by law.
              </p>
            </section>

            <section id="third-party">
              <span className="legal-number">08</span>

              <h2>Third-party websites and services</h2>

              <p>
                This website may contain links to
                third-party websites, resources or
                services.
              </p>

              <p>
                Such links are provided for convenience
                or reference. Unless expressly stated,
                MINAZ does not control third-party
                websites and is not responsible for
                their content, availability, privacy
                practices or security.
              </p>
            </section>

            <section id="availability">
              <span className="legal-number">09</span>

              <h2>Website availability</h2>

              <p>
                We may update, suspend, withdraw or
                change all or part of this website
                without notice where reasonably
                necessary.
              </p>

              <p>
                We do not guarantee that the website
                will always be available, uninterrupted
                or free from technical errors.
              </p>
            </section>

            <section id="liability">
              <span className="legal-number">10</span>

              <h2>Liability for website use</h2>

              <p>
                To the extent permitted by law, MINAZ is
                not responsible for loss resulting
                solely from reliance on general website
                information where that information has
                not been confirmed as part of a specific
                quotation, booking or contract.
              </p>

              <p>
                We are not responsible for loss or damage
                caused by circumstances outside our
                reasonable control relating to access to
                or availability of the website.
              </p>

              <p>
                Nothing in these terms excludes or
                limits liability where such exclusion or
                limitation would be unlawful, including
                liability for fraud or fraudulent
                misrepresentation or for death or
                personal injury caused by negligence
                where applicable.
              </p>

              <p>
                Liability arising from actual transport
                or logistics services is governed by the
                terms applicable to the relevant service
                rather than this website-use section.
              </p>
            </section>

            <section id="privacy">
              <span className="legal-number">11</span>

              <h2>Privacy and personal information</h2>

              <p>
                Personal information submitted through
                this website is handled in accordance
                with our Privacy Policy.
              </p>

              <Link
                className="legal-external-link"
                href="/privacy"
              >
                READ OUR PRIVACY POLICY →
              </Link>
            </section>

            <section>
              <span className="legal-number">
                12
              </span>

              <h2>Changes to these terms</h2>

              <p>
                We may update these Website Terms from
                time to time.
              </p>

              <p>
                The latest version will be published on
                this page with the date of the most
                recent update.
              </p>
            </section>

            <section id="law">
              <span className="legal-number">13</span>

              <h2>Governing law</h2>

              <p>
                These Website Terms are governed by the
                laws of Scotland.
              </p>

              <p>
                Subject to any mandatory legal rights
                that apply in another jurisdiction, the
                courts of Scotland shall have
                jurisdiction in relation to disputes
                concerning use of this website.
              </p>
            </section>

            <section>
              <span className="legal-number">
                14
              </span>

              <h2>Contact</h2>

              <p>
                Questions regarding these Website Terms
                can be sent to:
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
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}