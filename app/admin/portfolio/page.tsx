import { getPortfolioContent } from "@/lib/content";
import { PortfolioForm } from "@/components/admin/portfolio-form";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  const content = await getPortfolioContent();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-extrabold text-white">قسم معرض أعمالي</h1>
      <p className="mb-10 text-zinc-400">عدّل التصنيفات والمشاريع المعروضة باللغتين</p>
      <PortfolioForm initial={content} />
    </div>
  );
}
