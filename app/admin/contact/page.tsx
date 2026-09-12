import { getContactContent } from "@/lib/content";
import { ContactForm } from "@/components/admin/contact-form";

export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  const content = await getContactContent();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-extrabold text-white">قسم تواصل معي</h1>
      <p className="mb-10 text-zinc-400">عدّل نصوص القسم باللغتين وبيانات التواصل المشتركة</p>
      <ContactForm initial={content} />
    </div>
  );
}
