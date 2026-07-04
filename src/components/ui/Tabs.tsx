"use client";

import { cn } from "@/lib/cn";

export function Tabs({
  items,
  value,
  onChange,
  className,
}: {
  items: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex rounded-lg border border-line bg-card p-1",
        className,
      )}
      role="tablist"
    >
      {items.map((item) => (
        <button
          key={item.value}
          role="tab"
          aria-selected={value === item.value}
          onClick={() => onChange(item.value)}
          className={cn(
            "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
            value === item.value
              ? "bg-primary/10 text-primary"
              : "text-text-sub hover:text-text-main",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
