import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="final-cta">
      <div className="container final-cta-inner">
        <div>
          <span>READY TO MOVE?</span>

          <h2>
            LET&apos;S MOVE
            <br />
            <strong>BUSINESS FORWARD.</strong>
          </h2>
        </div>

        <div className="final-cta-action">
          <p>
            Tell us what needs to move, where it needs to go and when it needs
            to arrive.
          </p>

          <Link href="/quote" className="button button-primary">
            Get a quote <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}