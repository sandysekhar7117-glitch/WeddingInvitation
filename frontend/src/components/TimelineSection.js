import { motion } from "framer-motion";
import { Music, Sparkles, Heart } from "lucide-react";

const EVENTS = [
  { date: "20 November 2026", time: "7:00 AM Onwards", title: "Haldi", note: "A golden morning of turmeric & blessings", icon: Sparkles },
  { date: "20 November 2026", time: "7:00 PM Onwards", title: "Sangeeth", note: "An evening of music, dance & celebration", icon: Music },
  { date: "21 November 2026", time: "8:56 PM", title: "Muhurtham", note: "Sekhar weds Meena · Mithuna Lagnam", icon: Heart },
];

export default function TimelineSection() {
  return (
    <div className="relative mx-auto max-w-md pl-8" data-testid="timeline">
      <span className="absolute bottom-4 left-[9px] top-2 w-px bg-gradient-to-b from-[#d4af37]/60 via-[#d4af37]/25 to-transparent" />
      {EVENTS.map((ev, i) => (
        <motion.div
          key={ev.title}
          data-testid={`timeline-${ev.title.toLowerCase()}`}
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-10 last:mb-0"
        >
          <span className="absolute -left-8 top-1 flex h-[19px] w-[19px] items-center justify-center rounded-full border border-[#d4af37]/70 bg-[#061614]">
            <ev.icon className="h-2.5 w-2.5 text-[#e5c374]" />
          </span>
          <p className="font-prose text-xs uppercase tracking-[0.3em] text-[#e5c374]/80">
            {ev.date} &middot; {ev.time}
          </p>
          <h3 className="mt-1 font-display text-2xl font-light text-[#f0e6d2]">{ev.title}</h3>
          <p className="font-prose text-sm italic text-[#f0e6d2]/65">{ev.note}</p>
        </motion.div>
      ))}
    </div>
  );
}
