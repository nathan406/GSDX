import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2 font-display text-lg tracking-tight text-ink">
          <span className="text-gold">GSDX</span>
          <span className="hidden font-body text-xs uppercase tracking-[0.2em] text-ink/50 sm:inline">
            Global Sustainable Development Exchange
          </span>
        </Link>
        <nav className="hidden font-body text-sm text-ink/70 lg:flex">
          <Link href="/projects" className="transition hover:text-gold">
            Browse Projects
          </Link>
          <Link href="/team" className="transition hover:text-gold">
            Team
          </Link>
        </nav>
      </div>
    </header>
  );
}
