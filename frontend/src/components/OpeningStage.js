import { useEffect, useRef } from "react";

export default function OpeningStage({ onDone }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    resize();

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
    window.addEventListener("resize", resize);

    const fallback = setTimeout(finish, 15000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black" data-testid="opening-stage">
      <video
        ref={videoRef}
        data-testid="opening-video"
        src="/assets/video2.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setTimeout(finish, 350)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" data-testid="petal-burst" />
      <button
        data-testid="skip-opening-button"
        onClick={finish}
        className="absolute bottom-10 right-6 rounded-full border border-[#d4af37]/50 px-5 py-2 font-prose text-xs uppercase tracking-[0.25em] text-[#e5c374]/90 backdrop-blur-sm"
      >
        Skip
      </button>
    </div>
  );
}
