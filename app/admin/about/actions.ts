"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth";
import { upsertSectionContent, type AboutContent, type AboutLangData } from "@/lib/content";

export type SaveState = { ok?: boolean; error?: string };

function validLangData(d: AboutLangData): boolean {
  return (
    typeof d.title === "string" &&
    d.title.trim().length > 0 &&
    typeof d.bio === "string" &&
    d.bio.trim().length > 0 &&
    Array.isArray(d.skills) &&
    d.skills.length > 0 &&
    d.skills.every(
      (s) =>
        typeof s.name === "string" &&
        s.name.trim().length > 0 &&
        Number.isFinite(s.percent) &&
        s.percent >= 0 &&
        s.percent <= 100
    ) &&
    typeof d.quote?.text === "string" &&
    d.quote.text.trim().length > 0
  );
}

export async function saveAboutContent(content: AboutContent): Promise<SaveState> {
  if (!verifySession()) return { error: "انتهت الجلسة، سجّل الدخول من جديد" };

  if (!validLangData(content.ar) || !validLangData(content.de)) {
    return { error: "تأكد من تعبئة العنوان والنبذة والمهارات (0-100) والاقتباس في اللغتين" };
  }

  try {
    await upsertSectionContent("about", [
      { lang: "ar", data: content.ar },
      { lang: "de", data: content.de },
    ]);
    revalidatePath("/");
    return { ok: true };
  } catch {
    return { error: "تعذّر الحفظ في قاعدة البيانات، حاول مجدداً" };
  }
}
