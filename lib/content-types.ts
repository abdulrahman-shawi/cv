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
  profileImage: string;
  socials: SocialLink[];
};

export type HomeContent = Record<Lang, HomeLangData> & { shared: HomeSharedData };

export type AboutSkill = { name: string; percent: number };

export type AboutLangData = {
  label: string;
  title: string;
  bio: string;
  skillsTitle: string;
  skills: AboutSkill[];
  quote: { text: string; author: string };
};

export type AboutContent = Record<Lang, AboutLangData>;

export type ServiceItem = { icon: string; title: string; text: string };

export type ServicesLangData = {
  label: string;
  title: string;
  items: ServiceItem[];
};

export type ServicesContent = Record<Lang, ServicesLangData>;

export type PortfolioItem = { title: string; category: string; image: string };

export type PortfolioLangData = {
  label: string;
  title: string;
  categories: string[];
  items: PortfolioItem[];
};

export type PortfolioContent = Record<Lang, PortfolioLangData>;

export type MarqueeContent = Record<Lang, string[]>;

export type TimelineItem = { period: string; title: string; place: string; text: string };

export type ResumeLangData = {
  label: string;
  experienceTitle: string;
  educationTitle: string;
  experience: TimelineItem[];
  education: TimelineItem[];
};

export type ResumeContent = Record<Lang, ResumeLangData>;

export type CertificateItem = { title: string; issuer: string; year: string; image: string };

export type CertificatesLangData = {
  title: string;
  items: CertificateItem[];
};

export type CertificatesContent = Record<Lang, CertificatesLangData>;

export type BlogPost = { date: string; title: string; text: string };

export type BlogLangData = {
  label: string;
  title: string;
  readMore: string;
  posts: BlogPost[];
};

export type BlogContent = Record<Lang, BlogLangData>;

export type ContactLangData = {
  label: string;
  title: string;
  emailLabel: string;
  phoneLabel: string;
  addressLabel: string;
  form: { name: string; email: string; message: string; send: string };
};

export type ContactSharedData = {
  email: string;
  phone: string;
  address: string;
};

export type ContactContent = Record<Lang, ContactLangData> & { shared: ContactSharedData };
