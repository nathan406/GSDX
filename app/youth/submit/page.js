"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CRITERIA = [
  { key: "problemDefinition", label: "Problem definition" },
  { key: "targetBeneficiaries", label: "Target beneficiaries" },
  { key: "projectModel", label: "Business / project model" },
  { key: "budget", label: "Detailed implementation budget" },
  { key: "implementationPlan", label: "Implementation plan" },
  { key: "sdgAlignment", label: "SDG alignment" },
  { key: "sustainabilityPlan", label: "Sustainability plan" },
  { key: "team", label: "Team" },
  { key: "evidence", label: "Evidence of beneficiary demand" },
  { key: "impactPotential", label: "Potential impact" },
];

export default function SubmitYouthProjectPage() {
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    submitterName: "",
    country: "",
    sector: "",
    summary: "",
    fundingRequired: "",
  });
  const [criteria, setCriteria] = useState({});
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/countries").then((r) => r.json()).then((d) => setCountries(d.countries));
    fetch("/api/youth-projects")
      .then((r) => r.json())
      .then((d) => setSectors([...new Set(d.youthProjects.map((p) => p.sector))].sort()));
  }, []);

  const metCount = Object.values(criteria).filter(Boolean).length;
  const previewScore = Math.round((metCount / CRITERIA.length) * 100);

  async function submit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const res = await fetch("/api/youth-projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, fundingRequired: Number(form.fundingRequired) || 0, criteria }),
    });
    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setError(data.error || "Something went wrong.");
      return;
    }
    router.push(`/youth/${data.youthProject.id}`);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">Youth project hub</p>
      <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">Submit your project</h1>
      <p className="mt-3 font-body text-sm text-ink/60">
        Tell us about the problem you're solving. GSDX scores your submission live as you
        go, and tells you exactly what's missing before it can become investment ready.
      </p>

      <form onSubmit={submit} className="mt-10 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="font-mono text-xs uppercase tracking-wide text-ink/40">
              Project name
            </span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 font-body text-sm text-ink"
            />
          </label>
          <label>
            <span className="font-mono text-xs uppercase tracking-wide text-ink/40">
              Your name
            </span>
            <input
              required
              value={form.submitterName}
              onChange={(e) => setForm((f) => ({ ...f, submitterName: e.target.value }))}
              className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 font-body text-sm text-ink"
            />
          </label>
          <label>
            <span className="font-mono text-xs uppercase tracking-wide text-ink/40">Country</span>
            <select
              required
              value={form.country}
              onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
              className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 font-body text-sm text-ink"
            >
              <option value="">Select a country</option>
              {countries.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="font-mono text-xs uppercase tracking-wide text-ink/40">
              Community sector
            </span>
            <select
              required
              value={form.sector}
              onChange={(e) => setForm((f) => ({ ...f, sector: e.target.value }))}
              className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 font-body text-sm text-ink"
            >
              <option value="">Select a sector</option>
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="font-mono text-xs uppercase tracking-wide text-ink/40">
            Summary
          </span>
          <textarea
            rows={3}
            value={form.summary}
            onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
            className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 font-body text-sm text-ink"
          />
        </label>

        <label className="block sm:w-64">
          <span className="font-mono text-xs uppercase tracking-wide text-ink/40">
            Funding required (USD)
          </span>
          <input
            type="number"
            value={form.fundingRequired}
            onChange={(e) => setForm((f) => ({ ...f, fundingRequired: e.target.value }))}
            className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 font-body text-sm text-ink"
          />
        </label>

        <fieldset>
          <legend className="font-mono text-xs uppercase tracking-wide text-ink/40">
            What does your submission include?
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {CRITERIA.map((c) => (
              <label key={c.key} className="flex items-center gap-2 font-body text-sm text-ink/70">
                <input
                  type="checkbox"
                  checked={!!criteria[c.key]}
                  onChange={(e) => setCriteria((cr) => ({ ...cr, [c.key]: e.target.checked }))}
                />
                {c.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="rounded-sm border border-line p-5">
          <p className="font-mono text-xs uppercase tracking-wide text-ink/40">
            Live readiness preview
          </p>
          <p className="mt-2 font-display text-3xl text-gold">{previewScore}/100</p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-line">
            <div className="h-1.5 rounded-full bg-gold" style={{ width: `${previewScore}%` }} />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-sm bg-ink px-6 py-3 font-body text-sm font-medium text-paper transition hover:bg-inkline disabled:opacity-50"
        >
          {status === "loading" ? "Submitting…" : "Submit project"}
        </button>
        {error && <p className="font-body text-sm text-clay">{error}</p>}
      </form>
    </div>
  );
}
