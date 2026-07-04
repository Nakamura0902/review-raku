import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Topbar homeHref="/admin" badge="管理者" />
      <Sidebar variant="admin" />
      <main className="min-h-screen pt-16 pb-10 lg:pl-56">
        <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8">{children}</div>
      </main>
    </>
  );
}
