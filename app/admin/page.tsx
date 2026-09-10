import Link from "next/link";

const sections = [
  { key: "home", label: "قسم الرئيسية", description: "النص الترحيبي، الاسم، الأدوار، الإحصائيات، وصورة الخلفية", href: "/admin/home", ready: true },
  { key: "about", label: "من أنا", description: "النبذة والمهارات والاقتباس", href: "/admin/about", ready: true },
  { key: "services", label: "خدماتي", description: "بطاقات الخدمات", href: "/admin/services", ready: true },
  { key: "portfolio", label: "أعمالي", description: "معرض المشاريع", href: "/admin/portfolio", ready: true },
  { key: "marquee", label: "الكلمات المتحركة", description: "الشريط المتحرك بين الأقسام", href: "/admin/marquee", ready: true },
  { key: "resume", label: "السيرة الذاتية", description: "الخبرات العملية والتعليم", href: "/admin/resume", ready: true },
  { key: "certificates", label: "شهاداتي", description: "بطاقات الشهادات وصورها", href: "/admin/certificates", ready: true },
  { key: "blog", label: "المقالات", description: "منشورات المدونة", href: "#", ready: false },
  { key: "contact", label: "تواصل معي", description: "بيانات التواصل", href: "#", ready: false },
];

export default function AdminPage() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-extrabold text-white">أقسام الموقع</h1>
      <p className="mb-10 text-zinc-400">اختر القسم الذي تريد تعديل محتواه</p>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {sections.map((s) =>
          s.ready ? (
            <Link
              key={s.key}
              href={s.href}
              className="group rounded-2xl border border-white/10 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10"
            >
              <h2 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-accent">
                {s.label}
              </h2>
              <p className="text-sm leading-relaxed text-zinc-400">{s.description}</p>
            </Link>
          ) : (
            <div
              key={s.key}
              className="relative rounded-2xl border border-white/5 bg-card/50 p-6 opacity-60"
            >
              <span className="absolute end-4 top-4 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-500">
                قريباً
              </span>
              <h2 className="mb-2 text-lg font-bold text-zinc-300">{s.label}</h2>
              <p className="text-sm leading-relaxed text-zinc-500">{s.description}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
