import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export function RatingStars({
  rating,
  size = "md",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`評価 ${rating} / 5`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={cn(
            starSize,
            n <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200",
          )}
        />
      ))}
    </span>
  );
}
