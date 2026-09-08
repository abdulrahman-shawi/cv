"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, type Dict, type Lang } from "@/lib/i18n";

type LangOverrides = Partial<Record<Lang, Partial<Dict>>>;

type LangContextValue = {
  lang: Lang;
  t: Dict;
  toggle: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({
  children,
  overrides,
}: {
  children: ReactNode;
  overrides?: LangOverrides;
}) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dict[lang].dir;
  }, [lang]);

  const toggle = () => setLang((l) => (l === "ar" ? "de" : "ar"));
  const t: Dict = { ...dict[lang], ...overrides?.[lang] };

  return (
    <LangContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
