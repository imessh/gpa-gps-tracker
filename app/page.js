import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <div className="flex flex-col md:flex-row md:items-center gap-12">
        <div className="flex-1">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold mb-4">
            Academic record, kept plainly
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink leading-tight">
            Every module.
            <br />
            One honest number.
          </h1>
          <p className="mt-5 text-ink-soft max-w-md leading-relaxed">
            Enter each module's credits and grade, and this ledger works out
            your overall GPA the same way a registrar would — weighted by
            credit, not by headcount. Save each calculation and come back to
            it later.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/calculator"
              className="px-5 py-2.5 bg-ink text-paper font-body text-sm rounded-sm hover:bg-ink-soft transition-colors"
            >
              Open GPA Calculator
            </Link>
            <Link
              href="/gps"
              className="px-5 py-2.5 border border-ink text-ink font-body text-sm rounded-sm hover:bg-paper-dim transition-colors"
            >
              Log a GPS/IoT Interest
            </Link>
          </div>
        </div>

        {/* Signature element: a transcript "seal" stamp showing a sample GPA */}
        <div className="shrink-0 mx-auto md:mx-0">
          <div className="w-40 h-40 rounded-full border-2 border-gold flex flex-col items-center justify-center shadow-seal rotate-[-6deg] bg-paper">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
              Overall
            </span>
            <span className="font-display text-4xl font-semibold text-ink">
              3.87
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
              GPA
            </span>
          </div>
        </div>
      </div>

      <div className="mt-20 grid sm:grid-cols-2 gap-6">
        <FeatureCard
          eyebrow="01 — Calculate"
          title="GPA Calculator"
          body="Add modules, enter credits and grades, and see your weighted GPA update as you type. Save it to keep a running history."
          href="/calculator"
          cta="Go to calculator"
        />
        <FeatureCard
          eyebrow="02 — Explore"
          title="GPS Interest Tracker"
          body="Note down GPS or IoT project ideas and locations you're interested in, so they're recorded somewhere other than a sticky note."
          href="/gps"
          cta="Log an interest"
        />
      </div>
    </div>
  );
}

function FeatureCard({ eyebrow, title, body, href, cta }) {
  return (
    <div className="transcript-card rounded-sm p-6 flex flex-col">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
        {eyebrow}
      </span>
      <h2 className="font-display text-2xl font-semibold text-ink mt-2">
        {title}
      </h2>
      <p className="text-sm text-ink-soft mt-3 leading-relaxed flex-1">
        {body}
      </p>
      <Link
        href={href}
        className="mt-5 text-sm font-body text-ink underline decoration-gold decoration-2 underline-offset-4 hover:text-gold w-fit"
      >
        {cta} →
      </Link>
    </div>
  );
}