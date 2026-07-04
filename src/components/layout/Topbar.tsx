import Link from "next/link";
import { ChevronDown, CircleUser, HelpCircle } from "lucide-react";

export function Topbar({
  storeName,
  homeHref = "/app/dashboard",
  badge,
}: {
  storeName?: string;
  homeHref?: string;
  badge?: string;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-card px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Link href={homeHref} className="text-xl font-bold text-primary">
          レビュ楽
        </Link>
        {badge && (
          <span className="rounded-md bg-danger/10 px-2 py-0.5 text-xs font-semibold text-danger">
            {badge}
          </span>
        )}
        {storeName && (
          <button className="hidden items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-text-main hover:bg-background sm:flex">
            {storeName}
            <ChevronDown className="h-4 w-4 text-text-sub" />
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 text-sm text-text-sub">
        <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 hover:bg-background hover:text-text-main">
          <HelpCircle className="h-4 w-4" />
          <span className="hidden sm:inline">ヘルプ</span>
        </button>
        <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 hover:bg-background hover:text-text-main">
          <CircleUser className="h-5 w-5" />
          <span className="hidden sm:inline">アカウント</span>
          <ChevronDown className="hidden h-4 w-4 sm:block" />
        </button>
      </div>
    </header>
  );
}
