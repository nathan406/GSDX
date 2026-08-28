export const metadata = { title: "Team — GSDX" };

const team = [
  { name: "Niza Mbao", role: "Founder", image: "/images/niza.jpeg" },
  { name: "Nathan Muyoba", role: "Lead Developer", image: "/images/nathan.png" },
];

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">Team</p>
      <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">The people building GSDX</h1>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {team.map((person) => (
          <div key={person.name} className="rounded-sm border border-line bg-paper p-6 transition hover:border-gold">
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
  );
}
