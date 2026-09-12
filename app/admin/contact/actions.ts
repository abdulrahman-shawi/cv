"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth";
import { upsertSectionContent, type ContactContent, type ContactLangData } from "@/lib/content";

export type SaveState = { ok?: boolean; error?: string };

function validLangData(d: ContactLangData): boolean {
  const fields = [d.label, d.title, d.emailLabel, d.phoneLabel, d.addressLabel];
  const formFields = [d.form?.name, d.form?.email, d.form?.message, d.form?.send];
  return [...fields, ...formFields].every(
    (v) => typeof v === "string" && v.trim().length > 0
  );
}

export async function saveContactContent(content: ContactContent): Promise<SaveState> {
  if (!verifySession()) return { error: "انتهت الجلسة، سجّل الدخول من جديد" };

  const { email, phone, address } = content.shared;
  if (
    !validLangData(content.ar) ||
    !validLangData(content.de) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? "") ||
    typeof phone !== "string" ||
    phone.trim().length === 0 ||
    typeof address !== "string" ||
    address.trim().length === 0
  ) {
    return { error: "تأكد من تعبئة كل الحقول في اللغتين، وأن البريد الإلكتروني صالح" };
  }

  try {
    await upsertSectionContent("contact", [
      { lang: "ar", data: content.ar },
      { lang: "de", data: content.de },
      { lang: "shared", data: content.shared },
    ]);
    revalidatePath("/");
    return { ok: true };
  } catch {
    return { error: "تعذّر الحفظ في قاعدة البيانات، حاول مجدداً" };
  }
}
