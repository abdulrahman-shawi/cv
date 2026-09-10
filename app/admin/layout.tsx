import Link from "next/link";
import { redirect } from "next/navigation";
import { destroySession, verifySession } from "@/lib/auth";

const navItems = [
  { href: "/admin", label: "لوحة التحكم" },
  { href: "/admin/home", label: "قسم الرئيسية" },
  { href: "/admin/about", label: "قسم من أنا" },
  { href: "/admin/services", label: "قسم ماذا أقدم" },
];

async function logout() {
  "use server";
  destroySession();
  redirect("/login");
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!verifySession()) redirect("/login");

  return (
    <div dir="rtl" className="flex min-h-screen">
      <aside className="flex w-60 shrink-0 flex-col border-l border-white/10 bg-card/50 p-6">
        <Link href="/admin" className="mb-10 text-xl font-extrabold text-white">
          لوحة التحكم<span className="text-accent">.</span>
        </Link>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-accent/10 hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-2">
          <Link
            href="/"
            className="block rounded-xl border border-white/10 px-4 py-2.5 text-center text-sm font-medium text-zinc-300 transition-colors hover:border-accent hover:text-accent"
          >
            عرض الموقع
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="w-full rounded-xl border border-red-500/30 px-4 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
            >
              تسجيل الخروج
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-8 sm:p-12">{children}</main>
    </div>
  );
}
