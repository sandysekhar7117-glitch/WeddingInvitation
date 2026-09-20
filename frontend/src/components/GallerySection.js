import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const PHOTOS = [
  { src: "/assets/gallery/gallery-5.jpg", caption: "At the Threshold", numeral: "I" },
  { src: "/assets/gallery/gallery-1.jpg", caption: "The Promise", numeral: "II" },
  { src: "/assets/gallery/gallery-4.jpg", caption: "Strings of the Heart", numeral: "III" },
  { src: "/assets/gallery/gallery-3.jpg", caption: "Royal Evenings", numeral: "IV" },
  { src: "/assets/gallery/gallery-2.jpg", caption: "Our Little Family", numeral: "V" },
];

export default function GallerySection() {
  const [deck, setDeck] = useState(PHOTOS.map((_, i) => i));
  const cycle = () => setDeck(([top, ...rest]) => [...rest, top]);

  return (
    <div data-testid="gallery-section">
      <p className="mb-8 text-center font-prose text-base italic text-[#f0e6d2]/75">
        Swipe right through our moments together
      </p>
      <div className="relative mx-auto h-[26rem] w-full max-w-[19rem]" data-testid="gallery-deck">
        {deck.map((photoIdx, pos) => {
          const photo = PHOTOS[photoIdx];
          const isTop = pos === 0;
          return (
            <motion.figure
              key={photo.src}
              data-testid={`gallery-card-${photoIdx + 1}`}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(e, info) => {
                if (info.offset.x > 70 || info.velocity.x > 400) cycle();
              }}
              animate={{
                x: 0,
                y: pos * 14,
                scale: 1 - pos * 0.05,
                rotate: pos * 2,
                opacity: pos < 4 ? 1 : 0,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              style={{ zIndex: PHOTOS.length - pos }}
              className={`absolute inset-0 overflow-hidden rounded-2xl border border-[#d4af37]/40 bg-[#0d322f] shadow-[0_18px_50px_rgba(0,0,0,0.55)] ${isTop ? "cursor-grab active:cursor-grabbing" : ""}`}
            >
              <img
                src={photo.src}
                alt={`Sekhar and Meena — ${photo.caption}`}
                draggable={false}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061614]/75 via-transparent to-transparent" />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-left">
                <span className="font-script text-3xl text-[#d4af37]">{photo.numeral}</span>
                <p className="font-prose text-sm italic tracking-[0.15em] text-[#f0e6d2]">{photo.caption}</p>
              </figcaption>
            </motion.figure>
          );
        })}
      </div>
      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="flex items-center gap-2" data-testid="gallery-dots">
          {PHOTOS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${deck[0] === i ? "w-5 bg-[#d4af37]" : "w-1.5 bg-[#f0e6d2]/30"}`}
            />
          ))}
        </div>
        <button
          data-testid="gallery-next-button"
          onClick={cycle}
          aria-label="Next photo"
          className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/50 text-[#e5c374] transition-transform hover:scale-110"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
