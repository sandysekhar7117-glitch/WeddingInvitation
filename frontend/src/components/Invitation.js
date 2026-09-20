import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Chapter from "@/components/Chapter";
import ScratchCard from "@/components/ScratchCard";
import Countdown from "@/components/Countdown";
import GallerySection from "@/components/GallerySection";
import VenueSection from "@/components/VenueSection";
import TimelineSection from "@/components/TimelineSection";
import ActionBar from "@/components/ActionBar";
import MusicToggle from "@/components/MusicToggle";

export default function Invitation({ onReplay, toggleMute }) {
  const bgRef = useRef(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1600], [0, 160]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  return (
    <div className="relative min-h-screen" data-testid="invitation-page">
      <motion.div ref={bgRef} style={{ y: bgY }} className="fixed inset-0 -z-10">
        <img
          src="/assets/background.jpg"
          alt=""
          className="h-full w-full scale-110 object-cover blur-[6px]"
        />
        <div className="absolute inset-0 bg-[#061614]/55" />
        <img
          src="/assets/radha-krishna.png"
          alt=""
          className="absolute bottom-0 left-1/2 h-[65vh] -translate-x-1/2 opacity-[0.09]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061614]/35 via-transparent to-[#061614]/80" />
      </motion.div>
      <div className="grain" />
      <MusicToggle toggleMute={toggleMute} />

      <Hero />
      <Marquee />

      <main className="mx-auto max-w-xl px-6">
        <Chapter index="01" title="The Invitation" testid="chapter-invitation">
          <p className="text-center font-prose text-sm italic tracking-[0.2em] text-[#e5c374]/90">
            || Srirasthu ||&nbsp;&nbsp;|| Shubhamasthu ||&nbsp;&nbsp;|| Avighnamasthu ||
          </p>
          <div className="mt-8 space-y-5 text-center font-prose text-lg leading-relaxed text-[#f0e6d2]/90">
            <p className="italic">
              With heavenly blessings of<br />
              <span className="text-[#e5c374]">Late Smt. Seemavaram Srivalli &amp; Late Sri Seethaiah</span>
            </p>
            <p>
              <span className="font-display text-xl text-[#f0e6d2]">Smt. Devasena</span><br />
              <span className="italic">solicits your gracious presence at the wedding ceremony of</span>
            </p>
            <div className="glass rounded-2xl px-6 py-7">
              <p className="font-script text-5xl text-[#e5c374]" data-testid="groom-name">Raja Sekhar</p>
              <p className="mt-2 text-sm italic text-[#f0e6d2]/75">
                (Youngest S/o. Late Smt. Seemavaram Srivalli<br />&amp; Late Sri Seethaiah)
              </p>
              <p className="my-4 font-prose text-base italic text-[#e5c374]">with</p>
              <p className="font-script text-5xl text-[#e5c374]" data-testid="bride-name">Meena Kumari</p>
              <p className="mt-2 text-sm italic text-[#f0e6d2]/75">
                (Youngest D/o. Sri Ponugupati Srinivasa Rao<br />&amp; Smt. Lalitha)
              </p>
            </div>
          </div>
        </Chapter>

        <Chapter index="02" title="The Auspicious Date" testid="chapter-date">
          <p className="mb-6 text-center font-prose text-base italic text-[#f0e6d2]/75">
            Scratch the card to reveal the day we become one
          </p>
          <ScratchCard />
          <div className="mt-10">
            <Countdown />
          </div>
        </Chapter>

        <Chapter index="03" title="The Couple" testid="chapter-couple">
          <GallerySection />
        </Chapter>

        <Chapter index="04" title="The Venue" testid="chapter-venue">
          <VenueSection />
        </Chapter>

        <Chapter index="05" title="The Celebrations" testid="chapter-celebrations">
          <TimelineSection />
        </Chapter>

        <ActionBar onReplay={onReplay} />

        <footer className="pb-16 pt-4 text-center" data-testid="invitation-footer">
          <span className="gold-rule mx-auto mb-8 block w-32" />
          <p className="font-prose text-base italic text-[#f0e6d2]/80">
            With best compliments from<br />
            <span className="text-[#e5c374]">
              Karthik &ndash; Meera, Dr. Supreeth &ndash; Dr. Pravallika &amp; Suchithra
            </span>
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 font-script text-3xl text-[#e5c374]">
            S <Heart className="h-4 w-4 fill-[#e0655f] text-[#e0655f]" /> M
          </div>
        </footer>
      </main>
    </div>
  );
}
