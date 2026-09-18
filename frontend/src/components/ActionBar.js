import { motion } from "framer-motion";
import { CalendarPlus, MessageCircle, DoorOpen } from "lucide-react";

const CAL_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=Sekhar%20weds%20Meena%20%E2%80%94%20Wedding%20Ceremony" +
  "&dates=20261121T152600Z/20261121T180000Z" +
  "&details=With%20heavenly%20blessings%2C%20the%20wedding%20ceremony%20(Mithuna%20Lagnam)%20of%20Sekhar%20%26%20Meena%20at%208%3A56%20PM." +
  "&location=Chavas%20Grand%20Function%20Hall%2C%20Government%20Hospital%20Road%2C%20Sulthanabad%2C%20Tenali%2C%20A.P.";

const ACTIONS = [
  { id: "add-calendar-button", label: "Add to Calendar", icon: CalendarPlus, href: CAL_URL },
  {
    id: "whatsapp-share-button",
    label: "Share on WhatsApp",
    icon: MessageCircle,
    href:
      "https://wa.me/?text=" +
      encodeURIComponent(
        "You are warmly invited to the wedding of Sekhar & Meena! Saturday, 21st November 2026, 8:56 PM (Mithuna Lagnam) at Chavas Grand Function Hall, Tenali. Open your invitation: " +
          (typeof window !== "undefined" ? window.location.href : "")
      ),
  },
];

export default function ActionBar({ onReplay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-4 pb-10 pt-4"
      data-testid="action-bar"
    >
      {ACTIONS.map(({ id, label, icon: Icon, href }) => (
        <a
          key={id}
          data-testid={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full max-w-xs items-center justify-center gap-3 rounded-full border border-[#d4af37]/60 bg-[#d4af37]/10 px-8 py-4 font-prose text-xs uppercase tracking-[0.3em] text-[#e5c374] transition-all duration-300 hover:scale-[1.03] hover:bg-[#d4af37]/25"
        >
          <Icon className="h-4 w-4" /> {label}
        </a>
      ))}
      <button
        data-testid="replay-door-button"
        onClick={onReplay}
        className="flex w-full max-w-xs items-center justify-center gap-3 rounded-full border border-[#f0e6d2]/25 px-8 py-4 font-prose text-xs uppercase tracking-[0.3em] text-[#f0e6d2]/85 transition-all duration-300 hover:scale-[1.03] hover:border-[#d4af37]/60 hover:text-[#e5c374]"
      >
        <DoorOpen className="h-4 w-4" /> Replay Door Opening
      </button>
    </motion.div>
  );
}
