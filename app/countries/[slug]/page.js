import Link from "next/link";
import { notFound } from "next/navigation";
import {
  countries,
  projects,
  countryFundedAmount,
  projectFundedAmount,
  COUNTRY_FUND_ALLOCATION,
} from "@/lib/data";
import CountryInvestChooser from "@/components/CountryInvestChooser";

export function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const country = countries.find((c) => c.slug === params.slug);
  return { title: country ? `GSDX — ${country.name}` : "Country not found" };
}

export default function CountryPage({ params }) {
  const country = countries.find((c) => c.slug === params.slug);
  if (!country) notFound();

  const countryProjects = projects.filter((p) => p.country === country.slug);
  const fundTotal = countryFundedAmount(country.slug);
  const projectsTotal = countryProjects.reduce(
    (sum, p) => sum + projectFundedAmount(p.id),
    0
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/countries" className="font-body text-sm text-ink/50 hover:text-gold">
        ← All country hubs
      </Link>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-clay">
        {country.region}
      </p>
      <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">GSDX — {country.name}</h1>

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
            National development priorities
          </h2>
          <ol className="mt-4 space-y-3">
            {country.priorities.map((p, i) => (
              <li key={p} className="flex items-baseline gap-3 border-b border-line pb-3">
                <span className="font-mono text-xs text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-body text-sm text-ink">{p}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-sm border border-line p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-ink/40">
                Readiness index
              </p>
              <p className="mt-2 font-display text-2xl text-gold">{country.readiness}/100</p>
            </div>
            <div className="rounded-sm border border-line p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-ink/40">
                Capital mobilized
              </p>
              <p className="mt-2 font-display text-2xl text-gold">
                {formatUSD(fundTotal + projectsTotal)}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
            Projects in {country.name}
          </h2>
          <div className="mt-4 space-y-4">
            {countryProjects.length === 0 && (
              <p className="font-body text-sm text-ink/50">
                No projects registered for this hub yet.
              </p>
            )}
            {countryProjects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="group flex items-center justify-between rounded-sm border border-line p-5 transition hover:border-gold"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
                    {p.sector} · {p.stage}
                  </p>
                  <h3 className="mt-1 font-display text-base text-ink group-hover:text-gold">
                    {p.name}
                  </h3>
                </div>
                <span className="font-mono text-lg text-gold">{p.readiness}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Invest in this country */}
      <div className="mt-16 border-t border-line pt-10">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Invest in {country.name}
        </h2>
        <p className="mt-2 max-w-2xl font-body text-sm text-ink/60">
          Choose to back a specific private-sector project directly, or contribute to{" "}
          {country.name}&rsquo;s National Wealth Fund, which finances priority projects,
          services, and the citizen development dividend as a whole.
        </p>
        <CountryInvestChooser
          countrySlug={country.slug}
          countryName={country.name}
          projects={countryProjects.map((p) => ({ id: p.id, name: p.name, sector: p.sector }))}
        />

        <div className="mt-10">
          <h3 className="font-mono text-xs uppercase tracking-wide text-ink/40">
            How National Wealth Fund contributions are allocated
          </h3>
          <div className="mt-4 space-y-3 max-w-xl">
            {COUNTRY_FUND_ALLOCATION.map((a) => (
              <div key={a.key}>
                <div className="flex justify-between font-body text-xs text-ink/60">
                  <span>{a.label}</span>
                  <span className="font-mono">{a.pct}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-line">
                  <div className="h-1.5 rounded-full bg-inkline" style={{ width: `${a.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function formatUSD(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}
