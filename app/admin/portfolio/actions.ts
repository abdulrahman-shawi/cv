"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth";
import { upsertSectionContent, type PortfolioContent, type PortfolioLangData } from "@/lib/content";

export type SaveState = { ok?: boolean; error?: string };

function validLangData(d: PortfolioLangData): boolean {
  return (
    typeof d.label === "string" &&
    d.label.trim().length > 0 &&
    typeof d.title === "string" &&
    d.title.trim().length > 0 &&
    Array.isArray(d.categories) &&
    d.categories.length > 0 &&
    d.categories.every((c) => typeof c === "string" && c.trim().length > 0) &&
    Array.isArray(d.items) &&
    d.items.length > 0 &&
    d.items.every(
      (i) =>
        typeof i.title === "string" &&
        i.title.trim().length > 0 &&
        typeof i.image === "string" &&
        i.image.trim().length > 0 &&
        d.categories.includes(i.category)
    )
  );
}

export async function savePortfolioContent(content: PortfolioContent): Promise<SaveState> {
  if (!verifySession()) return { error: "انتهت الجلسة، سجّل الدخول من جديد" };

  if (!validLangData(content.ar) || !validLangData(content.de)) {
    return {
      error:
        "تأكد من تعبئة العنوان والتصنيفات، وأن كل عمل له عنوان وصورة وتصنيف موجود في قائمة التصنيفات — في اللغتين",
    };
  }

  try {
    await upsertSectionContent("portfolio", [
      { lang: "ar", data: content.ar },
      { lang: "de", data: content.de },
    ]);
    revalidatePath("/");
    return { ok: true };
  } catch {
    return { error: "تعذّر الحفظ في قاعدة البيانات، حاول مجدداً" };
  }
}
