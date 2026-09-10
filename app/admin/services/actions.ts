"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth";
import { upsertSectionContent, type ServicesContent, type ServicesLangData } from "@/lib/content";

export type SaveState = { ok?: boolean; error?: string };

const ALLOWED_ICONS = ["target", "search", "share", "pen", "chart", "badge"];

function validLangData(d: ServicesLangData): boolean {
  return (
    typeof d.label === "string" &&
    d.label.trim().length > 0 &&
    typeof d.title === "string" &&
    d.title.trim().length > 0 &&
    Array.isArray(d.items) &&
    d.items.length > 0 &&
    d.items.every(
      (s) =>
        ALLOWED_ICONS.includes(s.icon) &&
        typeof s.title === "string" &&
        s.title.trim().length > 0 &&
        typeof s.text === "string" &&
        s.text.trim().length > 0
    )
  );
}

export async function saveServicesContent(content: ServicesContent): Promise<SaveState> {
  if (!verifySession()) return { error: "انتهت الجلسة، سجّل الدخول من جديد" };

  if (!validLangData(content.ar) || !validLangData(content.de)) {
    return { error: "تأكد من تعبئة العنوان وكل خدمة (أيقونة + عنوان + نص) في اللغتين" };
  }

  try {
    await upsertSectionContent("services", [
      { lang: "ar", data: content.ar },
      { lang: "de", data: content.de },
    ]);
    revalidatePath("/");
    return { ok: true };
  } catch {
    return { error: "تعذّر الحفظ في قاعدة البيانات، حاول مجدداً" };
  }
}
