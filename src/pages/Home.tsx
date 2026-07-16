import { useEffect, useState } from "react";
import { ParticleField, CursorSpotlight, BackgroundFX } from "../components/Effects";
import { Navbar, Hero } from "../components/Header";
import { Services, HowItWorks, WhyUs, LiveStats } from "../components/Sections";
import { Testimonials, Portfolio, Pricing } from "../components/Showcase";
import { Faq, Contact, Footer } from "../components/Closing";

const MARQUEE = [
  "⚡ 12,400+ Channels Promoted",
  "🎮 Trusted By Twitch Partners",
  "💜 100% Real Community",
  "🚀 Campaigns Live In Under 2 Hours",
  "⭐ 4.9/5 Average Rating",
  "🛡️ Zero Bots. Zero Risk.",
  "🌍 Streamers In 40+ Countries",
];

function TrustMarquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-black/40 py-4 backdrop-blur-sm">
      <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="text-xs font-bold uppercase tracking-[0.25em] text-mist">
            {t} <span className="ml-10 text-gold/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Loader({ done }: { done: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-all duration-700 ${
        done ? "pointer-events-none opacity-0 scale-110" : "opacity-100"
      }`}
    >
      <img
        src="/mascot.png"
        alt=""
        className="h-24 w-24 rounded-full border-2 border-gold/60 object-cover shadow-[0_0_60px_rgba(255,193,7,0.5)] animate-pulse-glow"
      />
      <p className="mt-5 font-display text-sm font-extrabold tracking-[0.35em] text-white">
        OLADIPS <span className="gold-text">PROMOTIONS</span>
      </p>
      <div className="mt-4 h-0.5 w-40 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/2 animate-shimmer rounded-full bg-gradient-to-r from-violet via-gold to-violet bg-[length:200%_100%]" />
      </div>
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-ink text-white">
      <Loader done={loaded} />
      <BackgroundFX />
      <ParticleField />
      <CursorSpotlight />

      <div
        className={`relative z-10 transition-all duration-1000 ${
          loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <Navbar />
        <main>
          <Hero />
          <TrustMarquee />
          <Services />
          <HowItWorks />
          <LiveStats />
          <WhyUs />
          <Testimonials />
          <Portfolio />
          <Pricing />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
