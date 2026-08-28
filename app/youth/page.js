"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function YouthHubPage() {
  const [youthProjects, setYouthProjects] = useState([]);
  const [countries, setCountries] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [filters, setFilters] = useState({ country: "", sector: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/countries").then((r) => r.json()).then((d) => setCountries(d.countries));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.country) params.set("country", filters.country);
    if (filters.sector) params.set("sector", filters.sector);
    fetch(`/api/youth-projects?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => {
        setYouthProjects(d.youthProjects);
        if (sectors.length === 0) {
          setSectors([...new Set(d.youthProjects.map((p) => p.sector))].sort());
        }
        setLoading(false);
      });
  }, [filters]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">
        AU–EU Youth Action Lab
      </p>
      <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">Youth Project Hub</h1>
      <p className="mt-3 max-w-2xl font-body text-sm text-ink/60">
        Young people submit development ideas addressing problems in their communities.
        Every submission gets a GSDX Project Readiness Score and a path from idea to
        fundable, investment-ready project.
      </p>
      <div className="mt-6">
        <Link
          href="/youth/submit"
          className="inline-block rounded-sm bg-ink px-5 py-3 font-body text-sm font-medium text-paper transition hover:bg-inkline"
        >
          Submit a youth project
        </Link>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <select
          value={filters.country}
          onChange={(e) => setFilters((f) => ({ ...f, country: e.target.value }))}
          className="rounded-sm border border-line bg-paper px-4 py-2 font-body text-sm text-ink"
        >
          <option value="">All countries</option>
          {countries.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={filters.sector}
          onChange={(e) => setFilters((f) => ({ ...f, sector: e.target.value }))}
          className="rounded-sm border border-line bg-paper px-4 py-2 font-body text-sm text-ink"
        >
          <option value="">All community sectors</option>
          {sectors.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8">
        {loading ? (
          <p className="font-body text-sm text-ink/50">Loading…</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {youthProjects.map((p) => (
              <Link
                key={p.id}
                href={`/youth/${p.id}`}
                className="group block rounded-sm border border-line p-6 transition hover:border-gold"
              >
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
                  {p.sector} · {p.status}
                </p>
                <h3 className="mt-2 font-display text-lg text-ink group-hover:text-gold">
                  {p.name}
                </h3>
                <p className="mt-2 line-clamp-2 font-body text-xs text-ink/50">{p.summary}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-xl text-gold">{p.readinessScore}</span>
                  <span className="font-body text-[10px] uppercase text-ink/40">
                    {p.supporters} supporters
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
