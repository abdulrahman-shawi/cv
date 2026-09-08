import type { Lang } from "./i18n";

export type { Lang };

export type HomeStat = { value: number; suffix: string; label: string };

export type HomeLangData = {
  greeting: string;
  name: string;
  iam: string;
  roles: string[];
  description: string;
  contactBtn: string;
  servicesBtn: string;
  scroll: string;
  stats: HomeStat[];
};

export type SocialLink = { name: string; href: string };

export type HomeSharedData = {
  backgroundImage: string;
  socials: SocialLink[];
};

export type HomeContent = Record<Lang, HomeLangData> & { shared: HomeSharedData };
