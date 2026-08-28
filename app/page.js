import Link from "next/link";
import { stages, countries, projects } from "@/lib/data";

const team = [
  { name: "Niza Mbao", role: "Founder", image: "/images/niza.jpeg" },
  { name: "Nathan Muyoba", role: "Lead Developer", image: "/images/nathan.png" },
];

const network = [
  { role: "Governments", detail: "Establish national development priorities and submit projects." },
  { role: "Development institutions", detail: "Provide funding, technical assistance, and expertise." },
  { role: "Private investors", detail: "Access verified opportunities across developing countries." },
  { role: "Businesses", detail: "Develop and participate directly in projects." },
  { role: "Financial institutions", detail: "Structure and participate in financing." },
  { role: "Foundations & philanthropies", detail: "Support projects not yet commercially viable." },
  { role: "Citizens", detail: "Participate through jobs, businesses, and the development dividend." },
];

const multiplierSteps = [
  { label: "GSDX development capital", value: "$50M" },
  { label: "Private investment", value: "$100M" },
  { label: "Domestic investment", value: "$50M" },
  { label: "Institutional financing", value: "$50M" },
];

const features = [
  {
    href: "/countries",
    category: "Countries",
    title: "Country hubs",
    detail: "20 country development profiles across Africa, Asia, Latin America, the Middle East, and the Pacific — each with priorities and investment opportunities.",
  },
  {
    href: "/mega-projects",
    category: "Flagships",
    title: "Mega-projects",
    detail: "8 flagship national-scale projects with capital structure breakdowns, citizen distribution calculators, and transaction ledgers.",
  },
  {
    href: "/youth",
    category: "Youth",
    title: "Youth project hub",
    detail: "Young people submit development ideas, get live readiness scores, and connect with matching funding and partnership opportunities.",
  },
  {
    href: "/businesses",
    category: "Businesses",
    title: "Business profiles",
    detail: "African business profiles with trade readiness scoring and cross-border partner matching.",
  },
  {
    href: "/trade",
    category: "Trade",
    title: "Trade marketplace",
    detail: "African trade opportunities filtered by country and sector — capital required, partnerships needed.",
  },
  {
    href: "/funding",
    category: "Funding",
    title: "Funding marketplace",
    detail: "8 funders across grants, equity, debt, and guarantees — with a matcher that scores any project against every funder.",
  },
  {
    href: "/investors",
    category: "Capital",
    title: "Investor matching",
    detail: "Match your investment profile against the project registry — sectors, regions, and ticket size.",
  },
  {
    href: "/transparency",
    category: "Transparency",
    title: "Public ledger",
    detail: "Every investment recorded on the platform, filterable by country — platform-wide totals included.",
  },
  {
    href: "/dividend",
    category: "Citizens",
    title: "Development dividend",
    detail: "The Universal Development Dividend and citizen wealth flow from development capital.",
  },
  {
    href: "/governance",
    category: "Governance",
    title: "Global council",
    detail: "GSDX Global Council and regional governance structure.",
  },
  {
    href: "/payment-methods",
    category: "Payments",
    title: "Payment methods",
    detail: "Real mobile money and digital wallet providers for every GSDX country.",
  },
];

