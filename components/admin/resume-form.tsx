"use client";

import { useState, useTransition } from "react";
import type { Lang, ResumeContent, ResumeLangData, TimelineItem } from "@/lib/content-types";
import { saveResumeContent } from "@/app/admin/resume/actions";

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

function TimelineItems({
  items,
  onChange,
  addLabel,
}: {
  items: TimelineItem[];
  onChange: (items: TimelineItem[]) => void;
  addLabel: string;
}) {
  const setItem = (i: number, patch: Partial<TimelineItem>) => {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  return (
    <div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="space-y-3 rounded-xl border border-white/5 p-4">
            <div className="grid gap-3 sm:grid-cols-[10rem_1fr_2.5rem]">
              <input
                className={inputCls}
                value={item.period}
                placeholder="الفترة (2021 - الآن)"
                onChange={(e) => setItem(i, { period: e.target.value })}
              />
              <input
                className={inputCls}
                value={item.title}
                placeholder="المسمى"
                onChange={(e) => setItem(i, { title: e.target.value })}
              />
              <button
                type="button"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 text-red-400 transition-colors hover:bg-red-500/10"
                aria-label="حذف"
              >
                ×
              </button>
            </div>
            <input
              className={inputCls}
              value={item.place}
              placeholder="الجهة (الشركة / الجامعة)"
              onChange={(e) => setItem(i, { place: e.target.value })}
            />
            <textarea
              className={`${inputCls} min-h-20 resize-y`}
              value={item.text}
              placeholder="وصف مختصر (اختياري)"
              onChange={(e) => setItem(i, { text: e.target.value })}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, { period: "", title: "", place: "", text: "" }])}
        className="mt-3 rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-accent hover:text-accent"
      >
        {addLabel}
      </button>
    </div>
  );
}

function LangFields({
  data,
  onChange,
}: {
  data: ResumeLangData;
  onChange: (next: ResumeLangData) => void;
}) {
  const set = <K extends keyof ResumeLangData>(key: K, value: ResumeLangData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="شارة القسم (مثال: مسيرتي)">
          <input className={inputCls} value={data.label} onChange={(e) => set("label", e.target.value)} />
        </Field>
        <Field label="عنوان عمود الخبرات">
          <input
            className={inputCls}
            value={data.experienceTitle}
            onChange={(e) => set("experienceTitle", e.target.value)}
          />
        </Field>
        <Field label="عنوان عمود التعليم">
          <input
            className={inputCls}
            value={data.educationTitle}
            onChange={(e) => set("educationTitle", e.target.value)}
          />
        </Field>
      </div>

      <div>
        <p className="mb-3 text-sm font-bold text-white">{data.experienceTitle || "الخبرات العملية"}</p>
        <TimelineItems
          items={data.experience}
          onChange={(experience) => set("experience", experience)}
          addLabel="+ إضافة خبرة"
        />
      </div>

      <div>
        <p className="mb-3 text-sm font-bold text-white">{data.educationTitle || "التعليم"}</p>
        <TimelineItems
          items={data.education}
          onChange={(education) => set("education", education)}
          addLabel="+ إضافة مؤهل"
        />
      </div>
    </div>
  );
}

export function ResumeForm({ initial }: { initial: ResumeContent }) {
  const [content, setContent] = useState<ResumeContent>(initial);
  const [tab, setTab] = useState<Lang>("ar");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const save = () => {
    setMessage(null);
    startTransition(async () => {
      const result = await saveResumeContent(content);
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
