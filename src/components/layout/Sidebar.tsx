"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { adminNavItems, appNavItems } from "@/components/layout/navItems";

export function Sidebar({ variant }: { variant: "app" | "admin" }) {
  const pathname = usePathname();
  const items = variant === "admin" ? adminNavItems : appNavItems;

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-line bg-card pt-16 lg:flex">
      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href + "/"));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-text-sub hover:bg-background hover:text-text-main",
              )}
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