export default function Home() {
  const readiest = [...projects].sort((a, b) => b.readiness - a.readiness).slice(0, 3);

  return (
    <div>
      {/* HERO — signature element: the capital flow diagram */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-14 md:grid-cols-[1.1fr_0.9fr] md:pt-24">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">
              Global Sustainable Development Exchange
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.08] text-ink sm:text-5xl md:text-[3.4rem]">
              From dependency to development.
              <br />
              From development to <span className="text-gold">shared prosperity.</span>
            </h1>
            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-ink/70">
              GSDX connects developing countries, capital, and citizens through one
              coordination layer — turning development capital into productive assets,
              productive assets into economic growth, and growth into national and
              citizen wealth.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="rounded-sm bg-ink px-5 py-3 font-body text-sm font-medium text-paper transition hover:bg-inkline"
              >
                Browse the project registry
              </Link>
              <Link
                href="/investors"
                className="rounded-sm border border-ink/20 px-5 py-3 font-body text-sm font-medium text-ink transition hover:border-gold hover:text-gold"
              >
                Match investment capital
              </Link>
              <Link
                href="/youth"
                className="rounded-sm border border-ink/20 px-5 py-3 font-body text-sm font-medium text-ink transition hover:border-gold hover:text-gold"
              >
                Youth Project Hub
              </Link>
              <Link
                href="/trade"
                className="rounded-sm border border-ink/20 px-5 py-3 font-body text-sm font-medium text-ink transition hover:border-gold hover:text-gold"
              >
                African Trade Opportunities
              </Link>
            </div>
          </div>

          <CapitalFlowDiagram />
        </div>
      </section>

      {/* THE NETWORK */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionEyebrow>The GSDX network</SectionEyebrow>
          <h2 className="mt-2 max-w-2xl font-display text-2xl text-ink sm:text-3xl">
            One system, seven kinds of participants.
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {network.map((n) => (
              <div key={n.role} className="bg-paper p-6">
                <h3 className="font-display text-lg text-ink">{n.role}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/60">{n.detail}</p>
              </div>
            ))}
            <div className="flex flex-col justify-center bg-ink p-6">
              <p className="font-display text-lg text-gold2">
                {countries.length} country hubs live
              </p>
              <p className="mt-2 font-body text-sm text-paper/60">
                {projects.length} projects currently moving through the pipeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT LIFECYCLE — a real sequence, numbering is earned here */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionEyebrow>The pipeline</SectionEyebrow>
          <h2 className="mt-2 max-w-2xl font-display text-2xl text-ink sm:text-3xl">
            Every project moves through the same thirteen stages.
          </h2>
          <p className="mt-3 max-w-2xl font-body text-sm text-ink/60">
            A standardized lifecycle across every participating country, from first idea
            to measured impact — so investors can trust what "investment ready" means.
          </p>
          <ol className="mt-10 flex flex-wrap gap-x-2 gap-y-4">
            {stages.map((s, i) => (
              <li key={s} className="flex items-center">
                <span className="flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 font-mono text-xs text-ink/70">
                  <span className="text-gold">{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </span>
                {i < stages.length - 1 && <span className="mx-1 text-ink/20">→</span>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CAPITAL MULTIPLIER */}
      <section className="border-b border-line bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionEyebrow inverted>The capital multiplier</SectionEyebrow>
          <h2 className="mt-2 max-w-2xl font-display text-2xl sm:text-3xl">
            Catalytic capital, not permanent dependency.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-4">
            {multiplierSteps.map((step, i) => (
              <div key={step.label} className="border-t border-gold/40 pt-4">
                <p className="font-display text-2xl text-gold2">{step.value}</p>
                <p className="mt-1 font-body text-xs uppercase tracking-wide text-paper/50">
                  {step.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 font-display text-xl text-gold2">= $250M total development activity</p>
        </div>
      </section>

      {/* HIGH-READINESS PROJECTS */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-end justify-between">
            <div>
              <SectionEyebrow>Investment ready</SectionEyebrow>
              <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
                Highest GSDX readiness scores
              </h2>
            </div>
            <Link href="/projects" className="font-body text-sm text-gold hover:underline">
              View full registry →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {readiest.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="group block rounded-sm border border-line p-6 transition hover:border-gold"
              >
                <p className="font-mono text-xs uppercase tracking-wide text-ink/40">{p.sector}</p>
                <h3 className="mt-2 font-display text-lg text-ink group-hover:text-gold">
                  {p.name}
                </h3>
                <p className="mt-3 font-mono text-2xl text-gold">{p.readiness}/100</p>
                <p className="font-body text-xs text-ink/50">GSDX development readiness</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionEyebrow>Platform features</SectionEyebrow>
          <h2 className="mt-2 max-w-2xl font-display text-2xl text-ink sm:text-3xl">
            Everything the platform offers.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group block rounded-sm border border-line bg-paper p-6 transition hover:border-gold"
              >
                <p className="font-mono text-xs uppercase tracking-wide text-clay">{f.category}</p>
                <h3 className="mt-2 font-display text-lg text-ink group-hover:text-gold">
                  {f.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/60">
                  {f.detail}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionEyebrow>Team</SectionEyebrow>
          <h2 className="mt-2 max-w-2xl font-display text-2xl text-ink sm:text-3xl">
            The people building GSDX.
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {team.map((person) => (
              <div key={person.name} className="group rounded-sm border border-line bg-paper p-6 transition hover:border-gold">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-5 font-display text-xl text-ink">{person.name}</p>
                <p className="mt-1 font-body text-sm text-ink/60">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionEyebrow({ children, inverted }) {
  return (
    <p
      className={`font-mono text-xs uppercase tracking-[0.25em] ${
        inverted ? "text-gold2" : "text-clay"
      }`}
    >
      {children}
    </p>
  );
}

function CapitalFlowDiagram() {
  const nodes = ["Capital", "Projects", "Wealth", "Citizens"];
  return (
    <div className="relative flex items-center justify-center rounded-sm border border-line bg-ink p-8">
      <svg viewBox="0 0 320 320" className="h-full w-full max-w-sm" role="img" aria-label="Capital flow diagram: capital moves through projects into national wealth and citizen benefit">
        <defs>
          <linearGradient id="flowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E4C77A" />
            <stop offset="100%" stopColor="#B8892B" />
          </linearGradient>
        </defs>
        <path
          id="flowPath"
          d="M 160 30 C 260 70, 260 130, 160 160 C 60 190, 60 250, 160 290"
          fill="none"
          stroke="#1F4A40"
          strokeWidth="2"
        />
        {nodes.map((label, i) => {
          const y = 30 + i * 86.6;
          const x = i % 2 === 0 ? 160 : 160;
          return (
            <g key={label}>
              <circle cx={i === 0 || i === 3 ? 160 : (i === 1 ? 250 : 70)} cy={y} r="5" fill="url(#flowGrad)" />
              <text
                x={i === 0 || i === 3 ? 160 : (i === 1 ? 250 : 70)}
                y={y - 14}
                textAnchor="middle"
                className="font-mono"
                fill="#F5F2EA"
                fontSize="11"
                letterSpacing="0.05em"
              >
                {label.toUpperCase()}
              </text>
            </g>
          );
        })}
        <circle r="4" fill="#E4C77A">
          <animateMotion dur="6s" repeatCount="indefinite" path="M 160 30 C 260 70, 260 130, 160 160 C 60 190, 60 250, 160 290" />
        </circle>
        <circle r="3" fill="#E4C77A" opacity="0.6">
          <animateMotion dur="6s" begin="2s" repeatCount="indefinite" path="M 160 30 C 260 70, 260 130, 160 160 C 60 190, 60 250, 160 290" />
        </circle>
      </svg>
    </div>
  );
}
