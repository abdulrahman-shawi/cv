"use client";

import { useState, useTransition } from "react";
import type { Lang, PortfolioContent, PortfolioItem, PortfolioLangData } from "@/lib/content-types";
import { savePortfolioContent } from "@/app/admin/portfolio/actions";
import { uploadImage } from "@/app/admin/home/actions";

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

function ItemImage({
  item,
  onChange,
  onError,
}: {
  item: PortfolioItem;
  onChange: (image: string) => void;
  onError: (text: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const result = await uploadImage(fd);
      if (result.url) onChange(result.url);
      else onError(result.error ?? "تعذّر رفع الصورة");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="h-14 w-20 shrink-0 rounded-lg object-cover ring-1 ring-white/10"
        />
      )}
      <input
        dir="ltr"
        className={inputCls}
        value={item.image}
        placeholder="رابط الصورة"
        onChange={(e) => onChange(e.target.value)}
      />
      <label
        className={`shrink-0 cursor-pointer rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-accent hover:text-accent ${uploading ? "opacity-60" : ""}`}
      >
        {uploading ? "جارٍ الرفع..." : "رفع"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          disabled={uploading}
          onChange={onPick}
        />
      </label>
    </div>
  );
}

function LangFields({
  data,
  onChange,
  onError,
}: {
  data: PortfolioLangData;
  onChange: (next: PortfolioLangData) => void;
  onError: (text: string) => void;
}) {
  const set = <K extends keyof PortfolioLangData>(key: K, value: PortfolioLangData[K]) =>
    onChange({ ...data, [key]: value });

  const setItem = (i: number, patch: Partial<PortfolioItem>) => {
    const items = [...data.items];
    items[i] = { ...items[i], ...patch };
    set("items", items);
  };

  const categoryOptions = data.categories.slice(1);

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="شارة القسم (مثال: معرض أعمالي)">
          <input className={inputCls} value={data.label} onChange={(e) => set("label", e.target.value)} />
        </Field>
        <Field label="عنوان القسم">
          <input className={inputCls} value={data.title} onChange={(e) => set("title", e.target.value)} />
        </Field>
      </div>

      <Field label="التصنيفات (سطر لكل تصنيف — السطر الأول هو زر «الكل»)">
        <textarea
          className={`${inputCls} min-h-24 resize-y`}
          value={data.categories.join("\n")}
          onChange={(e) =>
            set("categories", e.target.value.split("\n").map((c) => c.trim()).filter(Boolean))
          }
        />
      </Field>

      <div>
        <p className="mb-3 text-sm font-medium text-zinc-400">الأعمال</p>
        <div className="space-y-4">
          {data.items.map((item, i) => (
            <div key={i} className="space-y-3 rounded-xl border border-white/5 p-4">
              <ItemImage
                item={item}
                onChange={(image) => setItem(i, { image })}
                onError={onError}
              />
              <div className="grid gap-3 sm:grid-cols-[1fr_12rem_2.5rem]">
                <input
                  className={inputCls}
                  value={item.title}
                  placeholder="عنوان العمل"
                  onChange={(e) => setItem(i, { title: e.target.value })}
                />
                <select
                  className={inputCls}
                  value={item.category}
                  onChange={(e) => setItem(i, { category: e.target.value })}
                >
                  {categoryOptions.length === 0 && <option value="" className="bg-night">—</option>}
                  {categoryOptions.map((c) => (
                    <option key={c} value={c} className="bg-night">
                      {c}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => set("items", data.items.filter((_, j) => j !== i))}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 text-red-400 transition-colors hover:bg-red-500/10"
                  aria-label="حذف العمل"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            set("items", [
              ...data.items,
              { title: "", category: categoryOptions[0] ?? "", image: "" },
            ])
          }
          className="mt-3 rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-accent hover:text-accent"
        >
          + إضافة عمل
        </button>
      </div>
    </div>
  );
}

export function PortfolioForm({ initial }: { initial: PortfolioContent }) {
  const [content, setContent] = useState<PortfolioContent>(initial);
  const [tab, setTab] = useState<Lang>("ar");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const save = () => {
    setMessage(null);
    startTransition(async () => {
      const result = await savePortfolioContent(content);
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
          <LangFields
            data={content.ar}
            onChange={(ar) => setContent({ ...content, ar })}
            onError={(text) => setMessage({ ok: false, text })}
          />
        ) : (
          <LangFields
            data={content.de}
            onChange={(de) => setContent({ ...content, de })}
            onError={(text) => setMessage({ ok: false, text })}
          />
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
