import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function DoorStage({ onDone }) {
  const [opening, setOpening] = useState(false);
  const video2Ref = useRef(null);
  const canvasRef = useRef(null);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  useEffect(() => {
    if (!opening) return;
    const vid = video2Ref.current;
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;

    const colors = ["#e8b4b8", "#f6d186", "#d4af37", "#f4ead5", "#e0655f", "#9fd8cb"];
    const petals = Array.from({ length: 120 }, () => {
      const a = Math.random() * Math.PI * 2;
      const s = (4 + Math.random() * 10) * dpr;
      return {
        x: canvas.width / 2, y: canvas.height / 2,
        vx: Math.cos(a) * s, vy: Math.sin(a) * s - 3 * dpr,
        r: (3 + Math.random() * 7) * dpr,
        rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.25,
        color: colors[(Math.random() * colors.length) | 0],
        life: 1, decay: 0.005 + Math.random() * 0.007,
      };
    });
    let raf;
    const tick = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of petals) {
        if (p.life <= 0) continue;
        alive = true;
        p.vy += 0.12 * dpr; p.vx *= 0.985; p.vy *= 0.985;
        p.x += p.vx + Math.sin(t / 300 + p.rot * 10) * 0.6 * dpr;
        p.y += p.vy; p.rot += p.vr; p.life -= p.decay;
        ctx.save();
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      if (alive) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const fallback = setTimeout(finish, 15000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opening]);

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
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${opening ? "opacity-0" : "opacity-100"}`}
      />
      <video
        ref={video2Ref}
        data-testid="opening-video"
        src="/assets/video2.mp4"
        muted
        playsInline
        preload="auto"
        onEnded={() => setTimeout(finish, 300)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${opening ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" data-testid="petal-burst" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

      {!opening && (
        <button
          data-testid="door-tap-button"
          onClick={() => setOpening(true)}
          aria-label="Tap to open the invitation"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="relative flex items-center justify-center">
            <span className="tap-ring" />
            <span className="tap-ring delay" />
            <span className="tap-core font-prose">Tap to<br />Open</span>
          </span>
        </button>
      )}

      {!opening && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9 }}
          className="pointer-events-none absolute inset-x-0 bottom-12 text-center font-prose text-sm italic tracking-wide text-[#f0e6d2]/80"
        >
          Knock, knock — someone is waiting at the door
        </motion.p>
      )}

      {opening && (
        <button
          data-testid="skip-opening-button"
          onClick={finish}
          className="absolute bottom-10 right-6 rounded-full border border-[#d4af37]/50 px-5 py-2 font-prose text-xs uppercase tracking-[0.25em] text-[#e5c374]/90 backdrop-blur-sm"
        >
          Skip
        </button>
      )}
    </div>
  );
}
