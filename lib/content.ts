import { prisma } from "./db";
import { dict, type Lang } from "./i18n";
import type {
  AboutContent,
  AboutLangData,
  CertificatesContent,
  CertificatesLangData,
  HomeContent,
  HomeLangData,
  HomeSharedData,
  MarqueeContent,
  PortfolioContent,
  PortfolioLangData,
  ResumeContent,
  ResumeLangData,
  ServicesContent,
  ServicesLangData,
  SocialLink,
} from "./content-types";

export type {
  AboutContent,
  AboutLangData,
  AboutSkill,
  CertificateItem,
  CertificatesContent,
  CertificatesLangData,
  HomeContent,
  HomeLangData,
  HomeSharedData,
  HomeStat,
  MarqueeContent,
  PortfolioContent,
  PortfolioItem,
  PortfolioLangData,
  ResumeContent,
  ResumeLangData,
  ServiceItem,
  ServicesContent,
  ServicesLangData,
  SocialLink,
  TimelineItem,
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
        const current = content[key];
        content[key] = (
          Array.isArray(current)
            ? row.data
            : { ...(current as object), ...(row.data as object) }
        ) as T[keyof T];
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

/* ---------- Services ---------- */

function defaultServicesLangData(lang: Lang): ServicesLangData {
  const d = dict[lang];
  return {
    label: d.services.label,
    title: d.services.title,
    items: d.services.items.map((s) => ({ ...s })),
  };
}

export function defaultServicesContent(): ServicesContent {
  return { ar: defaultServicesLangData("ar"), de: defaultServicesLangData("de") };
}

export function getServicesContent(): Promise<ServicesContent> {
  return readSection("services", defaultServicesContent());
}

/* ---------- Portfolio ---------- */

function defaultPortfolioLangData(lang: Lang): PortfolioLangData {
  const d = dict[lang];
  return {
    label: d.portfolio.label,
    title: d.portfolio.title,
    categories: [...d.portfolio.categories],
    items: d.portfolio.items.map((i) => ({ ...i })),
  };
}

export function defaultPortfolioContent(): PortfolioContent {
  return { ar: defaultPortfolioLangData("ar"), de: defaultPortfolioLangData("de") };
}

export function getPortfolioContent(): Promise<PortfolioContent> {
  return readSection("portfolio", defaultPortfolioContent());
}

/* ---------- Marquee ---------- */

export function defaultMarqueeContent(): MarqueeContent {
  return { ar: [...dict.ar.marquee], de: [...dict.de.marquee] };
}

export function getMarqueeContent(): Promise<MarqueeContent> {
  return readSection("marquee", defaultMarqueeContent());
}

/* ---------- Resume ---------- */

function defaultResumeLangData(lang: Lang): ResumeLangData {
  const d = dict[lang];
  return {
    label: d.resume.label,
    experienceTitle: d.resume.experienceTitle,
    educationTitle: d.resume.educationTitle,
    experience: d.resume.experience.map((i) => ({ ...i })),
    education: d.resume.education.map((i) => ({ ...i })),
  };
}

export function defaultResumeContent(): ResumeContent {
  return { ar: defaultResumeLangData("ar"), de: defaultResumeLangData("de") };
}

export function getResumeContent(): Promise<ResumeContent> {
  return readSection("resume", defaultResumeContent());
}

/* ---------- Certificates ---------- */

function defaultCertificatesLangData(lang: Lang): CertificatesLangData {
  const d = dict[lang];
  return {
    title: d.certificates.title,
    items: d.certificates.items.map((i) => ({ ...i })),
  };
}

export function defaultCertificatesContent(): CertificatesContent {
  return { ar: defaultCertificatesLangData("ar"), de: defaultCertificatesLangData("de") };
}

export function getCertificatesContent(): Promise<CertificatesContent> {
  return readSection("certificates", defaultCertificatesContent());
}
