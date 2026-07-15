import { useEffect, useRef, useState, useCallback } from "react";
import type { ReactNode, MouseEvent } from "react";

/* ------- scroll reveal ------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
  scale = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  scale?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${scale ? "reveal-scale" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------- animated counter ------- */
export function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return { ref, value };
}

export function Counter({
  target,
  suffix = "",
  prefix = "",
  className = "",
  format = true,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  format?: boolean;
}) {
  const { ref, value } = useCountUp(target);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {format ? value.toLocaleString() : value}
      {suffix}
    </span>
  );
}

/* ------- ripple button ------- */
export function useRipple() {
  return useCallback((e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const d = Math.max(rect.width, rect.height);
    const span = document.createElement("span");
    span.className = "ripple";
    span.style.width = span.style.height = `${d}px`;
    span.style.left = `${e.clientX - rect.left - d / 2}px`;
    span.style.top = `${e.clientY - rect.top - d / 2}px`;
    el.appendChild(span);
    setTimeout(() => span.remove(), 700);
  }, []);
}

/* ------- section heading ------- */
export function SectionHead({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: ReactNode;
  sub?: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <Reveal>
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
          <span className="h-1.5 w-1.5 rounded-full bg-violet2 animate-blink" />
          {kicker}
        </span>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mt-5 font-display text-3xl font-800 leading-tight text-white sm:text-4xl md:text-5xl font-extrabold">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={200}>
          <p className="mt-4 text-base leading-relaxed text-mist md:text-lg">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}
