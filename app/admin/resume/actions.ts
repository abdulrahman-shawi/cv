"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth";
import { upsertSectionContent, type ResumeContent, type ResumeLangData } from "@/lib/content";

export type SaveState = { ok?: boolean; error?: string };

function validLangData(d: ResumeLangData): boolean {
  const validItems = (items: ResumeLangData["experience"]) =>
    Array.isArray(items) &&
    items.length > 0 &&
    items.every(
      (i) =>
        typeof i.period === "string" &&
        i.period.trim().length > 0 &&
        typeof i.title === "string" &&
        i.title.trim().length > 0 &&
        typeof i.place === "string" &&
        i.place.trim().length > 0
    );

  return (
    typeof d.label === "string" &&
    d.label.trim().length > 0 &&
    typeof d.experienceTitle === "string" &&
    d.experienceTitle.trim().length > 0 &&
    typeof d.educationTitle === "string" &&
    d.educationTitle.trim().length > 0 &&
    validItems(d.experience) &&
    validItems(d.education)
  );
}

export async function saveResumeContent(content: ResumeContent): Promise<SaveState> {
  if (!verifySession()) return { error: "انتهت الجلسة، سجّل الدخول من جديد" };

  if (!validLangData(content.ar) || !validLangData(content.de)) {
    return {
      error:
        "تأكد من تعبئة عناوين القسم، وأن كل عنصر له فترة وعنوان وجهة — في اللغتين وفي الخبرات والتعليم",
    };
  }

  try {
    await upsertSectionContent("resume", [
      { lang: "ar", data: content.ar },
      { lang: "de", data: content.de },
    ]);
    revalidatePath("/");
    return { ok: true };
  } catch {
    return { error: "تعذّر الحفظ في قاعدة البيانات، حاول مجدداً" };
  }
}
