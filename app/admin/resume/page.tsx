import { getResumeContent } from "@/lib/content";
import { ResumeForm } from "@/components/admin/resume-form";

export const dynamic = "force-dynamic";

export default async function AdminResumePage() {
  const content = await getResumeContent();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-extrabold text-white">قسم مسيرتي</h1>
      <p className="mb-10 text-zinc-400">عدّل الخبرات العملية والتعليم باللغتين</p>
      <ResumeForm initial={content} />
    </div>
  );
}
