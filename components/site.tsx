"use client";

import { Header } from "@/components/header";
import { LangProvider, useLang } from "@/components/lang";
import {
  About,
  Blog,
  Contact,
  Footer,
  Hero,
  Marquee,
  Portfolio,
  Resume,
  Services,
  Stats,
} from "@/components/sections";
import type {
  AboutContent,
  CertificatesContent,
  HomeContent,
  HomeSharedData,
  MarqueeContent,
  PortfolioContent,
  ResumeContent,
  ServicesContent,
} from "@/lib/content-types";
import type { Dict, Lang } from "@/lib/i18n";

function buildOverrides(
  home: HomeContent,
  about: AboutContent,
  services: ServicesContent,
  portfolio: PortfolioContent,
  marquee: MarqueeContent,
  resume: ResumeContent,
  certificates: CertificatesContent
): Partial<Record<Lang, Partial<Dict>>> {
  const perLang = (lang: Lang): Partial<Dict> => {
    const h = home[lang];
    const a = about[lang];
    return {
      hero: {
        greeting: h.greeting,
        name: h.name,
        iam: h.iam,
        roles: h.roles,
        description: h.description,
        contactBtn: h.contactBtn,
        servicesBtn: h.servicesBtn,
        scroll: h.scroll,
      },
      stats: h.stats,
      about: {
        label: a.label,
        title: a.title,
        bio: a.bio,
        skillsTitle: a.skillsTitle,
        skills: a.skills,
      },
      quote: a.quote,
      services: services[lang],
      portfolio: portfolio[lang],
      marquee: marquee[lang],
      resume: resume[lang],
      certificates: certificates[lang],
    };
  };
  return { ar: perLang("ar"), de: perLang("de") };
}

function Site({ shared }: { shared: HomeSharedData }) {
  const { t } = useLang();

  return (
    <>
      <Header />
      <main>
        <Hero shared={shared} />
        <Stats items={t.stats} />
        <About />
        <Services />
        <Portfolio />
        <Marquee />
        <Resume />
        <Stats
          items={t.stats2}
          image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1920&auto=format&fit=crop"
        />
        <Blog />
        <Contact />
      </main>
      <Footer socials={shared.socials} />
    </>
  );
}

export function HomePage({
  home,
  about,
  services,
  portfolio,
  marquee,
  resume,
  certificates,
}: {
  home: HomeContent;
  about: AboutContent;
  services: ServicesContent;
  portfolio: PortfolioContent;
  marquee: MarqueeContent;
  resume: ResumeContent;
  certificates: CertificatesContent;
}) {
  return (
    <LangProvider
      overrides={buildOverrides(home, about, services, portfolio, marquee, resume, certificates)}
    >
      <Site shared={home.shared} />
    </LangProvider>
  );
}
