"use client";

import Link from "next/link";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { RatingStars } from "@/components/features/RatingStars";
import { RiskBadge } from "@/components/features/ReviewStatusBadge";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { useReviews } from "@/components/providers/ReviewsProvider";

const trend = [
  { month: "1月", count: 10, rating: 4.4 },
  { month: "2月", count: 13, rating: 4.5 },
  { month: "3月", count: 11, rating: 4.4 },
  { month: "4月", count: 17, rating: 4.6 },
  { month: "5月", count: 21, rating: 4.6 },
  { month: "6月", count: 24, rating: 4.7 },
];

const weeklyTasks = [
  "未返信口コミに返信する",
  "QRカードを受付に置く",
  "低評価口コミを確認する",
];

export default function DashboardPage() {
  const { reviews } = useReviews();
  const unreplied = reviews.filter((review) => review.status !== "返信済み");
  const lowRating = reviews.filter(
    (review) => review.rating <= 2 && review.status !== "返信済み",
  );
  const maxCount = Math.max(...trend.map((t) => t.count));

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-text-main">ダッシュボード</h1>

      {/* KPI */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="今月の口コミ数" value="24" unit="件" note="前月比 +3件" noteTone="up" />
        <StatCard label="平均評価" value="4.6" note="前月比 +0.1" noteTone="up" />
        <StatCard label="未返信" value={String(unreplied.length)} unit="件" note="対応が必要な口コミ" noteTone="neutral" />
        <StatCard label="返信率" value="78" unit="%" note="前月比 +8%" noteTone="up" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* 要対応口コミ */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>要対応口コミ</CardTitle>
            <Link
              href="/app/reviews"
              className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              すべての口コミを見る
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardBody className="space-y-4">
            {unreplied.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="flex flex-col gap-3 rounded-lg border border-line p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <RatingStars rating={review.rating} size="sm" />
                    <span className="text-xs text-text-sub">{review.date}</span>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-sm text-text-main">
                    {review.text}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-text-sub">
                    <span>{review.reviewerName}</span>
                    <span>カテゴリ: {review.category}</span>
                    <RiskBadge level={review.riskLevel} />
                  </div>
                </div>
                <Link
                  href={`/app/reviews/${review.id}`}
                  className="shrink-0 rounded-lg border border-primary px-4 py-2 text-center text-sm font-medium text-primary hover:bg-primary/5"
                >
                  確認して返信
                </Link>
              </div>
            ))}
          </CardBody>
        </Card>

        <div className="space-y-6">
          {/* 今週やること */}
          <Card>
            <CardHeader>
              <CardTitle>今週やること</CardTitle>
            </CardHeader>
            <CardBody className="space-y-3">
              {weeklyTasks.map((task, index) => (
                <label
                  key={task}
                  className="flex items-center gap-3 text-sm text-text-main"
                >
                  <input
                    type="checkbox"
                    defaultChecked={index === 0}
                    className="h-4 w-4 accent-primary"
                  />
                  {task}
                </label>
              ))}
            </CardBody>
          </Card>

          {/* 低評価アラート */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-danger" />
                低評価アラート
              </CardTitle>
            </CardHeader>
            <CardBody className="space-y-4">
              {lowRating.length === 0 && (
                <p className="text-sm text-text-sub">
                  対応が必要な低評価口コミはありません。
                </p>
              )}
              {lowRating.map((review) => (
                <div key={review.id}>
                  <div className="flex items-center gap-2">
                    <RatingStars rating={review.rating} size="sm" />
                    <span className="text-xs text-text-sub">{review.date}</span>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-sm text-text-main">
                    {review.text}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <RiskBadge level={review.riskLevel} />
                    <Link
                      href={`/app/reviews/${review.id}`}
                      className="rounded-lg bg-danger px-3 py-1.5 text-xs font-medium text-white hover:bg-danger/90"
                    >
                      至急確認する
                    </Link>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* 口コミ推移 */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>口コミ推移</CardTitle>
          <div className="flex items-center gap-4 text-xs text-text-sub">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
              口コミ数
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-success" />
              平均評価
            </span>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex h-44 items-end gap-3 sm:gap-6">
            {trend.map((item) => (
              <div
                key={item.month}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <span className="text-xs font-medium text-success">
                  {item.rating}
                </span>
                <div
                  className="w-full max-w-10 rounded-t-md bg-primary"
                  style={{ height: `${(item.count / maxCount) * 110}px` }}
                  aria-label={`${item.month}: ${item.count}件`}
                />
                <span className="text-xs text-text-sub">{item.month}</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
