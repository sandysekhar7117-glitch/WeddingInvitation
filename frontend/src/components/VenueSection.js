import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, MapPin, X } from "lucide-react";

const MAP_SHARE = "https://share.google/eJVH415p0UFWWCHqp";
const MAP_EMBED = "https://maps.google.com/maps?q=Chavas%20Grand%20Function%20Hall%2C%20Tenali%2C%20Andhra%20Pradesh&z=15&output=embed";

export default function VenueSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-center" data-testid="venue-section">
      <MapPin className="mx-auto mb-4 h-6 w-6 text-[#d4af37]" />
      <h3 className="font-display text-2xl font-light text-[#f0e6d2]" data-testid="venue-name">
        Chavas Grand Function Hall
      </h3>
      <p className="mt-2 font-prose text-base italic text-[#f0e6d2]/75" data-testid="venue-address">
        Government Hospital Road, Sulthanabad,<br />Tenali, Andhra Pradesh
      </p>
      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          data-testid="venue-map-button"
          onClick={() => setOpen(true)}
          className="rounded-full border border-[#d4af37]/60 bg-[#d4af37]/10 px-7 py-3 font-prose text-xs uppercase tracking-[0.3em] text-[#e5c374] transition-colors hover:bg-[#d4af37]/25"
        >
          Open Map
        </button>
        <a
          data-testid="venue-directions-link"
          href={MAP_SHARE}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-[#f0e6d2]/25 px-7 py-3 font-prose text-xs uppercase tracking-[0.3em] text-[#f0e6d2]/85 transition-colors hover:border-[#d4af37]/60 hover:text-[#e5c374]"
        >
          Directions <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="map-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 12 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#d4af37]/40 bg-[#0d322f]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#d4af37]/20 px-5 py-3">
                <span className="font-prose text-sm italic text-[#e5c374]">Chavas Grand Function Hall, Tenali</span>
                <button data-testid="map-modal-close" onClick={() => setOpen(false)} aria-label="Close map"
                  className="rounded-full p-1 text-[#f0e6d2]/70 transition-colors hover:text-[#e5c374]">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <iframe
                title="Venue map"
                src={MAP_EMBED}
                className="h-[60dvh] w-full"
                loading="lazy"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
