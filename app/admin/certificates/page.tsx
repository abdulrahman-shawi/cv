import { getCertificatesContent } from "@/lib/content";
import { CertificatesForm } from "@/components/admin/certificates-form";

export const dynamic = "force-dynamic";

export default async function AdminCertificatesPage() {
  const content = await getCertificatesContent();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-extrabold text-white">قسم شهاداتي</h1>
      <p className="mb-10 text-zinc-400">عدّل بطاقات الشهادات وصورها باللغتين</p>
      <CertificatesForm initial={content} />
    </div>
  );
}
