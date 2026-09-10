"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth";
import {
  upsertSectionContent,
  type CertificatesContent,
  type CertificatesLangData,
} from "@/lib/content";

export type SaveState = { ok?: boolean; error?: string };

function validLangData(d: CertificatesLangData): boolean {
  return (
    typeof d.title === "string" &&
    d.title.trim().length > 0 &&
    Array.isArray(d.items) &&
    d.items.length > 0 &&
    d.items.every(
      (i) =>
        typeof i.title === "string" &&
        i.title.trim().length > 0 &&
        typeof i.issuer === "string" &&
        i.issuer.trim().length > 0 &&
        typeof i.year === "string" &&
        i.year.trim().length > 0 &&
        typeof i.image === "string" &&
        i.image.trim().length > 0
    )
  );
}

export async function saveCertificatesContent(content: CertificatesContent): Promise<SaveState> {
  if (!verifySession()) return { error: "انتهت الجلسة، سجّل الدخول من جديد" };

  if (!validLangData(content.ar) || !validLangData(content.de)) {
    return { error: "تأكد من تعبئة العنوان، وأن كل شهادة لها اسم وجهة وسنة وصورة — في اللغتين" };
  }

  try {
    await upsertSectionContent("certificates", [
      { lang: "ar", data: content.ar },
      { lang: "de", data: content.de },
    ]);
    revalidatePath("/");
    return { ok: true };
  } catch {
    return { error: "تعذّر الحفظ في قاعدة البيانات، حاول مجدداً" };
  }
}
