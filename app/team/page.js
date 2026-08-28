export const metadata = { title: "Team — GSDX" };

const team = [
  { name: "Niza Mbao", role: "Founder, Lead Developer, Researcher" },
  { name: "Nathan Muyoba", role: "Senior Developer" },
];

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">Team</p>
      <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">The people building GSDX</h1>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {team.map((person) => (
          <div key={person.name} className="rounded-sm border border-line p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink font-display text-lg text-gold2">
              {initials(person.name)}
            </div>
            <p className="mt-4 font-display text-lg text-ink">{person.name}</p>
            <p className="mt-1 font-body text-sm text-ink/60">{person.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
