import Link from "next/link";
import { notFound } from "next/navigation";
import {
  projects,
  countries,
  stages,
  projectFundedAmount,
  PROJECT_FUND_ALLOCATION,
} from "@/lib/data";
import InvestPanel from "@/components/InvestPanel";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }) {
  const project = projects.find((p) => p.id === params.id);
  return { title: project ? `${project.name} — GSDX` : "Project not found" };
}

const breakdownLabels = {
  financial: "Financial readiness",
  technical: "Technical readiness",
  legal: "Legal readiness",
  government: "Government readiness",
  market: "Market potential",
  execution: "Execution capacity",
  impact: "Development impact",
  environmental: "Environmental / social",
};

export default function ProjectPage({ params }) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) notFound();

  const country = countries.find((c) => c.slug === project.country);
  const stageIndex = stages.indexOf(project.stage);
  const funded = projectFundedAmount(project.id);
  const fundedPct = Math.min(100, Math.round((funded / project.amountRequested) * 100));

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/projects" className="font-body text-sm text-ink/50 hover:text-gold">
        ← Full registry
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">
            {project.sector} ·{" "}
            <Link href={`/countries/${project.country}`} className="hover:text-gold">
              {country?.name}
            </Link>
          </p>
          <h1 className="mt-2 max-w-2xl font-display text-3xl text-ink sm:text-4xl">
            {project.name}
          </h1>
          <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-ink/70">
            {project.summary}
          </p>
        </div>
        <div className="rounded-sm border border-line p-5 text-center">
          <p className="font-mono text-4xl text-gold">{project.readiness}</p>
          <p className="font-body text-[10px] uppercase tracking-wide text-ink/40">
            GSDX readiness / 100
          </p>
        </div>
      </div>

      {/* Funding progress */}
      <div className="mt-10 rounded-sm border border-line p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-mono text-xs uppercase tracking-wide text-ink/40">
            Capital mobilized
          </p>
          <p className="font-body text-xs text-ink/50">
            {formatUSD(funded)} of {formatUSD(project.amountRequested)} requested
          </p>
        </div>
        <div className="mt-3 h-2.5 w-full rounded-full bg-line">
          <div className="h-2.5 rounded-full bg-gold" style={{ width: `${fundedPct}%` }} />
        </div>
        <p className="mt-2 font-mono text-sm text-gold">{fundedPct}% funded</p>
      </div>

      {/* Lifecycle */}
      <div className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Pipeline position
        </h2>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {stages.map((s, i) => (
            <span
              key={s}
              className={`rounded-full px-3 py-1.5 font-mono text-[10px] uppercase ${
                i < stageIndex
                  ? "bg-gold/15 text-gold"
                  : i === stageIndex
                  ? "bg-ink text-paper"
                  : "bg-line/50 text-ink/40"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {/* Readiness breakdown */}
        <div>
          <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
            Readiness breakdown
          </h2>
          <div className="mt-4 space-y-3">
            {Object.entries(project.readinessBreakdown).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between font-body text-xs text-ink/60">
                  <span>{breakdownLabels[key]}</span>
                  <span className="font-mono">{value}</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-line">
                  <div
                    className="h-1.5 rounded-full bg-gold"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Facts */}
        <div>
          <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
            Project facts
          </h2>
          <dl className="mt-4 divide-y divide-line border-y border-line font-body text-sm">
            <Fact label="Capital requested" value={formatUSD(project.amountRequested)} />
            <Fact label="Current stage" value={project.stage} />
            <Fact label="Jobs expected" value={project.jobsExpected?.toLocaleString() ?? "—"} />
            {project.capacityMW && (
              <Fact label="Generation capacity" value={`${project.capacityMW} MW`} />
            )}
            <Fact label="Completion" value={`${project.completion}%`} />
          </dl>
        </div>
      </div>

      {/* Where the money goes */}
      <div className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Where this money goes
        </h2>
        <p className="mt-2 max-w-xl font-body text-sm text-ink/60">
          Every project follows the same published GSDX allocation model, so an investor
          in this project and an investor in any other can verify the split identically.
        </p>
        <div className="mt-6 space-y-3">
          {PROJECT_FUND_ALLOCATION.map((a) => (
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

      {/* Invest */}
      <div className="mt-14 border-t border-line pt-10">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Invest in this project
        </h2>
        <InvestPanel type="project" targetId={project.id} targetLabel={project.name} />
      </div>
    </div>
  );
}

function Fact({ label, value }) {
  return (
    <div className="flex justify-between py-3">
      <dt className="text-ink/50">{label}</dt>
      <dd className="font-medium text-ink">{value}</dd>
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
