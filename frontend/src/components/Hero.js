import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

const MaskedLine = ({ children, delay = 0, className = "" }) => (
  <div className="-mx-4 -mb-2 overflow-hidden px-4 pb-2">
    <motion.div
      className={className}
      initial={{ y: "115%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.15, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <header ref={ref} className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center" data-testid="hero">
      <motion.div style={{ y, opacity }} className="flex flex-col items-center">
        <MaskedLine delay={0.15}>
          <p className="font-prose text-xs uppercase italic tracking-[0.5em] text-[#e5c374]/85">
            The Wedding Of
          </p>
        </MaskedLine>
        <div className="mt-6" data-testid="hero-names">
          <MaskedLine delay={0.35}>
            <h1 className="font-script text-7xl leading-tight text-[#f0e6d2] drop-shadow-[0_2px_24px_rgba(212,175,55,0.35)] sm:text-8xl">
              Sekhar
            </h1>
          </MaskedLine>
          <MaskedLine delay={0.5}>
            <p className="my-1 font-display text-3xl font-light italic text-[#d4af37]">&amp;</p>
          </MaskedLine>
          <MaskedLine delay={0.65}>
            <h1 className="font-script text-7xl leading-tight text-[#f0e6d2] drop-shadow-[0_2px_24px_rgba(212,175,55,0.35)] sm:text-8xl">
              Meena
            </h1>
          </MaskedLine>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-[#e5c374]/70"
      >
        <span className="font-prose text-[0.65rem] uppercase tracking-[0.35em]">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.div>
    </header>
  );
}
