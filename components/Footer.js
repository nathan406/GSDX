import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line/70 bg-ink text-paper/70">
      <div className="mx-auto max-w-6xl px-6 py-10 font-body text-sm">
        <p className="font-display text-base text-paper">
          From Dependency to Development. From Development to Shared Prosperity.
        </p>
        <p className="mt-3 max-w-2xl text-paper/50">
          GSDX is a coordination layer, not a replacement for existing development
          institutions — designed to connect development priorities, investment-ready
          projects, capital, implementation, and measurable outcomes.
        </p>
        <Link href="/team" className="mt-6 inline-block text-xs text-paper/50 hover:text-gold2">
          Team →
        </Link>
      </div>
    </footer>
  );
}
