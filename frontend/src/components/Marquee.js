const ITEMS = ["Sekhar & Meena", "21 · 11 · 2026", "Chavas Grand Function Hall", "Tenali", "Mithuna Lagnam"];

export default function Marquee() {
  const row = (
    <>
      {ITEMS.map((item, i) => (
        <span key={i} className="mx-8 flex items-center gap-8 font-display text-xs uppercase tracking-[0.4em] text-[#e5c374]/70">
          {item} <span className="text-[#d4af37]/50">&#10022;</span>
        </span>
      ))}
    </>
  );
  return (
    <div className="overflow-hidden border-y border-[#d4af37]/15 py-4" data-testid="marquee">
      <div className="marquee-track">
        <div className="flex shrink-0">{row}{row}</div>
        <div className="flex shrink-0">{row}{row}</div>
      </div>
    </div>
  );
}
