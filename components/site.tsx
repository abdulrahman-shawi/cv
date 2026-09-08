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
import type { HomeContent, HomeSharedData } from "@/lib/content-types";
import type { Dict, Lang } from "@/lib/i18n";

function buildOverrides(content: HomeContent): Partial<Record<Lang, Partial<Dict>>> {
  const perLang = (lang: Lang): Partial<Dict> => {
    const h = content[lang];
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

export function HomePage({ content }: { content: HomeContent }) {
  return (
    <LangProvider overrides={buildOverrides(content)}>
      <Site shared={content.shared} />
    </LangProvider>
  );
}
