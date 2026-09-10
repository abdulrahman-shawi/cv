"use client";

import { useState, useTransition } from "react";
import type { Lang, ServiceItem, ServicesContent, ServicesLangData } from "@/lib/content-types";
import { saveServicesContent } from "@/app/admin/services/actions";
import { icons } from "@/components/sections";

const inputCls =
  "w-full rounded-xl border border-white/10 bg-night px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-accent";

const ICON_OPTIONS: { key: string; label: string }[] = [
  { key: "target", label: "هدف" },
  { key: "search", label: "بحث" },
  { key: "share", label: "مشاركة" },
  { key: "pen", label: "قلم" },
  { key: "chart", label: "رسم بياني" },
  { key: "badge", label: "شارة" },
];

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
  data: ServicesLangData;
  onChange: (next: ServicesLangData) => void;
}) {
  const set = <K extends keyof ServicesLangData>(key: K, value: ServicesLangData[K]) =>
    onChange({ ...data, [key]: value });

  const setItem = (i: number, patch: Partial<ServiceItem>) => {
    const items = [...data.items];
    items[i] = { ...items[i], ...patch };
    set("items", items);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="شارة القسم (مثال: ماذا أقدم)">
          <input className={inputCls} value={data.label} onChange={(e) => set("label", e.target.value)} />
        </Field>
        <Field label="عنوان القسم">
          <input className={inputCls} value={data.title} onChange={(e) => set("title", e.target.value)} />
        </Field>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-zinc-400">الخدمات</p>
        <div className="space-y-4">
          {data.items.map((item, i) => (
            <div key={i} className="space-y-3 rounded-xl border border-white/5 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 p-2 text-accent">
                  {icons[item.icon]}
                </span>
                <select
                  className={inputCls}
                  value={item.icon}
                  onChange={(e) => setItem(i, { icon: e.target.value })}
                >
                  {ICON_OPTIONS.map((o) => (
                    <option key={o.key} value={o.key} className="bg-night">
                      {o.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => set("items", data.items.filter((_, j) => j !== i))}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/30 text-red-400 transition-colors hover:bg-red-500/10"
                  aria-label="حذف الخدمة"
                >
                  ×
                </button>
              </div>
              <input
                className={inputCls}
                value={item.title}
                placeholder="عنوان الخدمة"
                onChange={(e) => setItem(i, { title: e.target.value })}
              />
              <textarea
                className={`${inputCls} min-h-20 resize-y`}
                value={item.text}
                placeholder="وصف الخدمة"
                onChange={(e) => setItem(i, { text: e.target.value })}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => set("items", [...data.items, { icon: "target", title: "", text: "" }])}
          className="mt-3 rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-accent hover:text-accent"
        >
          + إضافة خدمة
        </button>
      </div>
    </div>
  );
}

export function ServicesForm({ initial }: { initial: ServicesContent }) {
  const [content, setContent] = useState<ServicesContent>(initial);
  const [tab, setTab] = useState<Lang>("ar");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const save = () => {
    setMessage(null);
    startTransition(async () => {
      const result = await saveServicesContent(content);
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
