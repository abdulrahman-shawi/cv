import { getAboutContent, getHomeContent, getServicesContent } from "@/lib/content";
import { HomePage } from "@/components/site";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [home, about, services] = await Promise.all([
    getHomeContent(),
    getAboutContent(),
    getServicesContent(),
  ]);
  return <HomePage home={home} about={about} services={services} />;
}
