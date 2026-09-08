"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-accent py-3 font-semibold text-white shadow-lg shadow-accent/30 transition-all hover:bg-accent-soft disabled:opacity-60"
    >
      {pending ? "جارٍ الدخول..." : "تسجيل الدخول"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState<LoginState, FormData>(loginAction, {});

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-400">
          البريد الإلكتروني
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          dir="ltr"
          className="w-full rounded-xl border border-white/10 bg-night px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-accent"
          placeholder="admin@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-400">
          كلمة المرور
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          dir="ltr"
          className="w-full rounded-xl border border-white/10 bg-night px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-accent"
          placeholder="••••••••"
        />
      </div>

      {state.error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
