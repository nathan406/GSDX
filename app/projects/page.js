"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ country: "", sector: "" });

  useEffect(() => {
    fetch("/api/countries")
      .then((r) => r.json())
      .then((d) => setCountries(d.countries));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.country) params.set("country", filters.country);
    if (filters.sector) params.set("sector", filters.sector);

    fetch(`/api/projects?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => {
        setProjects(d.projects);
        setLoading(false);
      });
  }, [filters]);

  const sectors = useMemo(
    () => [...new Set(projects.map((p) => p.sector))].sort(),
    [projects]
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">Project registry</p>
      <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
        Every registered development project, in one place.
      </h1>
      <p className="mt-3 max-w-2xl font-body text-sm text-ink/60">
        Filtered live against the GSDX API — the same registry investors search when
        matching capital to projects.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
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
          <option value="">All sectors</option>
          {sectors.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {(filters.country || filters.sector) && (
          <button
            onClick={() => setFilters({ country: "", sector: "" })}
            className="font-body text-sm text-ink/50 hover:text-gold"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-8">
        {loading ? (
          <p className="font-body text-sm text-ink/50">Loading projects…</p>
        ) : projects.length === 0 ? (
          <p className="font-body text-sm text-ink/50">
            No projects match those filters yet.
          </p>
        ) : (
          <div className="divide-y divide-line border-y border-line">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="group flex flex-col items-start justify-between gap-2 py-5 transition hover:bg-line/20 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
                    {p.sector} · {p.stage}
                  </p>
                  <h3 className="mt-1 font-display text-lg text-ink group-hover:text-gold">
                    {p.name}
                  </h3>
                  <p className="mt-1 font-body text-xs text-ink/50">
                    Requesting {formatUSD(p.amountRequested)}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-mono text-2xl text-gold">{p.readiness}</p>
                  <p className="font-body text-[10px] uppercase tracking-wide text-ink/40">
                    readiness score
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
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
