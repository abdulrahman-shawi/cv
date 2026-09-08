"use client";

import { useState } from "react";
import { Counter, SkillBar, TypingText, useInView } from "./effects";
import { useLang } from "./lang";
import type { HomeSharedData, SocialLink } from "@/lib/content-types";

/* ---------- Icons ---------- */

const icons: Record<string, React.ReactNode> = {
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </svg>
  ),
  share: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="17" cy="6" r="2.5" />
      <circle cx="17" cy="18" r="2.5" />
      <path d="M8.2 10.8l6.6-3.6M8.2 13.2l6.6 3.6" />
    </svg>
  ),
  pen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
      <path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 013 3L8 19l-4 1z" />
      <path d="M14.5 6.5l3 3" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
      <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />
    </svg>
  ),
  badge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
      <circle cx="12" cy="9" r="6" />
      <path d="M9 14l-1.5 7L12 18.5 16.5 21 15 14" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
      <path d="M5 4h4l2 5-2.5 1.5a12 12 0 005 5L15 13l5 2v4a2 2 0 01-2 2A17 17 0 013 6a2 2 0 012-2z" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
      <path d="M12 21s-7-5.5-7-11a7 7 0 0114 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
};

const socials = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14H.2V8zm7.6 0h4.4v1.9h.06c.61-1.16 2.1-2.38 4.34-2.38 4.64 0 5.5 3.06 5.5 7.04V22h-4.6v-6.6c0-1.58-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.5V22H7.8V8z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1 2h6.5l4.4 5.9L18.9 2zm-1.1 18h1.7L7.4 3.9H5.6L17.8 20z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z" />
      </svg>
    ),
  },
];

/* ---------- Sections ---------- */

const DEFAULT_HERO_BG =
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1920&auto=format&fit=crop";

function mergedSocials(overrides?: SocialLink[]) {
  return socials.map((s) => ({
    ...s,
    href: overrides?.find((o) => o.name === s.name)?.href ?? s.href,
  }));
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-sm font-semibold text-accent">
      {children}
    </span>
  );
}

export function Hero({ shared }: { shared?: HomeSharedData }) {
  const { t } = useLang();
  const socialLinks = mergedSocials(shared?.socials);

  return (
    <section
      id="home"
      className="parallax-bg relative flex min-h-screen items-center overflow-hidden pt-16"
      style={{
        backgroundImage: `linear-gradient(rgba(11,11,16,0.82), rgba(11,11,16,0.88)), url(${shared?.backgroundImage ?? DEFAULT_HERO_BG})`,
      }}
    >
      <div className="pointer-events-none absolute -top-32 start-1/4 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 end-0 h-80 w-80 rounded-full bg-accent-soft/15 blur-[100px]" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mb-4 text-lg font-medium text-accent">{t.hero.greeting}</p>
          <h1 className="mb-4 text-5xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">
            {t.hero.name}
          </h1>
          <div className="mb-6 flex h-10 items-center gap-3 text-2xl font-bold text-zinc-200 sm:text-3xl">
            <span>{t.hero.iam}</span>
            <TypingText words={t.hero.roles} className="text-accent" />
          </div>
          <p className="mb-8 max-w-xl leading-relaxed text-zinc-400">{t.hero.description}</p>

          <div className="mb-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="rounded-full bg-accent px-7 py-3 font-semibold text-white shadow-lg shadow-accent/30 transition-transform hover:scale-105 hover:bg-accent-soft"
            >
              {t.hero.contactBtn}
            </a>
            <a
              href="#services"
              className="rounded-full border border-white/20 px-7 py-3 font-semibold text-white transition-colors hover:border-accent hover:text-accent"
            >
              {t.hero.servicesBtn}
            </a>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-all hover:border-accent hover:bg-accent hover:text-white"
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/40" />
          <div className="absolute inset-6 overflow-hidden rounded-full bg-gradient-to-br from-card to-night ring-1 ring-white/10">
            <div className="flex h-full w-full items-center justify-center">
              <span className="bg-gradient-to-br from-accent to-accent-soft bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
                {t.hero.name.charAt(0)}
              </span>
            </div>
          </div>
          <div className="absolute -end-2 top-10 rounded-2xl border border-white/10 bg-card/90 px-5 py-3 shadow-xl backdrop-blur">
            <p className="text-2xl font-extrabold text-accent">
              <Counter to={8} suffix="+" />
            </p>
            <p className="text-xs text-zinc-400">{t.stats[0].label}</p>
          </div>
          <div className="absolute -start-2 bottom-10 rounded-2xl border border-white/10 bg-card/90 px-5 py-3 shadow-xl backdrop-blur">
            <p className="text-2xl font-extrabold text-accent">
              <Counter to={150} suffix="+" />
            </p>
            <p className="text-xs text-zinc-400">{t.stats[2].label}</p>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-xs text-zinc-500 transition-colors hover:text-accent sm:block"
      >
        {t.hero.scroll}
        <span className="mx-auto mt-2 block h-8 w-px animate-pulse bg-gradient-to-b from-accent to-transparent" />
      </a>
    </section>
  );
}

