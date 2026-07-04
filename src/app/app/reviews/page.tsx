"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { RatingStars } from "@/components/features/RatingStars";
import {
  ReviewStatusBadge,
  RiskBadge,
} from "@/components/features/ReviewStatusBadge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { useReviews } from "@/components/providers/ReviewsProvider";
import { cn } from "@/lib/cn";
import type { Review } from "@/lib/types";

const filters = ["すべて", "未返信", "低評価", "返信済み", "要確認"] as const;
type Filter = (typeof filters)[number];

function matchesFilter(review: Review, filter: Filter): boolean {
  switch (filter) {
    case "すべて":
      return true;
    case "低評価":
      return review.rating <= 2;
    default:
      return review.status === filter;
  }
}

export default function ReviewsPage() {
  const { reviews } = useReviews();
  const [filter, setFilter] = useState<Filter>("すべて");
  const filtered = reviews.filter((review) => matchesFilter(review, filter));

  return (
    <div>
      <PageHeader
        title="口コミ一覧"
        description="新しい口コミから順に表示しています。"
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              filter === item
                ? "bg-primary text-white"
                : "border border-line bg-card text-text-sub hover:text-text-main",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="該当する口コミはありません"
          description="フィルターを変更してお試しください。"
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((review) => (
            <Link key={review.id} href={`/app/reviews/${review.id}`}>
              <Card className="mb-3 p-5 transition-colors hover:border-primary/40">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-text-main">
                        {review.reviewerName}
                      </span>
                      <RatingStars rating={review.rating} size="sm" />
                      <span className="text-xs text-text-sub">
                        {review.date}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-main">
                      {review.text}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <ReviewStatusBadge status={review.status} />
                      <RiskBadge level={review.riskLevel} />
                      <span className="text-xs text-text-sub">
                        カテゴリ: {review.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-3">
                    <ChevronRight className="h-5 w-5 text-gray-300" />
                    {review.status !== "返信済み" && (
                      <span className="hidden rounded-lg border border-primary px-3.5 py-1.5 text-xs font-medium text-primary sm:block">
                        確認して返信
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
