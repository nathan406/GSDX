"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TransparencyPage() {
  const [investments, setInvestments] = useState([]);
  const [countries, setCountries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    fetch("/api/countries").then((r) => r.json()).then((d) => setCountries(d.countries));
    fetch("/api/projects").then((r) => r.json()).then((d) => setProjects(d.projects));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (countryFilter) params.set("country", countryFilter);
    fetch(`/api/investments?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => setInvestments(d.investments));
  }, [countryFilter]);

  const totalMobilized = investments.reduce((s, i) => s + i.amount, 0);
  const toProjects = investments.filter((i) => i.type === "project").reduce((s, i) => s + i.amount, 0);
  const toFunds = investments.filter((i) => i.type === "country-fund").reduce((s, i) => s + i.amount, 0);
  const investorCount = new Set(investments.map((i) => i.investorName)).size;

  function projectName(id) {
    return projects.find((p) => p.id === id)?.name ?? id;
  }
  function countryName(slug) {
    return countries.find((c) => c.slug === slug)?.name ?? slug;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">
        The GSDX transparency system
      </p>
      <h1 className="mt-2 max-w-2xl font-display text-3xl text-ink sm:text-4xl">
        Every dollar, publicly traceable.
      </h1>
      <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-ink/70">
        Transparency is what makes GSDX trustworthy to investors and citizens alike.
        Every investment recorded on the platform — whether into a single project or a
        country&rsquo;s National Wealth Fund — appears here, with the same published
        allocation model applied every time.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-4">
        <Stat label="Total capital mobilized" value={formatUSD(totalMobilized)} />
        <Stat label="Into direct projects" value={formatUSD(toProjects)} />
        <Stat label="Into national wealth funds" value={formatUSD(toFunds)} />
        <Stat label="Distinct investors" value={investorCount} />
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Public investment ledger
        </h2>
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="rounded-sm border border-line bg-paper px-4 py-2 font-body text-sm text-ink"
        >
          <option value="">All countries</option>
          {countries.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 divide-y divide-line border-y border-line">
        {investments.length === 0 && (
          <p className="py-6 font-body text-sm text-ink/50">No recorded investments yet.</p>
        )}
        {investments.map((i) => (
          <div key={i.id} className="flex flex-wrap items-center justify-between gap-2 py-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
                {i.date} · {i.type === "project" ? "Direct project" : "National wealth fund"}
              </p>
              <p className="mt-1 font-body text-sm text-ink">
                <span className="font-medium">{i.investorName}</span> →{" "}
                {i.type === "project" ? (
                  <Link href={`/projects/${i.targetId}`} className="text-gold hover:underline">
                    {projectName(i.targetId)}
                  </Link>
                ) : (
                  <Link href={`/countries/${i.targetId}`} className="text-gold hover:underline">
                    {countryName(i.targetId)} National Wealth Fund
                  </Link>
                )}
              </p>
            </div>
            <p className="font-mono text-lg text-gold">{formatUSD(i.amount)}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 font-body text-xs text-ink/40">
        This ledger reflects investments recorded on the GSDX demo platform, including
        any you record yourself from a project or country page — it resets when the
        server restarts.
      </p>
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
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}
