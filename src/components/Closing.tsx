import { useState } from "react";
import type { FormEvent } from "react";
import { Reveal, SectionHead, useRipple } from "../lib/hooks";
import {
  DiscordIcon, WhatsAppIcon, TikTokIcon, FiverrIcon, TwitchIcon, MailIcon,
} from "./icons";
import { FAQS, LINKS } from "../lib/data";
import { supabase } from "../lib/supabase";

/* ================= FAQ ================= */
export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHead
          kicker="FAQ"
          title={<>Questions? <span className="violet-text">Answered.</span></>}
          sub="Everything you need to know before starting your growth journey."
        />
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 80}>
                <div
                  className={`glass overflow-hidden rounded-2xl transition-all duration-400 ${
                    isOpen ? "border-gold/40 shadow-[0_0_30px_rgba(255,213,74,0.1)]" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className={`font-display text-sm font-bold md:text-base ${isOpen ? "text-gold" : "text-white"}`}>
                      {f.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-gold/60 text-gold"
                          : "border-white/15 text-mist"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-mist">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= CONTACT ================= */
const CHANNELS = [
  { name: "Discord", detail: "Fastest response — join the server", href: LINKS.discord, icon: DiscordIcon, color: "text-indigo-300", ring: "group-hover:border-indigo-400/60 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]" },
  { name: "WhatsApp", detail: "Chat with us directly", href: LINKS.whatsapp, icon: WhatsAppIcon, color: "text-emerald-300", ring: "group-hover:border-emerald-400/60 group-hover:shadow-[0_0_30px_rgba(52,211,153,0.3)]" },
  { name: "TikTok", detail: "@.oladipxpromo", href: LINKS.tiktok, icon: TikTokIcon, color: "text-fuchsia-300", ring: "group-hover:border-fuchsia-400/60 group-hover:shadow-[0_0_30px_rgba(232,121,249,0.3)]" },
  { name: "Fiverr", detail: "Order securely on Fiverr", href: LINKS.fiverr, icon: FiverrIcon, color: "text-green-300", ring: "group-hover:border-green-400/60 group-hover:shadow-[0_0_30px_rgba(74,222,128,0.3)]" },
  { name: "Twitch", detail: "twitch.tv/oladips_promoter", href: LINKS.twitch, icon: TwitchIcon, color: "text-violet2", ring: "group-hover:border-violet2/60 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]" },
  { name: "Email", detail: "danielhennert8@gmail.com", href: LINKS.email, icon: MailIcon, color: "text-gold", ring: "group-hover:border-gold/60 group-hover:shadow-[0_0_30px_rgba(255,213,74,0.3)]" },
];

export function Contact() {
  const ripple = useRipple();
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [twitchChannel, setTwitchChannel] = useState("");
const [packageName, setPackageName] = useState("Starter — $49");
const [message, setMessage] = useState("");

const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const { error } = await supabase
    .from("contact_messages")
    .insert([
      {
        name,
        email,
        twitch_channel: twitchChannel,
        package: packageName,
        message,
      },
    ]);

  if (error) {
    console.log(error);
    alert("Something went wrong. Please try again.");
    return;
  }

  setSent(true);
};

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          kicker="Contact"
          title={<>Ready To <span className="gold-text">Elevate</span> Your Channel?</>}
          sub="Reach us on any platform — or drop a message and we'll get back within the hour."
        />
        <div className="grid gap-10 lg:grid-cols-5">
          {/* channel cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1 xl:grid-cols-2">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.name} delay={i * 80}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`glass group flex h-full items-center gap-4 rounded-2xl border border-white/8 p-5 transition-all duration-300 hover:-translate-y-1 ${c.ring}`}
                >
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 ${c.color} transition-transform duration-300 group-hover:scale-110`}>
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display text-sm font-bold text-white">{c.name}</span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-mist">{c.detail}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          {/* form */}
          <Reveal delay={160} className="lg:col-span-3">
            <div className="glass relative h-full overflow-hidden rounded-[2rem] p-8 md:p-10">
              <div aria-hidden="true" className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-violet/25 blur-[90px]" />
              {sent ? (
                <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-3xl">✅</span>
                  <h3 className="mt-5 font-display text-xl font-bold text-white">Message Sent!</h3>
                  <p className="mt-2 max-w-sm text-sm text-mist">
                    Our team will reach out within the hour. For instant help, jump into our{" "}
                    <a href={LINKS.discord} target="_blank" rel="noreferrer" className="text-gold underline-offset-4 hover:underline">Discord</a>.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="relative grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-mist">Your Name</span>
                      <input
 required
 type="text"
 placeholder="e.g. Alex"
 value={name}
 onChange={(e) => setName(e.target.value)}
 className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-gold/60 focus:shadow-[0_0_20px_rgba(255,213,74,0.12)]"
/>
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-mist">Email</span>
                     <input
  required
  type="email"
  placeholder="you@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-gold/60 focus:shadow-[0_0_20px_rgba(255,213,74,0.12)]"
/>
                    </label>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-mist">Channel URL</span>
<input
  type="url"
  placeholder="twitch.tv/yourchannel"
  value={twitchChannel}
  onChange={(e) => setTwitchChannel(e.target.value)}
  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-violet2/60 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
/>
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-mist">Package</span>
<select
  value={packageName}
  onChange={(e) => setPackageName(e.target.value)}
  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white outline-none transition focus:border-violet2/60"
>
                          <option className="bg-ink2">Starter — $49</option>
                        <option className="bg-ink2">Professional — $129</option>
                        <option className="bg-ink2">Ultimate — $299</option>
                        <option className="bg-ink2">Custom Plan</option>
                      </select>
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-mist">Message</span>
<textarea
  required
  rows={4}
  placeholder="Tell us about your channel and your goals..."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-gold/60 focus:shadow-[0_0_20px_rgba(255,213,74,0.12)]"
/>
                  </label>
                  <button type="submit" onClick={ripple} className="btn-gold ripple-host mt-1 rounded-full py-4 text-sm font-extrabold">
                    Send Message 🚀
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= FOOTER ================= */
const SOCIALS = [
  { href: LINKS.discord, icon: DiscordIcon, label: "Discord" },
  { href: LINKS.whatsapp, icon: WhatsAppIcon, label: "WhatsApp" },
  { href: LINKS.twitch, icon: TwitchIcon, label: "Twitch" },
  { href: LINKS.tiktok, icon: TikTokIcon, label: "TikTok" },
  { href: LINKS.fiverr, icon: FiverrIcon, label: "Fiverr" },
  { href: LINKS.email, icon: MailIcon, label: "Email" },
];

const QUICK_LINKS = [
  ["Home", "#home"], ["Services", "#services"], ["Pricing", "#pricing"],
  ["Reviews", "#reviews"], ["Portfolio", "#portfolio"], ["FAQ", "#faq"], ["Contact", "#contact"],
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 pt-20 pb-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-violet/15 blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
        <Reveal>
          <img
            src="/mascot.png"
            alt="OLADIPS PROMOTIONS mascot"
            className="mx-auto h-28 w-28 rounded-full border-2 border-gold/50 object-cover shadow-[0_0_50px_rgba(255,193,7,0.35)]"
          />
          <h2 className="mt-6 font-display text-2xl font-extrabold tracking-wide text-white">
            OLADIPS <span className="gold-text">PROMOTIONS</span>
          </h2>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.4em] text-mist">
            Connect. <span className="text-violet2">Promote.</span> <span className="text-gold">Elevate.</span>
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-mist transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:text-gold hover:shadow-[0_0_20px_rgba(255,213,74,0.3)]"
              >
                <s.icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <nav aria-label="Footer navigation" className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {QUICK_LINKS.map(([label, href]) => (
              <a key={href} href={href} className="text-xs font-semibold uppercase tracking-widest text-mist transition hover:text-gold">
                {label}
              </a>
            ))}
          </nav>
        </Reveal>

        <div className="mt-12 border-t border-white/5 pt-8">
          <p className="text-xs text-mist/70">
            © {new Date().getFullYear()} OLADIPS PROMOTIONS. All rights reserved. Not affiliated with Twitch Interactive, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
