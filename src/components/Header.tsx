import { useEffect, useState } from "react";
import { Parallax } from "./Effects";
import { Reveal, Counter, useRipple } from "../lib/hooks";
import { DiscordIcon, TwitchIcon, BoltIcon, ChartIcon, UsersIcon } from "./icons";
import { LINKS } from "../lib/data";

const NAV = [
  ["Home", "#home"],
  ["Services", "#services"],
  ["Pricing", "#pricing"],
  ["Reviews", "#reviews"],
  ["Portfolio", "#portfolio"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ripple = useRipple();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          aria-label="Main navigation"
          className={`glass flex items-center justify-between rounded-2xl px-4 py-2.5 transition-shadow duration-500 ${
            scrolled ? "shadow-[0_0_40px_rgba(138,43,226,0.25)]" : ""
          }`}
        >
          {/* logo */}
          <a href="#home" className="group flex items-center gap-3">
            <span className="relative">
              <img
                src="/mascot.png"
                alt="OLADIPS PROMOTIONS mascot logo"
                className="h-11 w-11 rounded-full border border-gold/40 object-cover transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_0_24px_rgba(255,213,74,0.6)]"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink bg-emerald-400" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-extrabold tracking-wide text-white transition-colors group-hover:text-gold">
                OLADIPS
              </span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.32em] text-gold">
                Promotions
              </span>
            </span>
          </a>

          {/* desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="rounded-full px-3.5 py-2 text-[13px] font-medium text-mist transition-all duration-300 hover:bg-white/5 hover:text-gold"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* actions */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href={LINKS.discord}
              target="_blank"
              rel="noreferrer"
              onClick={ripple}
              className="btn-violet ripple-host flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold"
            >
              <DiscordIcon className="h-4 w-4" />
              Join Discord
            </a>
            <a
              href="#pricing"
              onClick={ripple}
              className="btn-gold ripple-host rounded-full px-5 py-2.5 text-[13px] font-bold"
            >
              Get Promotion
            </a>
          </div>

          {/* mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="glass flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl lg:hidden"
          >
            <span className={`h-0.5 w-5 rounded bg-gold transition-all ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 rounded bg-white transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 rounded bg-gold transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </nav>

        {/* mobile menu */}
        {open && (
          <div className="glass mt-2 rounded-2xl p-4 lg:hidden">
            <ul className="grid gap-1">
              {NAV.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-mist transition hover:bg-white/5 hover:text-gold"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <a href={LINKS.discord} target="_blank" rel="noreferrer" className="btn-violet rounded-full px-4 py-3 text-center text-sm font-semibold">
                Join Discord
              </a>
              <a href="#pricing" onClick={() => setOpen(false)} className="btn-gold rounded-full px-4 py-3 text-center text-sm font-bold">
                Get Promotion
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

const HERO_STATS = [
  { value: 50000, suffix: "+", label: "Happy Clients" },
  { value: 10, suffix: "M+", label: "Viewers Reached" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "Support", format: false },
];

export function Hero() {
  const ripple = useRipple();

  return (
    <section id="home" className="relative overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
      {/* mascot watermark */}
      <Parallax strength={30} className="absolute inset-0 flex items-center justify-center">
        <img
          src="/mascot.png"
          alt=""
          aria-hidden="true"
          className="h-[46rem] w-[46rem] max-w-none object-contain opacity-[0.08] blur-[1px] select-none"
        />
      </Parallax>

      {/* neon light beams */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-24 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-violet/20 blur-[120px]" />
        <div className="absolute right-[10%] top-1/2 h-56 w-56 rounded-full bg-gold2/10 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6">
        <Reveal>
          <a
            href={LINKS.discord}
            target="_blank"
            rel="noreferrer"
            className="glass group inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-xs font-semibold text-white transition hover:border-violet2/60"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <Counter target={2847} className="font-tech text-emerald-300" /> members live on Discord
            <span className="text-violet2 transition-transform group-hover:translate-x-1">→</span>
          </a>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="mx-auto mt-8 max-w-4xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl">
            Grow Your <span className="violet-text">Twitch</span> Channel{" "}
            <span className="text-shimmer">Faster Than Ever.</span>
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-mist md:text-lg">
            Professional Twitch promotion, real audience growth, community engagement,
            viewer retention and streaming visibility — trusted by streamers worldwide.
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              onClick={ripple}
              className="btn-gold ripple-host group flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold"
            >
              <BoltIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:rotate-12" />
              Start Growing
            </a>
            <a
              href="#pricing"
              onClick={ripple}
              className="btn-glass ripple-host rounded-full px-8 py-4 text-sm font-bold"
            >
              View Packages
            </a>
          </div>
        </Reveal>

        {/* floating gaming chips */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-32 hidden lg:block">
          <div className="glass absolute left-[7%] top-8 animate-float rounded-2xl px-4 py-3 text-left shadow-[0_0_30px_rgba(138,43,226,0.25)]">
            <div className="flex items-center gap-2 text-violet2"><TwitchIcon className="h-4 w-4" /><span className="text-[10px] font-bold uppercase tracking-widest text-mist">Live viewers</span></div>
            <p className="mt-1 font-tech text-lg font-bold text-white">+1,248 <span className="text-xs text-emerald-400">▲ 312%</span></p>
          </div>
          <div className="glass absolute right-[6%] top-0 animate-float-slow rounded-2xl px-4 py-3 text-left shadow-[0_0_30px_rgba(255,193,7,0.18)]">
            <div className="flex items-center gap-2 text-gold"><UsersIcon className="h-4 w-4" /><span className="text-[10px] font-bold uppercase tracking-widest text-mist">New followers</span></div>
            <p className="mt-1 font-tech text-lg font-bold text-white">+8,940</p>
          </div>
          <div className="glass absolute right-[14%] top-72 animate-float rounded-2xl px-4 py-3 text-left shadow-[0_0_30px_rgba(138,43,226,0.25)]" style={{ animationDelay: "1.4s" }}>
            <div className="flex items-center gap-2 text-violet2"><ChartIcon className="h-4 w-4" /><span className="text-[10px] font-bold uppercase tracking-widest text-mist">Channel rank</span></div>
            <p className="mt-1 font-tech text-lg font-bold text-white">Top 1%</p>
          </div>
        </div>

        {/* stats */}
        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {HERO_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 120} scale>
              <div className="glass card-glow rounded-2xl px-4 py-6">
                <p className="font-tech text-2xl font-bold text-white md:text-3xl">
                  <Counter target={s.value} suffix={s.suffix} format={s.format !== false} />
                </p>
                <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-mist">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
