import {
  getAboutContent,
  getBlogContent,
  getCertificatesContent,
  getContactContent,
  getHomeContent,
  getMarqueeContent,
  getPortfolioContent,
  getResumeContent,
  getServicesContent,
} from "@/lib/content";
import { HomePage } from "@/components/site";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [home, about, services, portfolio, marquee, resume, certificates, blog, contact] =
    await Promise.all([
      getHomeContent(),
      getAboutContent(),
      getServicesContent(),
      getPortfolioContent(),
      getMarqueeContent(),
      getResumeContent(),
      getCertificatesContent(),
      getBlogContent(),
      getContactContent(),
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
      blog={blog}
      contact={contact}
    />
  );
}
