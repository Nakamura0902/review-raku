import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ReviewsProvider } from "@/components/providers/ReviewsProvider";
import { currentStore } from "@/lib/mock/stores";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReviewsProvider>
      <Topbar storeName={currentStore.name} />
      <Sidebar variant="app" />
      <main className="min-h-screen pt-16 pb-20 lg:pl-56 lg:pb-0">
        <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8">{children}</div>
      </main>
      <MobileBottomNav />
    </ReviewsProvider>
  );
}
