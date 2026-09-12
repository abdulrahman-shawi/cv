import { getBlogContent } from "@/lib/content";
import { BlogForm } from "@/components/admin/blog-form";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const content = await getBlogContent();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-extrabold text-white">قسم المقالات</h1>
      <p className="mb-10 text-zinc-400">عدّل مقالات المدونة المعروضة باللغتين</p>
      <BlogForm initial={content} />
    </div>
  );
}
