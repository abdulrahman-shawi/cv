import { getHomeContent } from "@/lib/content";
import { HomePage } from "@/components/site";

export const dynamic = "force-dynamic";

export default async function Page() {
  const content = await getHomeContent();
  return <HomePage content={content} />;
}
