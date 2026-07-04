import { Inbox } from "lucide-react";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-card px-6 py-12 text-center">
      <Inbox className="h-8 w-8 text-gray-300" />
      <p className="mt-3 text-sm font-medium text-text-main">{title}</p>
      {description && (
        <p className="mt-1 text-xs text-text-sub">{description}</p>
      )}
    </div>
  );
}
