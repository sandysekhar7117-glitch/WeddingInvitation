import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function ClosedScreen() {
  return (
    <div
      className="relative flex h-[100dvh] flex-col items-center justify-center bg-[#061614] px-6 text-center"
      data-testid="closed-screen"
    >
      <div className="grain" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        <div className="flex items-center justify-center gap-2 font-script text-5xl text-[#e5c374]">
          S <Heart className="h-5 w-5 fill-[#e0655f] text-[#e0655f]" /> M
        </div>
        <span className="gold-rule mx-auto mt-7 block w-24" />
        <p className="mt-7 font-prose text-lg italic text-[#f0e6d2]/85" data-testid="closed-message">
          The doors are now closed.
        </p>
        <p className="mt-2 font-prose text-sm italic text-[#f0e6d2]/55">
          With love, Raja Sekhar &amp; Meena Kumari &middot; 21 &middot; 11 &middot; 2026
        </p>
      </motion.div>
    </div>
  );
}
