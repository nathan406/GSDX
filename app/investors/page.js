"use client";

import { useState } from "react";
import Link from "next/link";
import { sectors } from "@/lib/data";

const regions = ["Africa", "Asia", "Latin America & Caribbean", "Middle East", "Pacific"];

export default function InvestorsPage() {
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggle(list, setList, value) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  async function runMatch(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setMatches(null);

    const res = await fetch("/api/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sectors: selectedSectors,
        regions: selectedRegions,
        minAmount: minAmount ? Number(minAmount) : undefined,
        maxAmount: maxAmount ? Number(maxAmount) : undefined,
      }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }
    setMatches(data.matches);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">
        Investment network
      </p>
      <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
        Match capital to investment-ready projects.
      </h1>
      <p className="mt-3 max-w-2xl font-body text-sm text-ink/60">
        Set an investment profile and GSDX ranks projects across every country hub
        against it — the same matching logic used by the capital-matching API.
      </p>

      <form onSubmit={runMatch} className="mt-10 grid gap-10 md:grid-cols-[1fr_1fr]">
        <div className="space-y-8">
          <fieldset>
            <legend className="font-mono text-xs uppercase tracking-wide text-ink/40">
              Preferred sectors
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {sectors.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggle(selectedSectors, setSelectedSectors, s)}
                  className={`rounded-full border px-3 py-1.5 font-body text-xs transition ${
                    selectedSectors.includes(s)
                      ? "border-gold bg-gold text-paper"
                      : "border-line text-ink/60 hover:border-gold hover:text-gold"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-mono text-xs uppercase tracking-wide text-ink/40">
              Preferred regions
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {regions.map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => toggle(selectedRegions, setSelectedRegions, r)}
                  className={`rounded-full border px-3 py-1.5 font-body text-xs transition ${
                    selectedRegions.includes(r)
                      ? "border-gold bg-gold text-paper"
                      : "border-line text-ink/60 hover:border-gold hover:text-gold"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="flex gap-4">
            <label className="flex-1">
              <span className="font-mono text-xs uppercase tracking-wide text-ink/40">
                Min ticket (USD)
              </span>
              <input
                type="number"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                placeholder="5,000,000"
                className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 font-body text-sm text-ink"
              />
            </label>
            <label className="flex-1">
              <span className="font-mono text-xs uppercase tracking-wide text-ink/40">
                Max ticket (USD)
              </span>
              <input
                type="number"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                placeholder="50,000,000"
                className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 font-body text-sm text-ink"
              />
            </label>
          </fieldset>

          <button
            type="submit"
            disabled={loading}
            className="rounded-sm bg-ink px-5 py-3 font-body text-sm font-medium text-paper transition hover:bg-inkline disabled:opacity-50"
          >
            {loading ? "Matching…" : "Find matching projects"}
          </button>
          {error && <p className="font-body text-sm text-clay">{error}</p>}
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">Results</h2>
          {!matches && (
            <p className="mt-4 font-body text-sm text-ink/50">
              Choose at least one sector or region and run the match.
            </p>
          )}
          {matches && matches.length === 0 && (
            <p className="mt-4 font-body text-sm text-ink/50">
              No projects matched that profile. Try widening your sectors or regions.
            </p>
          )}
          <div className="mt-4 space-y-3">
            {matches?.map(({ project, matchScore }) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group flex items-center justify-between rounded-sm border border-line p-4 transition hover:border-gold"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
                    {project.sector}
                  </p>
                  <h3 className="mt-1 font-display text-base text-ink group-hover:text-gold">
                    {project.name}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xl text-gold">{matchScore}%</p>
                  <p className="font-body text-[10px] uppercase text-ink/40">match</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
