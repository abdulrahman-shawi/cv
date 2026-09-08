"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import type { HomeContent, HomeLangData } from "@/lib/content";

export type SaveState = { ok?: boolean; error?: string };

function validLangData(d: HomeLangData): boolean {
  return (
    typeof d.name === "string" &&
    d.name.trim().length > 0 &&
    typeof d.greeting === "string" &&
    Array.isArray(d.roles) &&
    d.roles.length > 0 &&
    d.roles.every((r) => typeof r === "string" && r.trim().length > 0) &&
    Array.isArray(d.stats) &&
    d.stats.length > 0 &&
    d.stats.every((s) => Number.isFinite(s.value) && typeof s.label === "string")
  );
}

export async function saveHomeContent(content: HomeContent): Promise<SaveState> {
  if (!verifySession()) return { error: "انتهت الجلسة، سجّل الدخول من جديد" };

  if (!validLangData(content.ar) || !validLangData(content.de)) {
    return { error: "تأكد من تعبئة الاسم والأدوار والإحصائيات في اللغتين" };
  }

  try {
    const entries = [
      { lang: "ar", data: content.ar },
      { lang: "de", data: content.de },
      { lang: "shared", data: content.shared },
    ] as const;

    for (const entry of entries) {
      await prisma.sectionContent.upsert({
        where: { section_lang: { section: "home", lang: entry.lang } },
        create: { section: "home", lang: entry.lang, data: entry.data },
        update: { data: entry.data },
      });
    }

    revalidatePath("/");
    return { ok: true };
  } catch {
    return { error: "تعذّر الحفظ في قاعدة البيانات، حاول مجدداً" };
  }
}
