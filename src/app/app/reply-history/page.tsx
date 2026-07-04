"use client";

import Link from "next/link";
import { RatingStars } from "@/components/features/RatingStars";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { useReviews } from "@/components/providers/ReviewsProvider";

function summarize(text: string, length = 40): string {
  return text.length > length ? text.slice(0, length) + "…" : text;
}

export default function ReplyHistoryPage() {
  const { reviews } = useReviews();
  const replied = reviews.filter((review) => review.status === "返信済み");

  return (
    <div>
      <PageHeader
        title="返信履歴"
        description="返信済みの口コミの一覧です。"
      />

      {replied.length === 0 ? (
        <EmptyState title="返信済みの口コミはまだありません" />
      ) : (
        <>
          {/* PC: テーブル */}
          <Card className="hidden overflow-hidden lg:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-background text-left text-xs text-text-sub">
                  <th className="px-5 py-3 font-medium">返信日</th>
                  <th className="px-5 py-3 font-medium">評価</th>
                  <th className="px-5 py-3 font-medium">口コミ</th>
                  <th className="px-5 py-3 font-medium">返信文</th>
                  <th className="px-5 py-3 font-medium">返信者</th>
                  <th className="px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {replied.map((review) => (
                  <tr key={review.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-4 whitespace-nowrap text-text-sub">
                      {review.repliedAt ?? review.date}
                    </td>
                    <td className="px-5 py-4">
                      <RatingStars rating={review.rating} size="sm" />
                    </td>
                    <td className="max-w-60 px-5 py-4 text-text-main">
                      {summarize(review.text)}
                    </td>
                    <td className="max-w-60 px-5 py-4 text-text-sub">
                      {summarize(review.aiReply)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-text-sub">
                      {review.repliedBy ?? "店舗管理者"}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/app/reviews/${review.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        詳細
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* スマホ: カード */}
          <div className="space-y-3 lg:hidden">
            {replied.map((review) => (
              <Card key={review.id} className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <RatingStars rating={review.rating} size="sm" />
                  <span className="text-xs text-text-sub">
                    返信日: {review.repliedAt ?? review.date}
                  </span>
                </div>
                <p className="mt-2.5 text-sm text-text-main">
                  {summarize(review.text, 60)}
                </p>
                <p className="mt-2 rounded-lg bg-background px-3 py-2.5 text-xs leading-relaxed text-text-sub">
                  {summarize(review.aiReply, 80)}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-text-sub">
                    {review.repliedBy ?? "店舗管理者"}
                  </span>
                  <Link
                    href={`/app/reviews/${review.id}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    詳細を見る
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
