"use client";

import Link from "next/link";
import { use, useState } from "react";
import { ArrowLeft, CheckCircle2, PenLine, RefreshCw } from "lucide-react";
import { RatingStars } from "@/components/features/RatingStars";
import {
  ReviewStatusBadge,
  RiskBadge,
} from "@/components/features/ReviewStatusBadge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useReviews } from "@/components/providers/ReviewsProvider";
import { mockGenerateReviewReply } from "@/lib/ai/mockGenerateReviewReply";

export default function ReviewDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getReview, updateAiReply, markReplied } = useReviews();
  const review = getReview(id);

  const [editing, setEditing] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [variant, setVariant] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [posted, setPosted] = useState(false);

  if (!review) {
    return (
      <div>
        <p className="text-sm text-text-sub">口コミが見つかりませんでした。</p>
        <Link
          href="/app/reviews"
          className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
        >
          口コミ一覧へ戻る
        </Link>
      </div>
    );
  }

  async function regenerate() {
    if (!review) return;
    setRegenerating(true);
    const nextVariant = variant + 1;
    const reply = await mockGenerateReviewReply(review, nextVariant);
    updateAiReply(review.id, reply);
    setVariant(nextVariant);
    setRegenerating(false);
  }

  function submitReply() {
    if (!review) return;
    markReplied(review.id, review.aiReply);
    setConfirmOpen(false);
    setPosted(true);
  }

  const replied = review.status === "返信済み";

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/app/reviews"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-text-sub hover:text-text-main"
      >
        <ArrowLeft className="h-4 w-4" />
        口コミ一覧へ戻る
      </Link>

      {posted && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-success/30 bg-success/10 px-5 py-4">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
          <div className="text-sm">
            <p className="font-semibold text-text-main">
              返信を投稿しました
            </p>
            <p className="text-text-sub">
              Google口コミへの返信が完了しました。反映まで数分かかる場合があります。
            </p>
          </div>
        </div>
      )}

      {/* 口コミ内容 */}
      <Card>
        <CardHeader>
          <CardTitle>口コミ内容</CardTitle>
          <ReviewStatusBadge status={review.status} />
        </CardHeader>
        <CardBody>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-base font-semibold text-text-main">
              {review.reviewerName}
            </span>
            <RatingStars rating={review.rating} />
            <span className="text-sm text-text-sub">{review.date}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-text-main">
            {review.text}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-text-sub">
            <span className="rounded-full bg-background px-2.5 py-0.5">
              カテゴリ: {review.category}
            </span>
            <RiskBadge level={review.riskLevel} />
          </div>
        </CardBody>
      </Card>

      {/* AI返信案 */}
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>{replied ? "返信内容" : "AI返信案"}</CardTitle>
          <span className="text-xs text-text-sub">
            {review.aiReply.length}文字
          </span>
        </CardHeader>
        <CardBody>
          {editing ? (
            <Textarea
              rows={8}
              value={review.aiReply}
              onChange={(event) => updateAiReply(review.id, event.target.value)}
              autoFocus
            />
          ) : (
            <p className="rounded-lg bg-background px-4 py-3.5 text-sm leading-relaxed whitespace-pre-wrap text-text-main">
              {review.aiReply}
            </p>
          )}

          {!replied && (
            <>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={regenerate}
                  disabled={regenerating}
                >
                  <RefreshCw
                    className={
                      regenerating ? "h-4 w-4 animate-spin" : "h-4 w-4"
                    }
                  />
                  {regenerating ? "生成中..." : "再生成"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditing((prev) => !prev)}
                >
                  <PenLine className="h-4 w-4" />
                  {editing ? "編集を終了" : "編集"}
                </Button>
                <Button
                  className="ml-auto w-full sm:w-auto"
                  size="md"
                  onClick={() => setConfirmOpen(true)}
                  disabled={review.aiReply.trim().length === 0}
                >
                  返信する
                </Button>
              </div>
              <p className="mt-3 text-xs text-text-sub">
                返信は「投稿する」を押すまでGoogleに公開されません。内容をご確認のうえ投稿してください。
              </p>
            </>
          )}
          {replied && review.repliedAt && (
            <p className="mt-4 text-xs text-text-sub">
              {review.repliedAt} に {review.repliedBy ?? "店舗管理者"}{" "}
              が返信しました。
            </p>
          )}
        </CardBody>
      </Card>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="この内容で返信しますか?"
        footer={
          <>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={submitReply}>投稿する</Button>
          </>
        }
      >
        <p className="text-xs text-text-sub">
          以下の内容がGoogle口コミへの返信として公開されます。
        </p>
        <p className="mt-3 rounded-lg bg-background px-4 py-3.5 text-sm leading-relaxed whitespace-pre-wrap text-text-main">
          {review.aiReply}
        </p>
      </Modal>
    </div>
  );
}
