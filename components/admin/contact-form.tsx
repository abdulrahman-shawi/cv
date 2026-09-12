"use client";

import { useState, useTransition } from "react";
import type { ContactContent, ContactLangData, Lang } from "@/lib/content-types";
import { saveContactContent } from "@/app/admin/contact/actions";

const inputCls =
  "w-full rounded-xl border border-white/10 bg-night px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-accent";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-400">{label}</label>
      {children}
    </div>
  );
}

function LangFields({
  data,
  onChange,
}: {
  data: ContactLangData;
  onChange: (next: ContactLangData) => void;
}) {
  const set = <K extends keyof ContactLangData>(key: K, value: ContactLangData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="شارة القسم (مثال: لنعمل معاً)">
          <input className={inputCls} value={data.label} onChange={(e) => set("label", e.target.value)} />
        </Field>
        <Field label="عنوان القسم">
          <input className={inputCls} value={data.title} onChange={(e) => set("title", e.target.value)} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="تسمية البريد">
          <input className={inputCls} value={data.emailLabel} onChange={(e) => set("emailLabel", e.target.value)} />
        </Field>
        <Field label="تسمية الهاتف">
          <input className={inputCls} value={data.phoneLabel} onChange={(e) => set("phoneLabel", e.target.value)} />
        </Field>
        <Field label="تسمية العنوان">
          <input
            className={inputCls}
            value={data.addressLabel}
            onChange={(e) => set("addressLabel", e.target.value)}
          />
        </Field>
      </div>

      <div className="rounded-xl border border-white/5 p-4">
        <p className="mb-3 text-sm font-medium text-zinc-400">نموذج التواصل (النصوص الداخلية)</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="حقل الاسم">
            <input
              className={inputCls}
              value={data.form.name}
              onChange={(e) => set("form", { ...data.form, name: e.target.value })}
            />
          </Field>
          <Field label="حقل البريد">
            <input
              className={inputCls}
              value={data.form.email}
              onChange={(e) => set("form", { ...data.form, email: e.target.value })}
            />
          </Field>
          <Field label="حقل الرسالة">
            <input
              className={inputCls}
              value={data.form.message}
              onChange={(e) => set("form", { ...data.form, message: e.target.value })}
            />
          </Field>
          <Field label="زر الإرسال">
            <input
              className={inputCls}
              value={data.form.send}
              onChange={(e) => set("form", { ...data.form, send: e.target.value })}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

export function ContactForm({ initial }: { initial: ContactContent }) {
  const [content, setContent] = useState<ContactContent>(initial);
  const [tab, setTab] = useState<Lang>("ar");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const save = () => {
    setMessage(null);
    startTransition(async () => {
      const result = await saveContactContent(content);
      setMessage(
        result.ok
          ? { ok: true, text: "تم الحفظ بنجاح — التغييرات ظاهرة الآن على الموقع" }
          : { ok: false, text: result.error ?? "حدث خطأ غير متوقع" }
      );
    });
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div className="rounded-2xl border border-white/10 bg-card p-6">
        <div className="mb-6 flex gap-2">
          {(["ar", "de"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setTab(l)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                tab === l
                  ? "bg-accent text-white shadow-lg shadow-accent/30"
                  : "border border-white/15 text-zinc-300 hover:border-accent hover:text-accent"
              }`}
            >
              {l === "ar" ? "العربية" : "الألمانية"}
            </button>
          ))}
        </div>

        {tab === "ar" ? (
          <LangFields data={content.ar} onChange={(ar) => setContent({ ...content, ar })} />
        ) : (
          <LangFields data={content.de} onChange={(de) => setContent({ ...content, de })} />
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-card p-6">
        <h2 className="mb-6 text-lg font-bold text-white">بيانات التواصل (مشتركة بين اللغتين)</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="البريد الإلكتروني">
            <input
              dir="ltr"
              type="email"
              className={inputCls}
              value={content.shared.email}
              onChange={(e) =>
                setContent({ ...content, shared: { ...content.shared, email: e.target.value } })
              }
            />
          </Field>
          <Field label="رقم الهاتف">
            <input
              dir="ltr"
              className={inputCls}
              value={content.shared.phone}
              onChange={(e) =>
                setContent({ ...content, shared: { ...content.shared, phone: e.target.value } })
              }
            />
          </Field>
          <Field label="العنوان">
            <input
              className={inputCls}
              value={content.shared.address}
              onChange={(e) =>
                setContent({ ...content, shared: { ...content.shared, address: e.target.value } })
              }
            />
          </Field>
        </div>
      </div>

      {message && (
        <p
          className={`rounded-xl border px-4 py-3 text-sm ${
            message.ok
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : "border-red-500/30 bg-red-500/10 text-red-400"
          }`}
        >
          {message.text}
        </p>
      )}

      <button
        type="button"
        onClick={save}
        disabled={pending}
        className="rounded-xl bg-accent px-10 py-3 font-semibold text-white shadow-lg shadow-accent/30 transition-all hover:bg-accent-soft disabled:opacity-60"
      >
        {pending ? "جارٍ الحفظ..." : "حفظ التغييرات"}
      </button>
    </div>
  );
}
