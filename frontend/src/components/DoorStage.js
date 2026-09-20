import { motion } from "framer-motion";

export default function DoorStage({ onTap }) {
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black" data-testid="door-stage">
      <video
        data-testid="door-video"
        src="/assets/video1.mp4"
        poster="/assets/door-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

      <button
        data-testid="door-tap-button"
        onClick={onTap}
        aria-label="Tap to open the invitation"
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="relative flex items-center justify-center">
          <span className="tap-ring" />
          <span className="tap-ring delay" />
          <span className="tap-core font-prose">Tap to<br />Open</span>
        </span>
      </button>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.9 }}
        className="pointer-events-none absolute inset-x-0 bottom-12 text-center font-prose text-sm italic tracking-wide text-[#f0e6d2]/80"
      >
        Knock, knock — someone is waiting at the door
      </motion.p>
    </div>
  );
}
