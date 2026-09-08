import { getHomeContent } from "@/lib/content";
import { HomeForm } from "@/components/admin/home-form";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const content = await getHomeContent();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-extrabold text-white">قسم الرئيسية</h1>
      <p className="mb-10 text-zinc-400">عدّل محتوى الواجهة الرئيسية باللغتين، والإعدادات المشتركة</p>
      <HomeForm initial={content} />
    </div>
  );
}
