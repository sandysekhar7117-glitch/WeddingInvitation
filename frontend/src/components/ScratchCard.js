import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ScratchCard() {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const moves = useRef(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const paint = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      g.addColorStop(0, "#a87b2a");
      g.addColorStop(0.45, "#e5c374");
      g.addColorStop(0.55, "#caa64e");
      g.addColorStop(1, "#8a6420");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255,255,255,0.14)";
      for (let i = -canvas.height; i < canvas.width; i += 14) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + canvas.height, canvas.height);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(6,22,20,0.75)";
      ctx.font = "italic 600 15px 'Cormorant Garamond', serif";
      ctx.textAlign = "center";
      ctx.fillText("S C R A T C H   H E R E", canvas.width / 2, canvas.height / 2 - 6);
      ctx.font = "italic 12px 'Cormorant Garamond', serif";
      ctx.fillText("to unveil the auspicious date", canvas.width / 2, canvas.height / 2 + 14);
    };
    paint();
    window.addEventListener("resize", paint);
    return () => window.removeEventListener("resize", paint);
  }, []);

  const scratch = (e) => {
    if (revealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    moves.current += 1;
    if (moves.current % 12 === 0) {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0;
      for (let i = 3; i < data.length; i += 16 * 4) if (data[i] === 0) clear += 1;
      if (clear / (data.length / (16 * 4)) > 0.45) setRevealed(true);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      className="relative mx-auto h-44 w-full max-w-sm overflow-hidden rounded-2xl border border-[#d4af37]/40 shadow-[0_10px_50px_rgba(0,0,0,0.45)]"
      data-testid="scratch-card"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d322f] text-center">
        <p className="font-prose text-xs uppercase italic tracking-[0.35em] text-[#e5c374]/80">Saturday</p>
        <p className="font-script text-5xl text-[#f0e6d2]" data-testid="scratch-date">21 November 2026</p>
        <p className="mt-1 font-prose text-sm italic text-[#e5c374]">8:56 PM &middot; Mithuna Lagnam</p>
      </div>
      <motion.canvas
        ref={canvasRef}
        data-testid="scratch-canvas"
        className="scratch-canvas absolute inset-0 h-full w-full"
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        style={{ pointerEvents: revealed ? "none" : "auto" }}
        onPointerDown={(e) => { drawing.current = true; e.target.setPointerCapture(e.pointerId); scratch(e); }}
        onPointerMove={(e) => drawing.current && scratch(e)}
        onPointerUp={() => { drawing.current = false; }}
      />
    </motion.div>
  );
}