export function Stats({
  items,
  image,
}: {
  items: { value: number; suffix: string; label: string }[];
  image?: string;
}) {
  return (
    <section
      className={`border-y border-white/5 ${image ? "parallax-bg" : "bg-card/50"}`}
      style={
        image
          ? {
              backgroundImage: `linear-gradient(rgba(11,11,16,0.85), rgba(11,11,16,0.9)), url(${image})`,
            }
          : undefined
      }
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-white/5 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 rtl:sm:divide-x-reverse">
        {items.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1 py-10">
            <span className="text-5xl font-extrabold text-accent">
              <Counter to={s.value} suffix={s.suffix} />
            </span>
            <span className="text-sm font-medium uppercase tracking-widest text-zinc-400">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function About() {
  const { t } = useLang();

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="grid items-start gap-14 lg:grid-cols-2">
        <div>
          <SectionLabel>{t.about.label}</SectionLabel>
          <h2 className="mb-6 text-3xl font-extrabold leading-snug text-white sm:text-4xl">
            {t.about.title}
          </h2>
          <p className="mb-8 leading-loose text-zinc-400">{t.about.bio}</p>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-card p-6">
            <span className="absolute -top-3 start-4 text-7xl font-black text-accent/20">&ldquo;</span>
            <p className="relative mb-4 pt-4 text-lg font-medium leading-relaxed text-zinc-200">
              {t.quote.text}
            </p>
            <p className="text-sm font-semibold text-accent">— {t.quote.author}</p>
          </div>
        </div>

        <div>
          <h3 className="mb-8 text-xl font-bold text-white">{t.about.skillsTitle}</h3>
          <div className="space-y-6">
            {t.about.skills.map((s) => (
              <SkillBar key={s.name} name={s.name} percent={s.percent} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="scroll-mt-20 border-y border-white/5 bg-card/30 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 text-center">
          <SectionLabel>{t.services.label}</SectionLabel>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t.services.title}</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((s) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-white/10 bg-card p-7 transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                {icons[s.icon]}
              </div>
              <h3 className="mb-3 text-lg font-bold text-white">{s.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Portfolio() {
  const { t } = useLang();
  const [active, setActive] = useState(0);

  const filtered =
    active === 0
      ? t.portfolio.items
      : t.portfolio.items.filter((i) => i.category === t.portfolio.categories[active]);

  return (
    <section id="portfolio" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mb-10 text-center">
        <SectionLabel>{t.portfolio.label}</SectionLabel>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t.portfolio.title}</h2>
      </div>

      <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
        {t.portfolio.categories.map((cat, i) => (
          <button
            key={cat}
            onClick={() => setActive(i)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              active === i
                ? "bg-accent text-white shadow-lg shadow-accent/30"
                : "border border-white/15 text-zinc-300 hover:border-accent hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div
            key={item.title}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-night/80 px-4 text-center opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                {item.category}
              </span>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Marquee() {
  const { t } = useLang();
  const words = [...t.marquee, ...t.marquee, ...t.marquee];

  return (
    <div dir="ltr" className="overflow-hidden border-b border-white/5 py-8">
      <div className="marquee-track flex w-max items-center gap-10">
        {words.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="text-4xl font-extrabold text-white/90 sm:text-5xl">{w}</span>
            <span className="h-3 w-3 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Timeline({
  title,
  items,
}: {
  title: string;
  items: { period: string; title: string; place: string; text: string }[];
}) {
  return (
    <div>
      <h3 className="mb-10 flex items-center gap-3 text-2xl font-bold text-white">
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        {title}
      </h3>
      <div className="space-y-8 border-s-2 border-white/10 ps-8">
        {items.map((item, i) => (
          <div key={item.title} className="group relative">
            <span className="absolute -start-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-accent bg-night text-[10px] font-bold text-accent transition-colors group-hover:bg-accent group-hover:text-white">
              {i + 1}
            </span>
            <span className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {item.period}
            </span>
            <h4 className="text-lg font-bold text-white">{item.title}</h4>
            <p className="mb-2 text-sm font-medium text-zinc-500">{item.place}</p>
            <p className="text-sm leading-relaxed text-zinc-400">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Resume() {
  const { t } = useLang();

  return (
    <section id="resume" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mb-14 text-center">
        <SectionLabel>{t.resume.label}</SectionLabel>
      </div>
      <div className="grid gap-16 lg:grid-cols-2">
        <Timeline title={t.resume.experienceTitle} items={t.resume.experience} />
        <Timeline title={t.resume.educationTitle} items={t.resume.education} />
      </div>

      <div className="mt-20">
        <h3 className="mb-10 flex items-center justify-center gap-3 text-2xl font-bold text-white">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          {t.certificates.title}
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.certificates.items.map((c) => (
            <div
              key={c.title}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5 text-center">
                <h4 className="mb-1 font-bold text-white">{c.title}</h4>
                <p className="text-sm text-zinc-400">{c.issuer}</p>
                <p className="mt-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  {c.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Blog() {
  const { t } = useLang();

  return (
    <section id="blog" className="scroll-mt-20 border-y border-white/5 bg-card/30 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 text-center">
          <SectionLabel>{t.blog.label}</SectionLabel>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t.blog.title}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {t.blog.posts.map((p, i) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10"
            >
              <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-accent/25 via-card to-night">
                <span className="text-7xl font-black text-white/10">{String(i + 1).padStart(2, "0")}</span>
                <span className="absolute bottom-3 start-3 rounded-full bg-night/80 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur">
                  {p.date}
                </span>
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-lg font-bold leading-snug text-white transition-colors group-hover:text-accent">
                  {p.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-zinc-400">{p.text}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  {t.blog.readMore}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 rtl:rotate-180">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useLang();

  const cards = [
    { icon: icons.mail, label: t.contact.emailLabel, value: t.contact.email, href: `mailto:${t.contact.email}` },
    { icon: icons.phone, label: t.contact.phoneLabel, value: t.contact.phone, href: `tel:${t.contact.phone.replace(/\s/g, "")}` },
    { icon: icons.pin, label: t.contact.addressLabel, value: t.contact.address, href: undefined },
  ];

  return (
    <section
      id="contact"
      className="parallax-bg scroll-mt-20 py-24"
      style={{
        backgroundImage:
          "linear-gradient(rgba(11,11,16,0.88), rgba(11,11,16,0.92)), url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="mb-14 text-center">
        <SectionLabel>{t.contact.label}</SectionLabel>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t.contact.title}</h2>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          {cards.map((c) => (
            <div key={c.label} className="flex items-center gap-5 rounded-2xl border border-white/10 bg-card p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 p-3 text-accent">
                {c.icon}
              </div>
              <div>
                <p className="text-sm text-zinc-500">{c.label}</p>
                {c.href ? (
                  <a href={c.href} className="font-semibold text-white transition-colors hover:text-accent" dir="ltr">
                    {c.value}
                  </a>
                ) : (
                  <p className="font-semibold text-white">{c.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <form
          className="space-y-5 rounded-2xl border border-white/10 bg-card p-7"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const subject = encodeURIComponent(String(data.get("name") ?? ""));
            const body = encodeURIComponent(String(data.get("message") ?? ""));
            window.location.href = `mailto:${t.contact.email}?subject=${subject}&body=${body}`;
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <input
              name="name"
              required
              placeholder={t.contact.form.name}
              className="w-full rounded-xl border border-white/10 bg-night px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-accent"
            />
            <input
              name="email"
              type="email"
              required
              placeholder={t.contact.form.email}
              className="w-full rounded-xl border border-white/10 bg-night px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-accent"
            />
          </div>
          <textarea
            name="message"
            required
            rows={5}
            placeholder={t.contact.form.message}
            className="w-full resize-none rounded-xl border border-white/10 bg-night px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-accent"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-accent py-3.5 font-semibold text-white shadow-lg shadow-accent/30 transition-all hover:bg-accent-soft sm:w-auto sm:px-10"
          >
            {t.contact.form.send}
          </button>
        </form>
      </div>
      </div>
    </section>
  );
}

export function Footer({ socials }: { socials?: SocialLink[] }) {
  const { t } = useLang();
  const socialLinks = mergedSocials(socials);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-card/50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 sm:px-6">
        <a href="#home" className="text-2xl font-extrabold text-white">
          {t.hero.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </a>
        <div className="flex items-center gap-3">
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-all hover:border-accent hover:text-accent"
            >
              {s.svg}
            </a>
          ))}
        </div>
        <p className="text-center text-sm text-zinc-500">
          © {year} {t.hero.name} — {t.footer.rights} · {t.footer.made}
        </p>
      </div>
    </footer>
  );
}
