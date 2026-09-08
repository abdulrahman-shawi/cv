"use server";

import { redirect } from "next/navigation";
import { checkCredentials, createSession } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!checkCredentials(email, password)) {
    return { error: "بيانات الدخول غير صحيحة" };
  }

  createSession();
  redirect("/admin");
}
