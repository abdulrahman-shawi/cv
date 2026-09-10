import { prisma } from "./db";
import { dict, type Lang } from "./i18n";
import type { HomeContent, HomeLangData, HomeSharedData, SocialLink } from "./content-types";

export type { HomeContent, HomeLangData, HomeSharedData, HomeStat, SocialLink } from "./content-types";

const DEFAULT_BACKGROUND =
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1920&auto=format&fit=crop";

const DEFAULT_SOCIALS: SocialLink[] = [
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "X", href: "https://x.com" },
  { name: "Instagram", href: "https://instagram.com" },
  { name: "Facebook", href: "https://facebook.com" },
];

function defaultLangData(lang: Lang): HomeLangData {
  const d = dict[lang];
  return {
    greeting: d.hero.greeting,
    name: d.hero.name,
    iam: d.hero.iam,
    roles: [...d.hero.roles],
    description: d.hero.description,
    contactBtn: d.hero.contactBtn,
    servicesBtn: d.hero.servicesBtn,
    scroll: d.hero.scroll,
    stats: d.stats.map((s) => ({ ...s })),
  };
}

export function defaultHomeContent(): HomeContent {
  return {
    ar: defaultLangData("ar"),
    de: defaultLangData("de"),
    shared: { backgroundImage: DEFAULT_BACKGROUND, profileImage: "", socials: DEFAULT_SOCIALS },
  };
}

export async function getHomeContent(): Promise<HomeContent> {
  const fallback = defaultHomeContent();
  try {
    const rows = await prisma.sectionContent.findMany({ where: { section: "home" } });
    const content = defaultHomeContent();
    for (const row of rows) {
      const data = row.data as Record<string, unknown>;
      if (row.lang === "shared") {
        content.shared = { ...content.shared, ...(data as Partial<HomeSharedData>) };
      } else if (row.lang === "ar" || row.lang === "de") {
        content[row.lang] = { ...content[row.lang], ...(data as Partial<HomeLangData>) };
      }
    }
    return content;
  } catch {
    return fallback;
  }
}
