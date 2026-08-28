"use client";

import { useState } from "react";
import InvestPanel from "@/components/InvestPanel";

export default function CountryInvestChooser({ countrySlug, countryName, projects }) {
  const [mode, setMode] = useState(null); // null | 'project' | 'country-fund'
  const [selectedProject, setSelectedProject] = useState(projects[0]?.id ?? "");

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setMode("project")}
          className={`rounded-sm border px-5 py-3 text-left font-body text-sm transition ${
            mode === "project" ? "border-gold bg-gold/10 text-ink" : "border-line text-ink/70 hover:border-gold"
          }`}
        >
          <span className="block font-display text-base text-ink">Back a private-sector project</span>
          <span className="mt-1 block text-xs text-ink/50">
            Direct investment into one verified project in {countryName}.
          </span>
        </button>
        <button
          onClick={() => setMode("country-fund")}
          className={`rounded-sm border px-5 py-3 text-left font-body text-sm transition ${
            mode === "country-fund" ? "border-gold bg-gold/10 text-ink" : "border-line text-ink/70 hover:border-gold"
          }`}
        >
          <span className="block font-display text-base text-ink">
            Fund {countryName}&rsquo;s National Wealth Fund
          </span>
          <span className="mt-1 block text-xs text-ink/50">
            Capital spread across priority projects, services, and reinvestment.
          </span>
        </button>
      </div>

      {mode === "project" && (
        <div className="mt-6 rounded-sm border border-line p-6">
          {projects.length === 0 ? (
            <p className="font-body text-sm text-ink/50">
              No projects are registered in {countryName} yet.
            </p>
          ) : (
            <>
              <label className="block">
                <span className="font-mono text-xs uppercase tracking-wide text-ink/40">
                  Choose a project
                </span>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="mt-2 w-full max-w-sm rounded-sm border border-line bg-paper px-3 py-2 font-body text-sm text-ink"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.sector}
                    </option>
                  ))}
                </select>
              </label>
              <InvestPanel
                key={selectedProject}
                type="project"
                targetId={selectedProject}
                targetLabel={projects.find((p) => p.id === selectedProject)?.name ?? "this project"}
              />
            </>
          )}
        </div>
      )}

      {mode === "country-fund" && (
        <div className="mt-6 rounded-sm border border-line p-6">
          <InvestPanel
            type="country-fund"
            targetId={countrySlug}
            targetLabel={`the ${countryName} National Wealth Fund`}
          />
        </div>
      )}
    </div>
  );
}
