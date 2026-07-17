import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <div className="grid md:grid-cols-2 gap-10 py-20 items-center">
        <div>
          <h1 className="h1">Student GPS & GPA Tracker</h1>
          <p className="lead mt-4">Quickly calculate weighted GPAs for terms and keep a running history. The GPS interest logging feature has been removed — the app now focuses on accurate GPA calculations and clear history management.</p>

          <div className="mt-6 flex gap-3">
            <Link href="/calculator" className="btn btn-primary">Open GPA Calculator</Link>
            <Link href="/register" className="btn btn-outline">Create account</Link>
          </div>
        </div>

        <div className="card hero-card">
          <div className="kicker">Snapshot</div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="small">Modules this term</div>
              <div className="h2">8</div>
            </div>
            <div>
              <div className="small">Latest GPA</div>
              <div className="h2" style={{color:'var(--accent)'}}>3.87</div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="h2">What you can do</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          <div className="card">
            <h3 className="font-semibold">GPA Calculator</h3>
            <p className="small mt-2">Enter modules with credits and grades to compute a weighted GPA. Save results to your personal history.</p>
            <div className="mt-3"><Link href="/calculator" className="text-teal-600">Open calculator →</Link></div>
          </div>

          <div className="card md:col-span-2">
            <h3 className="font-semibold">Focused experience</h3>
            <p className="small mt-2">The application concentrates on GPA accuracy, clarity and a clean history UI. GPS logging has been intentionally removed to simplify the workflow.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
