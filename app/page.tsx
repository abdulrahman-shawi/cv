import {
  getAboutContent,
  getHomeContent,
  getMarqueeContent,
  getPortfolioContent,
  getServicesContent,
} from "@/lib/content";
import { HomePage } from "@/components/site";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [home, about, services, portfolio, marquee] = await Promise.all([
    getHomeContent(),
    getAboutContent(),
    getServicesContent(),
    getPortfolioContent(),
    getMarqueeContent(),
  ]);
  return (
    <HomePage home={home} about={about} services={services} portfolio={portfolio} marquee={marquee} />
  );
}
