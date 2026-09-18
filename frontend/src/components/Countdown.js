import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TARGET = new Date("2026-11-21T20:56:00+05:30").getTime();

const getParts = () => {
  const diff = Math.max(TARGET - Date.now(), 0);
  return {
    Days: Math.floor(diff / 86400000),
    Hours: Math.floor(diff / 3600000) % 24,
    Minutes: Math.floor(diff / 60000) % 60,
    Seconds: Math.floor(diff / 1000) % 60,
  };
};

export default function Countdown() {
  const [parts, setParts] = useState(getParts);

  useEffect(() => {
    const id = setInterval(() => setParts(getParts()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div data-testid="countdown" className="text-center">
      <p className="mb-5 font-prose text-sm italic tracking-[0.3em] text-[#f0e6d2]/70">
        Until the knot is tied
      </p>
      <div className="grid grid-cols-4 gap-3">
        {Object.entries(parts).map(([label, value]) => (
          <div key={label} className="glass rounded-xl px-1 py-4" data-testid={`countdown-${label.toLowerCase()}`}>
            <div className="relative h-9 overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={value}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="block font-display text-3xl font-light text-[#e5c374]"
                >
                  {String(value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="mt-1 block font-prose text-[0.6rem] uppercase tracking-[0.25em] text-[#f0e6d2]/60">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
