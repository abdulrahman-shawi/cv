"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth";
import { upsertSectionContent, type BlogContent, type BlogLangData } from "@/lib/content";

export type SaveState = { ok?: boolean; error?: string };

function validLangData(d: BlogLangData): boolean {
  return (
    typeof d.label === "string" &&
    d.label.trim().length > 0 &&
    typeof d.title === "string" &&
    d.title.trim().length > 0 &&
    typeof d.readMore === "string" &&
    d.readMore.trim().length > 0 &&
    Array.isArray(d.posts) &&
    d.posts.length > 0 &&
    d.posts.every(
      (p) =>
        typeof p.date === "string" &&
        p.date.trim().length > 0 &&
        typeof p.title === "string" &&
        p.title.trim().length > 0 &&
        typeof p.text === "string" &&
        p.text.trim().length > 0
    )
  );
}

export async function saveBlogContent(content: BlogContent): Promise<SaveState> {
  if (!verifySession()) return { error: "انتهت الجلسة، سجّل الدخول من جديد" };

  if (!validLangData(content.ar) || !validLangData(content.de)) {
    return { error: "تأكد من تعبئة عناوين القسم، وأن كل مقال له تاريخ وعنوان ونص — في اللغتين" };
  }

  try {
    await upsertSectionContent("blog", [
      { lang: "ar", data: content.ar },
      { lang: "de", data: content.de },
    ]);
    revalidatePath("/");
    return { ok: true };
  } catch {
    return { error: "تعذّر الحفظ في قاعدة البيانات، حاول مجدداً" };
  }
}
