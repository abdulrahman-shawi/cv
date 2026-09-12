"use client";

import { useState, useTransition } from "react";
import type { BlogContent, BlogLangData, BlogPost, Lang } from "@/lib/content-types";
import { saveBlogContent } from "@/app/admin/blog/actions";

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
  data: BlogLangData;
  onChange: (next: BlogLangData) => void;
}) {
  const set = <K extends keyof BlogLangData>(key: K, value: BlogLangData[K]) =>
    onChange({ ...data, [key]: value });

  const setPost = (i: number, patch: Partial<BlogPost>) => {
    const posts = [...data.posts];
    posts[i] = { ...posts[i], ...patch };
    set("posts", posts);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="شارة القسم (مثال: مدونتي)">
          <input className={inputCls} value={data.label} onChange={(e) => set("label", e.target.value)} />
        </Field>
        <Field label="عنوان القسم">
          <input className={inputCls} value={data.title} onChange={(e) => set("title", e.target.value)} />
        </Field>
        <Field label="نص «اقرأ المزيد»">
          <input className={inputCls} value={data.readMore} onChange={(e) => set("readMore", e.target.value)} />
        </Field>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-zinc-400">المقالات</p>
        <div className="space-y-4">
          {data.posts.map((post, i) => (
            <div key={i} className="space-y-3 rounded-xl border border-white/5 p-4">
              <div className="grid gap-3 sm:grid-cols-[10rem_1fr_2.5rem]">
                <input
                  className={inputCls}
                  value={post.date}
                  placeholder="التاريخ"
                  onChange={(e) => setPost(i, { date: e.target.value })}
                />
                <input
                  className={inputCls}
                  value={post.title}
                  placeholder="عنوان المقال"
                  onChange={(e) => setPost(i, { title: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => set("posts", data.posts.filter((_, j) => j !== i))}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 text-red-400 transition-colors hover:bg-red-500/10"
                  aria-label="حذف المقال"
                >
                  ×
                </button>
              </div>
              <textarea
                className={`${inputCls} min-h-20 resize-y`}
                value={post.text}
                placeholder="مقتطف المقال"
                onChange={(e) => setPost(i, { text: e.target.value })}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => set("posts", [...data.posts, { date: "", title: "", text: "" }])}
          className="mt-3 rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-accent hover:text-accent"
        >
          + إضافة مقال
        </button>
      </div>
    </div>
  );
}

export function BlogForm({ initial }: { initial: BlogContent }) {
  const [content, setContent] = useState<BlogContent>(initial);
  const [tab, setTab] = useState<Lang>("ar");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const save = () => {
    setMessage(null);
    startTransition(async () => {
      const result = await saveBlogContent(content);
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
