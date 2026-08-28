"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/countries").then((r) => r.json()).then((d) => setCountries(d.countries));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (country) params.set("country", country);
    fetch(`/api/dashboard?${params.toString()}`).then((r) => r.json()).then(setData);
  }, [country]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">Impact dashboard</p>
      <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
        {data ? data.countryName : "GSDX"} Development Dashboard
      </h1>
      <p className="mt-3 max-w-2xl font-body text-sm text-ink/60">
        A live rollup of youth projects, development projects, business profiles, and
        trade opportunities — the same view GSDX would present to a funder like the
        AU–EU Youth Action Lab or the AfCFTA Digital Innovation Challenge.
      </p>

      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="mt-8 rounded-sm border border-line bg-paper px-4 py-2 font-body text-sm text-ink"
      >
        <option value="">All countries</option>
        {countries.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>

      {data && (
        <>
          <div className="mt-10">
            <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
              National GSDX Dashboard — capital structure & citizen distribution
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
              <Stat label="Flagship projects" value={data.national.projectCount} />
              <Stat label="Capital mobilized" value={formatUSD(data.national.capitalMobilized)} />
              <Stat label="Citizens receiving distributions" value={data.national.citizensReached.toLocaleString()} />
              <Stat label="Citizen distributions" value={formatUSD(data.national.citizenDistributions)} />
              <Stat label="SMEs supported" value={data.national.smesSupported.toLocaleString()} />
              <Stat label="Jobs created" value={data.national.jobsCreated.toLocaleString()} />
              <Stat label="Projects completed" value={data.national.projectsCompleted} />
              <Stat label="Projects active" value={data.national.projectsActive} />
            </div>
            {data.national.projectCount > 0 && (
              <a
                href="/mega-projects"
                className="mt-3 inline-block font-body text-xs text-gold hover:underline"
              >
                View flagship national projects →
              </a>
            )}
          </div>

          <div className="mt-10">
            <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
              Youth Project Hub
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              <Stat label="Projects submitted" value={data.youth.submitted} />
              <Stat label="Projects verified" value={data.youth.verified} />
              <Stat label="Investment ready" value={data.youth.investmentReady} />
              <Stat label="Funding requested" value={formatUSD(data.youth.fundingRequested)} />
              <Stat label="Projected beneficiaries" value={data.youth.beneficiaries.toLocaleString()} />
            </div>
          </div>

          <div className="mt-10">
            <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
              Development pipeline
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Stat label="Total projects" value={data.projects.total} />
              <Stat label="Investment ready or beyond" value={data.projects.investmentReady} />
              <Stat label="Capital mobilized" value={formatUSD(data.projects.capitalMobilized)} />
            </div>
          </div>

          <div className="mt-10">
            <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
              Trade & investment
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-4">
              <Stat label="Business profiles" value={data.businesses.total} />
              <Stat label="Trade ready (≥70)" value={data.businesses.tradeReady} />
              <Stat label="Open trade opportunities" value={data.trade.openOpportunities} />
              <Stat label="Capital sought" value={formatUSD(data.trade.capitalSought)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-sm border border-line p-5">
      <p className="font-display text-2xl text-gold">{value}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-ink/40">{label}</p>
    </div>
  );
}

function formatUSD(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n || 0);
}
