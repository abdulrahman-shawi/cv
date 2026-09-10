import { getAboutContent, getHomeContent } from "@/lib/content";
import { HomePage } from "@/components/site";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [home, about] = await Promise.all([getHomeContent(), getAboutContent()]);
  return <HomePage home={home} about={about} />;
}
