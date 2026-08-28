"use client";

import { useEffect, useState } from "react";

export default function FundingPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [projects, setProjects] = useState([]);
  const [youthProjects, setYouthProjects] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [kind, setKind] = useState("project");
  const [selectedId, setSelectedId] = useState("");
  const [matches, setMatches] = useState(null);
  const [matching, setMatching] = useState(false);

  useEffect(() => {
    fetch("/api/funding-opportunities").then((r) => r.json()).then((d) => setOpportunities(d.fundingOpportunities));
    fetch("/api/projects").then((r) => r.json()).then((d) => setProjects(d.projects));
    fetch("/api/youth-projects").then((r) => r.json()).then((d) => setYouthProjects(d.youthProjects));
    fetch("/api/businesses").then((r) => r.json()).then((d) => setBusinesses(d.businesses));
  }, []);

  const listForKind = kind === "project" ? projects : kind === "youth" ? youthProjects : businesses;

  async function runMatch(e) {
    e.preventDefault();
    if (!selectedId) return;
    setMatching(true);
    const res = await fetch("/api/match/funding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, id: selectedId }),
    });
    const d = await res.json();
    setMatches(d);
    setMatching(false);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">Funding marketplace</p>
      <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">Funding opportunities</h1>
      <p className="mt-3 max-w-2xl font-body text-sm text-ink/60">
        Grants, equity, debt, guarantees, and concessional financing available across
        the GSDX network — matched automatically against your project, youth project,
        or business profile.
      </p>

      {/* Matcher */}
      <form onSubmit={runMatch} className="mt-10 rounded-sm border border-line p-6">
        <p className="font-mono text-xs uppercase tracking-wide text-ink/40">Check your matches</p>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <label className="w-full sm:w-52">
            <span className="font-mono text-xs uppercase tracking-wide text-ink/40">Type</span>
            <select
              value={kind}
              onChange={(e) => { setKind(e.target.value); setSelectedId(""); }}
              className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 font-body text-sm text-ink"
            >
              <option value="project">Development project</option>
              <option value="youth">Youth project</option>
              <option value="business">Business profile</option>
            </select>
          </label>
          <label className="w-full flex-1 sm:w-72">
            <span className="font-mono text-xs uppercase tracking-wide text-ink/40">Select</span>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 font-body text-sm text-ink"
            >
              <option value="">Choose one</option>
              {listForKind.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            disabled={matching}
            className="rounded-sm bg-ink px-5 py-2.5 font-body text-sm font-medium text-paper transition hover:bg-inkline disabled:opacity-50"
          >
            {matching ? "Matching…" : "Find matches"}
          </button>
        </div>

        {matches && (
          <div className="mt-6">
            <p className="font-body text-sm text-ink/70">
              You match {matches.matches.length} funding{" "}
              {matches.matches.length === 1 ? "opportunity" : "opportunities"}.
            </p>
            <div className="mt-3 space-y-2">
              {matches.matches.map(({ funder, matchScore }) => (
                <div key={funder.id} className="flex items-center justify-between rounded-sm border border-line p-4">
                  <p className="font-display text-sm text-ink">{funder.funder}</p>
                  <p className="font-mono text-lg text-gold">{matchScore}%</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>

      {/* All opportunities */}
      <div className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          All funding opportunities
        </h2>
        <div className="mt-4 divide-y divide-line border-y border-line">
          {opportunities.map((f) => (
            <div key={f.id} className="flex flex-wrap items-center justify-between gap-4 py-5">
              <div>
                <p className="font-display text-base text-ink">{f.funder}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-ink/40">
                  {f.type} · deadline {f.deadline}
                </p>
                <p className="mt-2 max-w-lg font-body text-xs text-ink/60">{f.requirements}</p>
              </div>
              <p className="font-mono text-sm text-gold">{f.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
