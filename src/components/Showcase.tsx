import { useEffect, useState } from "react";
import { Reveal, SectionHead, useRipple } from "../lib/hooks";
import { StarIcon, CheckIcon, TwitchIcon, ChartIcon } from "./icons";
import { TESTIMONIALS, PORTFOLIO, PRICING, LINKS } from "../lib/data";

/* ================= TESTIMONIALS ================= */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section id="reviews" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHead
          kicker="Client Reviews"
          title={<>Streamers <span className="violet-text">Love</span> The Results</>}
          sub="Thousands of creators trust OLADIPS PROMOTIONS. Here's what they say."
        />
        <Reveal scale>
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="glass relative overflow-hidden rounded-[2rem] shadow-[0_0_60px_rgba(138,43,226,0.15)]">
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {TESTIMONIALS.map((t) => (
                  <figure key={t.name} className="w-full shrink-0 px-8 py-12 text-center md:px-16">
                    <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${t.color} font-display text-lg font-extrabold text-ink shadow-[0_0_28px_rgba(168,85,247,0.45)]`}>
                      {t.initials}
                    </div>
                    <div className="mt-4 flex justify-center gap-1 text-gold" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} className="h-4 w-4 drop-shadow-[0_0_6px_rgba(255,213,74,0.7)]" />
                      ))}
                    </div>
                    <blockquote className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-6">
                      <p className="font-display text-sm font-bold text-gold">{t.name}</p>
                      <p className="mt-1 text-xs text-mist">{t.role}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {/* dots */}
            <div className="mt-6 flex justify-center gap-2.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Show review ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-400 ${
                    i === index
                      ? "w-8 bg-gradient-to-r from-gold to-gold2 shadow-[0_0_12px_rgba(255,193,7,0.6)]"
                      : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= PORTFOLIO ================= */
export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          kicker="Portfolio"
          title={<>Real Channels. <span className="gold-text">Real Results.</span></>}
          sub="Before & after growth from recent client campaigns — the numbers speak for themselves."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {PORTFOLIO.map((p, i) => (
            <Reveal key={p.channel} delay={i * 140}>
              <article className="glass card-glow flex h-full flex-col overflow-hidden rounded-3xl">
                {/* header */}
                <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/20 text-violet2">
                      <TwitchIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold text-white">{p.channel}</h3>
                      <p className="text-[11px] text-mist">{p.game} • {p.period}</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 font-tech text-[11px] font-bold text-emerald-300">
                    {p.growth}
                  </span>
                </div>

                {/* mock analytics chart */}
                <div className="px-6 pt-6">
                  <div className="flex h-28 items-end gap-2" aria-hidden="true">
                    {p.bars.map((h, bi) => (
                      <div key={bi} className="flex-1 rounded-t-md bg-gradient-to-t from-violet/60 to-violet2 transition-all duration-500 hover:from-gold2/60 hover:to-gold" style={{ height: `${h}%`, opacity: 0.45 + (bi / p.bars.length) * 0.55 }} />
                    ))}
                  </div>
                  <div className="mt-1 flex justify-between text-[9px] uppercase tracking-widest text-mist/60">
                    <span>Week 1</span><span>Campaign end</span>
                  </div>
                </div>

                {/* before / after */}
                <div className="mt-6 grid grid-cols-2 gap-3 px-6 pb-6">
                  <div className="rounded-2xl border border-white/5 bg-black/30 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-mist">Before</p>
                    <p className="mt-2 font-tech text-lg font-bold text-white/60">{p.before.viewers} <span className="text-[10px] font-normal text-mist">avg viewers</span></p>
                    <p className="font-tech text-sm text-white/50">{p.before.followers.toLocaleString()} <span className="text-[10px] font-normal text-mist">followers</span></p>
                  </div>
                  <div className="rounded-2xl border border-gold/25 bg-gold/5 p-4 shadow-[0_0_24px_rgba(255,213,74,0.08)]">
                    <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold"><ChartIcon className="h-3 w-3" /> After</p>
                    <p className="mt-2 font-tech text-lg font-bold text-gold">{p.after.viewers} <span className="text-[10px] font-normal text-mist">avg viewers</span></p>
                    <p className="font-tech text-sm text-white">{p.after.followers.toLocaleString()} <span className="text-[10px] font-normal text-mist">followers</span></p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= PRICING ================= */
export function Pricing() {
  const ripple = useRipple();

  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          kicker="Pricing"
          title={<>Choose Your <span className="gold-text">Growth Plan</span></>}
          sub="Transparent pricing. No hidden fees. Cancel anytime — but you won't want to."
        />
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {PRICING.map((p, i) => (
            <Reveal key={p.name} delay={i * 140} scale>
              <article
                className={`relative flex h-full flex-col rounded-[1.8rem] p-8 transition-all duration-400 ${
                  p.featured
                    ? "border-2 border-gold/60 bg-gradient-to-b from-ink3 to-ink2 shadow-[0_0_60px_rgba(255,193,7,0.18)] lg:-my-4 lg:py-12 hover:shadow-[0_0_80px_rgba(255,193,7,0.3)]"
                    : "glass card-glow"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold to-gold2 px-5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink shadow-[0_0_20px_rgba(255,193,7,0.5)]">
                    ★ Most Popular
                  </span>
                )}
                <h3 className={`font-display text-xl font-extrabold ${p.featured ? "gold-text" : "text-white"}`}>
                  {p.name}
                </h3>
                <p className="mt-1 text-xs text-mist">{p.tag}</p>
                <p className="mt-6 flex items-end gap-1">
                  <span className="font-tech text-5xl font-bold text-white">${p.price}</span>
                  <span className="mb-1.5 text-xs text-mist">/ campaign</span>
                </p>
                <ul className="mt-7 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/85">
                      <span className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full ${p.featured ? "bg-gold/20 text-gold" : "bg-violet/25 text-violet2"}`}>
                        <CheckIcon className="h-2.5 w-2.5" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={LINKS.fiverr}
                  target="_blank"
                  rel="noreferrer"
                  onClick={ripple}
                  className={`ripple-host mt-8 block rounded-full py-3.5 text-center text-sm font-bold ${
                    p.featured ? "btn-gold" : "btn-violet"
                  }`}
                >
                  Get {p.name}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-12 text-center text-sm text-mist">
            Need a custom plan?{" "}
            <a href={LINKS.discord} target="_blank" rel="noreferrer" className="font-semibold text-gold underline-offset-4 hover:underline">
              Talk to us on Discord
            </a>{" "}
            and we'll build one for you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
