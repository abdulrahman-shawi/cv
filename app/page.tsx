import {
  getAboutContent,
  getCertificatesContent,
  getHomeContent,
  getMarqueeContent,
  getPortfolioContent,
  getResumeContent,
  getServicesContent,
} from "@/lib/content";
import { HomePage } from "@/components/site";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [home, about, services, portfolio, marquee, resume, certificates] = await Promise.all([
    getHomeContent(),
    getAboutContent(),
    getServicesContent(),
    getPortfolioContent(),
    getMarqueeContent(),
    getResumeContent(),
    getCertificatesContent(),
  ]);
  return (
    <HomePage
      home={home}
      about={about}
      services={services}
      portfolio={portfolio}
      marquee={marquee}
      resume={resume}
      certificates={certificates}
    />
  );
}
