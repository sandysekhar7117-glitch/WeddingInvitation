import { motion } from "framer-motion";

export default function Chapter({ index, title, testid, children }) {
  return (
    <motion.section
      data-testid={testid}
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      className="py-16"
    >
      <div className="mb-10 flex items-center gap-5">
        <span className="font-script text-5xl text-[#d4af37]/80">{index}</span>
        <div className="flex-1">
          <h2 className="font-display text-base font-light uppercase tracking-[0.4em] text-[#f0e6d2] md:text-lg">
            {title}
          </h2>
          <span className="gold-rule mt-3 block" />
        </div>
      </div>
      {children}
    </motion.section>
  );
}
