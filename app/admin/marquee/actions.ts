"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth";
import { upsertSectionContent, type MarqueeContent } from "@/lib/content";

export type SaveState = { ok?: boolean; error?: string };

function validWords(words: string[]): boolean {
  return (
    Array.isArray(words) &&
    words.length > 0 &&
    words.every((w) => typeof w === "string" && w.trim().length > 0)
  );
}

export async function saveMarqueeContent(content: MarqueeContent): Promise<SaveState> {
  if (!verifySession()) return { error: "انتهت الجلسة، سجّل الدخول من جديد" };

  if (!validWords(content.ar) || !validWords(content.de)) {
    return { error: "أدخل كلمة واحدة على الأقل في كل لغة" };
  }

  try {
    await upsertSectionContent("marquee", [
      { lang: "ar", data: content.ar },
      { lang: "de", data: content.de },
    ]);
    revalidatePath("/");
    return { ok: true };
  } catch {
    return { error: "تعذّر الحفظ في قاعدة البيانات، حاول مجدداً" };
  }
}
