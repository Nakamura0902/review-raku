import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

export function StatCard({
  label,
  value,
  unit,
  note,
  noteTone = "neutral",
}: {
  label: string;
  value: string;
  unit?: string;
  note?: string;
  noteTone?: "up" | "down" | "neutral";
}) {
  return (
    <Card className="p-5 text-center">
      <div className="text-xs font-medium text-text-sub">{label}</div>
      <div className="mt-2 text-3xl font-bold text-primary">
        {value}
        {unit && (
          <span className="ml-1 text-sm font-medium text-text-main">
            {unit}
          </span>
        )}
      </div>
      {note && (
        <div
          className={cn(
            "mt-2 text-xs",
            noteTone === "up" && "text-success",
            noteTone === "down" && "text-danger",
            noteTone === "neutral" && "text-text-sub",
          )}
        >
          {note}
        </div>
      )}
    </Card>
  );
}
