"use client";

import { useState, useTransition } from "react";
import type { HomeContent, HomeLangData, Lang } from "@/lib/content-types";
import { saveHomeContent, uploadImage } from "@/app/admin/home/actions";

const inputCls =
  "w-full rounded-xl border border-white/10 bg-night px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-accent";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-400">{label}</label>
      {children}
    </div>
  );
}

function LangFields({
  lang,
  data,
  onChange,
}: {
  lang: Lang;
  data: HomeLangData;
  onChange: (next: HomeLangData) => void;
}) {
  const set = <K extends keyof HomeLangData>(key: K, value: HomeLangData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="التحية">
          <input className={inputCls} value={data.greeting} onChange={(e) => set("greeting", e.target.value)} />
        </Field>
        <Field label="الاسم">
          <input className={inputCls} value={data.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
      </div>

      <Field label="عبارة «أعمل كـ»">
        <input className={inputCls} value={data.iam} onChange={(e) => set("iam", e.target.value)} />
      </Field>

      <Field label="الأدوار المتغيرة (سطر لكل دور)">
        <textarea
          className={`${inputCls} min-h-32 resize-y`}
          value={data.roles.join("\n")}
          onChange={(e) => set("roles", e.target.value.split("\n").map((r) => r.trim()).filter(Boolean))}
        />
      </Field>

      <Field label="الوصف">
        <textarea
          className={`${inputCls} min-h-28 resize-y`}
          value={data.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="زر التواصل">
          <input className={inputCls} value={data.contactBtn} onChange={(e) => set("contactBtn", e.target.value)} />
        </Field>
        <Field label="زر الخدمات">
          <input className={inputCls} value={data.servicesBtn} onChange={(e) => set("servicesBtn", e.target.value)} />
        </Field>
        <Field label="نص «مرّر للأسفل»">
          <input className={inputCls} value={data.scroll} onChange={(e) => set("scroll", e.target.value)} />
        </Field>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-zinc-400">الإحصائيات</p>
        <div className="space-y-3">
          {data.stats.map((stat, i) => (
            <div key={i} className="grid grid-cols-[6rem_5rem_1fr] items-center gap-3">
              <input
                type="number"
                className={inputCls}
                value={stat.value}
                onChange={(e) => {
                  const stats = [...data.stats];
                  stats[i] = { ...stat, value: Number(e.target.value) };
                  set("stats", stats);
                }}
              />
              <input
                className={inputCls}
                value={stat.suffix}
                placeholder="+"
                onChange={(e) => {
                  const stats = [...data.stats];
                  stats[i] = { ...stat, suffix: e.target.value };
                  set("stats", stats);
                }}
              />
              <input
                className={inputCls}
                value={stat.label}
                placeholder="العنوان"
                onChange={(e) => {
                  const stats = [...data.stats];
                  stats[i] = { ...stat, label: e.target.value };
                  set("stats", stats);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HomeForm({ initial }: { initial: HomeContent }) {
  const [content, setContent] = useState<HomeContent>(initial);
  const [tab, setTab] = useState<Lang>("ar");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);

  const onPickImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setMessage(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const result = await uploadImage(fd);
      if (result.url) {
        setContent({ ...content, shared: { ...content.shared, profileImage: result.url } });
        setMessage({ ok: true, text: "تم رفع الصورة — لا تنسَ الضغط على «حفظ التغييرات»" });
      } else {
        setMessage({ ok: false, text: result.error ?? "تعذّر رفع الصورة" });
      }
    } finally {
      setUploading(false);
    }
  };

  const save = () => {
    setMessage(null);
    startTransition(async () => {
      const result = await saveHomeContent(content);
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
          <LangFields lang="ar" data={content.ar} onChange={(ar) => setContent({ ...content, ar })} />
        ) : (
          <LangFields lang="de" data={content.de} onChange={(de) => setContent({ ...content, de })} />
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-card p-6">
        <h2 className="mb-6 text-lg font-bold text-white">إعدادات مشتركة</h2>
        <div className="space-y-5">
          <Field label="الصورة الشخصية (تظهر في الدائرة بدل الحرف الأول من الاسم)">
            <div className="flex items-center gap-5">
              {content.shared.profileImage ? (
                <img
                  src={content.shared.profileImage}
                  alt="الصورة الشخصية"
                  className="h-20 w-20 shrink-0 rounded-full object-cover ring-1 ring-white/10"
                />
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-night text-3xl font-extrabold text-accent ring-1 ring-white/10">
                  {content.ar.name.charAt(0) || "؟"}
                </div>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <label
                  className={`cursor-pointer rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-soft ${uploading ? "opacity-60" : ""}`}
                >
                  {uploading ? "جارٍ الرفع..." : "رفع صورة"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    className="hidden"
                    disabled={uploading}
                    onChange={onPickImage}
                  />
                </label>
                {content.shared.profileImage && (
                  <button
                    type="button"
                    onClick={() =>
                      setContent({ ...content, shared: { ...content.shared, profileImage: "" } })
                    }
                    className="rounded-xl border border-red-500/30 px-5 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
                  >
                    إزالة الصورة
                  </button>
                )}
              </div>
            </div>
            <p className="mt-2 text-xs text-zinc-500">jpg أو png أو webp — بحد أقصى 5MB</p>
          </Field>

          <Field label="رابط صورة الخلفية">
            <input
              dir="ltr"
              className={inputCls}
              value={content.shared.backgroundImage}
              onChange={(e) =>
                setContent({ ...content, shared: { ...content.shared, backgroundImage: e.target.value } })
              }
            />
          </Field>

          <div>
            <p className="mb-3 text-sm font-medium text-zinc-400">روابط التواصل الاجتماعي</p>
            <div className="space-y-3">
              {content.shared.socials.map((social, i) => (
                <div key={social.name} className="grid grid-cols-[7rem_1fr] items-center gap-3">
                  <span className="text-sm font-semibold text-zinc-300">{social.name}</span>
                  <input
                    dir="ltr"
                    className={inputCls}
                    value={social.href}
                    onChange={(e) => {
                      const socials = [...content.shared.socials];
                      socials[i] = { ...social, href: e.target.value };
                      setContent({ ...content, shared: { ...content.shared, socials } });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
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
