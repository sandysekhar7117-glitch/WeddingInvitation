import { motion } from "framer-motion";

const PHOTOS = [
  { src: "/assets/gallery/gallery-5.jpg", caption: "At the Threshold", numeral: "I", aspect: "aspect-[2/3]", align: "mr-auto w-[86%]" },
  { src: "/assets/gallery/gallery-1.jpg", caption: "The Promise", numeral: "II", aspect: "aspect-[2/3]", align: "ml-auto w-[86%]" },
  { src: "/assets/gallery/gallery-4.jpg", caption: "Strings of the Heart", numeral: "III", aspect: "aspect-[3/2]", align: "w-full" },
  { src: "/assets/gallery/gallery-3.jpg", caption: "Royal Evenings", numeral: "IV", aspect: "aspect-[2/3]", align: "mr-auto w-[86%]" },
  { src: "/assets/gallery/gallery-2.jpg", caption: "Our Little Family", numeral: "V", aspect: "aspect-[2/3]", align: "ml-auto w-[86%]" },
];

const PhotoCard = ({ photo, index }) => (
  <motion.figure
    data-testid={`gallery-photo-${index + 1}`}
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    className={`${photo.align} mb-14 last:mb-0`}
  >
    <div className="relative">
      <span className="absolute inset-0 translate-x-3 translate-y-3 rounded-sm border border-[#d4af37]/40" />
      <motion.div
        initial={{ clipPath: "inset(12% 12% 12% 12%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className={`relative overflow-hidden rounded-sm ${photo.aspect}`}
      >
        <motion.img
          src={photo.src}
          alt={`Sekhar and Meena — ${photo.caption}`}
          loading="lazy"
          initial={{ scale: 1.18 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061614]/40 via-transparent to-transparent" />
      </motion.div>
    </div>
    <figcaption className="mt-4 flex items-baseline gap-3">
      <span className="font-script text-3xl text-[#d4af37]">{photo.numeral}</span>
      <span className="font-prose text-sm italic tracking-[0.2em] text-[#f0e6d2]/80">{photo.caption}</span>
    </figcaption>
  </motion.figure>
);

export default function GallerySection() {
  return (
    <div data-testid="gallery-section">
      <p className="mb-10 text-center font-prose text-base italic text-[#f0e6d2]/75">
        Moments from our journey together
      </p>
      {PHOTOS.map((photo, i) => (
        <PhotoCard key={photo.src} photo={photo} index={i} />
      ))}
    </div>
  );
}
