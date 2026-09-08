import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "تسجيل الدخول — لوحة التحكم" };

export default function LoginPage() {
  if (verifySession()) redirect("/admin");

  return (
    <main dir="rtl" className="flex min-h-screen items-center justify-center px-4">
      <div className="pointer-events-none absolute -top-32 start-1/4 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-card p-8 shadow-2xl">
        <h1 className="mb-2 text-center text-2xl font-extrabold text-white">لوحة التحكم</h1>
        <p className="mb-8 text-center text-sm text-zinc-400">سجّل الدخول لإدارة محتوى الموقع</p>
        <LoginForm />
        <a href="/" className="mt-6 block text-center text-sm text-zinc-500 transition-colors hover:text-accent">
          العودة إلى الموقع
        </a>
      </div>
    </main>
  );
}
