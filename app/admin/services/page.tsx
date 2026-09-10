import { getServicesContent } from "@/lib/content";
import { ServicesForm } from "@/components/admin/services-form";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const content = await getServicesContent();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-extrabold text-white">قسم ماذا أقدم</h1>
      <p className="mb-10 text-zinc-400">عدّل بطاقات الخدمات باللغتين (الأيقونة، العنوان، النص)</p>
      <ServicesForm initial={content} />
    </div>
  );
}
