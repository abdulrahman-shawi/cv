import { getMarqueeContent } from "@/lib/content";
import { MarqueeForm } from "@/components/admin/marquee-form";

export const dynamic = "force-dynamic";

export default async function AdminMarqueePage() {
  const content = await getMarqueeContent();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-extrabold text-white">شريط الكلمات المتحركة</h1>
      <p className="mb-10 text-zinc-400">الكلمات الظاهرة في الشريط المتحرك بين الأقسام، باللغتين</p>
      <MarqueeForm initial={content} />
    </div>
  );
}
