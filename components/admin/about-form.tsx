"use client";

import { useState, useTransition } from "react";
import type { AboutContent, AboutLangData, Lang } from "@/lib/content-types";
import { saveAboutContent } from "@/app/admin/about/actions";

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
  data: AboutLangData;
  onChange: (next: AboutLangData) => void;
}) {
  const set = <K extends keyof AboutLangData>(key: K, value: AboutLangData[K]) =>
    onChange({ ...data, [key]: value });

  const setSkill = (i: number, patch: Partial<{ name: string; percent: number }>) => {
    const skills = [...data.skills];
    skills[i] = { ...skills[i], ...patch };
    set("skills", skills);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="شارة القسم (مثال: من أنا)">
          <input className={inputCls} value={data.label} onChange={(e) => set("label", e.target.value)} />
        </Field>
        <Field label="عنوان المهارات">
          <input
            className={inputCls}
            value={data.skillsTitle}
            onChange={(e) => set("skillsTitle", e.target.value)}
          />
        </Field>
      </div>

      <Field label="العنوان الرئيسي">
        <input className={inputCls} value={data.title} onChange={(e) => set("title", e.target.value)} />
      </Field>

      <Field label="النبذة">
        <textarea
          className={`${inputCls} min-h-32 resize-y`}
          value={data.bio}
          onChange={(e) => set("bio", e.target.value)}
        />
      </Field>

      <div>
        <p className="mb-3 text-sm font-medium text-zinc-400">المهارات</p>
        <div className="space-y-3">
          {data.skills.map((skill, i) => (
            <div key={i} className="grid grid-cols-[1fr_6rem_2.5rem] items-center gap-3">
              <input
                className={inputCls}
                value={skill.name}
                placeholder="اسم المهارة"
                onChange={(e) => setSkill(i, { name: e.target.value })}
              />
              <input
                type="number"
                min={0}
                max={100}
                className={inputCls}
                value={skill.percent}
                onChange={(e) => setSkill(i, { percent: Number(e.target.value) })}
              />
              <button
                type="button"
                onClick={() => set("skills", data.skills.filter((_, j) => j !== i))}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 text-red-400 transition-colors hover:bg-red-500/10"
                aria-label="حذف المهارة"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => set("skills", [...data.skills, { name: "", percent: 50 }])}
          className="mt-3 rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-accent hover:text-accent"
        >
          + إضافة مهارة
        </button>
      </div>

      <div className="rounded-xl border border-white/5 p-4">
        <p className="mb-3 text-sm font-medium text-zinc-400">الاقتباس</p>
        <div className="space-y-4">
          <textarea
            className={`${inputCls} min-h-24 resize-y`}
            value={data.quote.text}
            placeholder="نص الاقتباس"
            onChange={(e) => set("quote", { ...data.quote, text: e.target.value })}
          />
          <input
            className={inputCls}
            value={data.quote.author}
            placeholder="صاحب الاقتباس"
            onChange={(e) => set("quote", { ...data.quote, author: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

export function AboutForm({ initial }: { initial: AboutContent }) {
  const [content, setContent] = useState<AboutContent>(initial);
  const [tab, setTab] = useState<Lang>("ar");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const save = () => {
    setMessage(null);
    startTransition(async () => {
      const result = await saveAboutContent(content);
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
