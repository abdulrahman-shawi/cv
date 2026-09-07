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
  Resume,
  Services,
  Stats,
} from "@/components/sections";

function Site() {
  const { t } = useLang();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats items={t.stats} />
        <About />
        <Services />
        <Marquee />
        <Resume />
        <Stats
          items={t.stats2}
          image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1920&auto=format&fit=crop"
        />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <LangProvider>
      <Site />
    </LangProvider>
  );
}
