import Link from "next/link";
import { countries, projects } from "@/lib/data";

export const metadata = { title: "Country hubs — GSDX" };

export default function CountriesPage() {
  const regions = [...new Set(countries.map((c) => c.region))];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">Country hubs</p>
      <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
        Every participating country runs the same system.
      </h1>
      <p className="mt-3 max-w-2xl font-body text-sm text-ink/60">
        Each hub is identical in structure — but each country controls its own
        development priorities and its own project pipeline.
      </p>

      {regions.map((region) => (
        <div key={region} className="mt-12">
          <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">{region}</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {countries
              .filter((c) => c.region === region)
              .map((c) => {
                const projectCount = projects.filter((p) => p.country === c.slug).length;
                return (
                  <Link
                    key={c.slug}
                    href={`/countries/${c.slug}`}
                    className="group block rounded-sm border border-line p-6 transition hover:border-gold"
                  >
                    <h3 className="font-display text-lg text-ink group-hover:text-gold">
                      GSDX — {c.name}
                    </h3>
                    <p className="mt-2 font-body text-xs text-ink/50">
                      {projectCount} active project{projectCount === 1 ? "" : "s"}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {c.priorities.slice(0, 3).map((p) => (
                        <span
                          key={p}
                          className="rounded-full bg-line/60 px-2.5 py-1 font-mono text-[10px] uppercase text-ink/60"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
