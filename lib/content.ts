import { prisma } from "./db";
import { dict, type Lang } from "./i18n";
import type {
  AboutContent,
  AboutLangData,
  HomeContent,
  HomeLangData,
  HomeSharedData,
  SocialLink,
} from "./content-types";

export type {
  AboutContent,
  AboutLangData,
  AboutSkill,
  HomeContent,
  HomeLangData,
  HomeSharedData,
  HomeStat,
  SocialLink,
} from "./content-types";

async function readSection<T extends Record<string, unknown>>(
  section: string,
  defaults: T
): Promise<T> {
  try {
    const rows = await prisma.sectionContent.findMany({ where: { section } });
    const content = { ...defaults };
    for (const row of rows) {
      if (row.lang in content) {
        const key = row.lang as keyof T;
        content[key] = {
          ...(content[key] as object),
          ...(row.data as object),
        } as T[keyof T];
      }
    }
    return content;
  } catch {
    return defaults;
  }
}

export async function upsertSectionContent(
  section: string,
  entries: readonly { lang: string; data: unknown }[]
) {
  for (const entry of entries) {
    await prisma.sectionContent.upsert({
      where: { section_lang: { section, lang: entry.lang } },
      create: { section, lang: entry.lang, data: entry.data as object },
      update: { data: entry.data as object },
    });
  }
}

/* ---------- Home ---------- */

const DEFAULT_BACKGROUND =
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1920&auto=format&fit=crop";

const DEFAULT_SOCIALS: SocialLink[] = [
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "X", href: "https://x.com" },
  { name: "Instagram", href: "https://instagram.com" },
  { name: "Facebook", href: "https://facebook.com" },
];

function defaultHomeLangData(lang: Lang): HomeLangData {
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
    ar: defaultHomeLangData("ar"),
    de: defaultHomeLangData("de"),
    shared: { backgroundImage: DEFAULT_BACKGROUND, profileImage: "", socials: DEFAULT_SOCIALS },
  };
}

export function getHomeContent(): Promise<HomeContent> {
  return readSection("home", defaultHomeContent());
}

/* ---------- About ---------- */

function defaultAboutLangData(lang: Lang): AboutLangData {
  const d = dict[lang];
  return {
    label: d.about.label,
    title: d.about.title,
    bio: d.about.bio,
    skillsTitle: d.about.skillsTitle,
    skills: d.about.skills.map((s) => ({ ...s })),
    quote: { text: d.quote.text, author: d.quote.author },
  };
}

export function defaultAboutContent(): AboutContent {
  return { ar: defaultAboutLangData("ar"), de: defaultAboutLangData("de") };
}

export function getAboutContent(): Promise<AboutContent> {
  return readSection("about", defaultAboutContent());
}
