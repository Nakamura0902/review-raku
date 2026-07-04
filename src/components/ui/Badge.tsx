import { cn } from "@/lib/cn";

type Tone = "gray" | "blue" | "green" | "yellow" | "red";

const toneClasses: Record<Tone, string> = {
  gray: "bg-gray-100 text-text-sub",
  blue: "bg-primary/10 text-primary",
  green: "bg-success/10 text-success",
  yellow: "bg-warning/10 text-amber-700",
  red: "bg-danger/10 text-danger",
};

export function Badge({
  tone = "gray",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
