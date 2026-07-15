import { useEffect, useRef } from "react";

/* Gold + purple floating particle field */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const N = Math.min(70, Math.floor(w / 22));
    const parts = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.08),
      gold: Math.random() > 0.45,
      a: Math.random() * 0.6 + 0.15,
      tw: Math.random() * Math.PI * 2,
    }));

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += 0.02;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(255, 213, 74, ${alpha})`
          : `rgba(168, 85, 247, ${alpha})`;
        ctx.shadowColor = p.gold ? "rgba(255,193,7,0.9)" : "rgba(138,43,226,0.9)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
    />
  );
}

/* Soft radial spotlight following the cursor */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let tx = x, ty = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener("pointermove", onMove);

    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.background = `radial-gradient(560px circle at ${x}px ${y}px, rgba(138,43,226,0.10), rgba(255,193,7,0.03) 40%, transparent 65%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}

/* Blurred purple / gold nebula blobs + grid */
export function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-60" />
      <div className="absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-violet/25 blur-[140px] animate-pulse-glow" />
      <div className="absolute top-1/3 -right-48 h-[30rem] w-[30rem] rounded-full bg-violet2/20 blur-[150px] animate-pulse-glow" style={{ animationDelay: "1.2s" }} />
      <div className="absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-gold2/10 blur-[160px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      {/* abstract twitch-inspired glitch bars */}
      <div className="absolute top-24 right-[12%] h-24 w-1 rotate-12 bg-gradient-to-b from-transparent via-violet2/40 to-transparent" />
      <div className="absolute top-1/2 left-[6%] h-32 w-1 -rotate-12 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-1/4 right-[8%] h-20 w-1 rotate-6 bg-gradient-to-b from-transparent via-violet/40 to-transparent" />
    </div>
  );
}

/* Mouse-parallax wrapper (used in hero) */
export function Parallax({ children, strength = 20, className = "" }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * strength;
      const dy = (e.clientY / window.innerHeight - 0.5) * strength;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [strength]);

  return (
    <div ref={ref} className={`transition-transform duration-300 ease-out will-change-transform ${className}`}>
      {children}
    </div>
  );
}
