import { getAboutContent } from "@/lib/content";
import { AboutForm } from "@/components/admin/about-form";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const content = await getAboutContent();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-extrabold text-white">قسم من أنا</h1>
      <p className="mb-10 text-zinc-400">عدّل النبذة والمهارات والاقتباس باللغتين</p>
      <AboutForm initial={content} />
    </div>
  );
}
