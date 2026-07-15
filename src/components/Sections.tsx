import { Reveal, SectionHead, Counter } from "../lib/hooks";
import {
  TwitchIcon, EyeIcon, UsersIcon, ChatIcon, DiscordIcon, TikTokIcon,
  KickIcon, HeadsetIcon, CrownIcon, ShieldIcon, BoltIcon, ChartIcon, CheckIcon, RocketIcon,
} from "./icons";

/* ================= SERVICES ================= */
const SERVICES = [
  { icon: TwitchIcon, title: "Twitch Promotion", desc: "Targeted campaigns that put your stream in front of thousands of active Twitch viewers who love your content niche.", gold: false },
  { icon: EyeIcon, title: "Viewer Boost", desc: "Real, engaged viewers that raise your live count, push you up the directory and trigger the Twitch discovery algorithm.", gold: true },
  { icon: UsersIcon, title: "Follower Growth", desc: "Organic follower campaigns that build a loyal, returning audience — the kind that gets you to Affiliate and Partner.", gold: false },
  { icon: ChatIcon, title: "Chat Engagement", desc: "An active chat squad that keeps your stream alive, sparks conversations and makes every new visitor want to stay.", gold: true },
  { icon: DiscordIcon, title: "Discord Community Growth", desc: "We grow and activate your Discord server so your community keeps engaging long after the stream ends.", gold: false },
  { icon: TikTokIcon, title: "TikTok Promotion", desc: "Viral clip strategy and promotion that turns your best stream moments into a nonstop funnel of new viewers.", gold: true },
  { icon: KickIcon, title: "Kick Promotion", desc: "Early-mover advantage on Kick — we position your channel to dominate the fastest-growing streaming platform.", gold: false },
  { icon: HeadsetIcon, title: "Streaming Consultation", desc: "1-on-1 sessions with growth experts covering branding, retention, schedules, overlays and monetization strategy.", gold: true },
  { icon: CrownIcon, title: "Brand Building", desc: "Complete creator brand development — identity, positioning, sponsorship readiness and long-term growth roadmap.", gold: false },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          kicker="Our Services"
          title={<>Everything You Need To <span className="gold-text">Dominate</span> Streaming</>}
          sub="Nine battle-tested growth services, engineered for streamers who are serious about going full-time."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 120}>
              <article className="glass card-glow group relative h-full overflow-hidden rounded-3xl p-7">
                <div
                  className={`absolute -top-16 -right-16 h-40 w-40 rounded-full blur-[70px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                    s.gold ? "bg-gold2/25" : "bg-violet/35"
                  }`}
                />
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                    s.gold
                      ? "border-gold/40 bg-gold/10 text-gold shadow-[0_0_20px_rgba(255,213,74,0.15)]"
                      : "border-violet2/40 bg-violet/15 text-violet2 shadow-[0_0_20px_rgba(138,43,226,0.2)]"
                  }`}
                >
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-white transition-colors group-hover:text-gold">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mist">{s.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-violet2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= HOW IT WORKS ================= */
const STEPS = [
  { n: "01", title: "Choose Package", desc: "Pick the growth plan that matches your goals — Starter, Professional or Ultimate.", icon: CrownIcon },
  { n: "02", title: "Place Order", desc: "Secure checkout through Fiverr or Discord. Share your channel and we build your strategy.", icon: BoltIcon },
  { n: "03", title: "Promotion Starts", desc: "Your campaign goes live within hours — viewers, followers and chat activity start flowing.", icon: RocketIcon },
  { n: "04", title: "Channel Growth", desc: "Watch your analytics climb. We report results and keep optimizing until you're thriving.", icon: ChartIcon },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          kicker="How It Works"
          title={<>From Zero To <span className="violet-text">Hero</span> In 4 Steps</>}
          sub="A simple, transparent process. No contracts, no confusion — just growth."
        />
        <div className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          {/* connecting line */}
          <div aria-hidden="true" className="absolute top-10 left-[12%] right-[12%] hidden h-px bg-gradient-to-r from-gold/60 via-violet2/60 to-gold/60 md:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 160}>
              <div className="group relative text-center">
                <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-gold/30 bg-ink2 shadow-[0_0_30px_rgba(138,43,226,0.25)] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-gold group-hover:shadow-[0_0_44px_rgba(255,213,74,0.4)]">
                  <s.icon className="h-8 w-8 text-gold" />
                  <span className="absolute -top-2.5 -right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet to-violet2 font-tech text-[10px] font-bold text-white shadow-[0_0_16px_rgba(138,43,226,0.6)]">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-mist">{s.desc}</p>
                {i < 3 && (
                  <span aria-hidden="true" className="mt-4 block text-2xl text-violet2 md:hidden">↓</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= WHY CHOOSE US ================= */
const WHY = [
  { icon: UsersIcon, title: "Real Community", desc: "50,000+ genuine gamers power every campaign." },
  { icon: ShieldIcon, title: "No Bots. Ever.", desc: "100% human engagement — zero fake accounts." },
  { icon: CheckIcon, title: "Safe Methods", desc: "Fully compliant with Twitch Terms of Service." },
  { icon: BoltIcon, title: "Fast Delivery", desc: "Campaigns go live within 1–2 hours of ordering." },
  { icon: ChartIcon, title: "Organic Growth", desc: "Retention-first strategies that compound over time." },
  { icon: HeadsetIcon, title: "Experienced Team", desc: "Ex-streamers and marketers with 6+ years in the game." },
  { icon: ChatIcon, title: "24/7 Support", desc: "Real humans answering on Discord, any hour." },
  { icon: CrownIcon, title: "Premium Quality", desc: "Agency-grade service trusted by top creators." },
];

export function WhyUs() {
  return (
    <section id="why" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          kicker="Why Choose Us"
          title={<>The <span className="gold-text">#1 Trusted</span> Growth Partner</>}
          sub="Streamers choose OLADIPS because we deliver what others only promise."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={(i % 4) * 100}>
              <div className="glass card-glow group flex h-full items-start gap-4 rounded-2xl p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet2/40 bg-violet/15 text-violet2 transition-all duration-300 group-hover:border-gold/50 group-hover:text-gold">
                  <w.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-white">{w.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-mist">{w.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= LIVE STATS ================= */
const LIVE_STATS = [
  { value: 12400, suffix: "+", label: "Channels Promoted", icon: TwitchIcon },
  { value: 860000, suffix: "+", label: "Hours Streamed", icon: EyeIcon },
  { value: 4200000, suffix: "+", label: "Followers Delivered", icon: UsersIcon },
  { value: 4200, suffix: "+", label: "5-Star Reviews", icon: CrownIcon },
];

export function LiveStats() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal scale>
          <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-12 md:px-12">
            <div aria-hidden="true" className="absolute inset-0">
              <div className="absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-violet/25 blur-[100px]" />
              <div className="absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-gold2/15 blur-[100px]" />
            </div>
            <div className="relative grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
              {LIVE_STATS.map((s) => (
                <div key={s.label} className="group">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/30 bg-gold/5 text-gold transition-transform duration-300 group-hover:scale-110">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 font-tech text-3xl font-bold text-white md:text-4xl">
                    <Counter target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-mist">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
