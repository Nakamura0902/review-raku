"use client";

import Link from "next/link";
import { use, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { StatCard } from "@/components/ui/StatCard";
import { mockAdminStores } from "@/lib/mock/adminStores";

export default function AdminStoreDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const store = mockAdminStores.find((item) => item.id === id);

  const [memos, setMemos] = useState(store?.memos ?? []);
  const [memoText, setMemoText] = useState("");
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!store) {
    return (
      <div>
        <p className="text-sm text-text-sub">店舗が見つかりませんでした。</p>
        <Link
          href="/admin/stores"
          className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
        >
          契約店舗一覧へ戻る
        </Link>
      </div>
    );
  }

  function addMemo() {
    if (!memoText.trim()) return;
    const today = new Date()
      .toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replaceAll("-", "/");
    setMemos((prev) => [{ date: today, text: memoText.trim() }, ...prev]);
    setMemoText("");
  }

  return (
    <div>
      <Link
        href="/admin/stores"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-text-sub hover:text-text-main"
      >
        <ArrowLeft className="h-4 w-4" />
        契約店舗一覧へ戻る
      </Link>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main">{store.name}</h1>
          <p className="mt-1 text-sm text-text-sub">
            {store.industry} / {store.plan}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setMessage("プラン変更は現在準備中です。")}
          >
            プラン変更
          </Button>
          <Button variant="danger" onClick={() => setDeactivateOpen(true)}>
            店舗を非アクティブにする
          </Button>
        </div>
      </div>

      {message && (
        <div className="mb-5 rounded-xl border border-primary/30 bg-primary/5 px-5 py-3.5 text-sm text-text-main">
          {message}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="未返信数" value={String(store.unrepliedCount)} unit="件" />
        <StatCard label="低評価数" value={String(store.lowRatingCount)} unit="件" />
        <StatCard label="返信率" value={String(store.replyRate)} unit="%" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>店舗情報・運用状況</CardTitle>
          </CardHeader>
          <CardBody>
            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-text-sub">契約ステータス</dt>
                <dd>
                  <Badge
                    tone={store.contractStatus === "契約中" ? "green" : "red"}
                  >
                    {store.contractStatus}
                  </Badge>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-text-sub">次回請求日</dt>
                <dd className="font-medium">{store.nextBillingDate}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-text-sub">Google連携状態</dt>
                <dd>
                  {store.googleConnected ? (
                    <Badge tone="green">連携中</Badge>
                  ) : (
                    <Badge tone="red">未連携</Badge>
                  )}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-text-sub">最終同期</dt>
                <dd className="font-medium">{store.lastSyncedAt}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-text-sub">口コミ取得数</dt>
                <dd className="font-medium">{store.fetchedReviewCount}件</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-text-sub">APIエラー</dt>
                <dd
                  className={
                    store.apiErrorCount > 0
                      ? "font-medium text-danger"
                      : "font-medium"
                  }
                >
                  {store.apiErrorCount}件
                </dd>
              </div>
            </dl>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>管理メモ</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex gap-2">
              <Textarea
                rows={2}
                placeholder="対応内容などをメモ"
                value={memoText}
                onChange={(event) => setMemoText(event.target.value)}
              />
            </div>
            <Button size="sm" className="mt-2" onClick={addMemo}>
              <Plus className="h-4 w-4" />
              メモを追加
            </Button>
            <div className="mt-4 space-y-3">
              {memos.map((memo, index) => (
                <div
                  key={`${memo.date}-${index}`}
                  className="rounded-lg bg-background px-4 py-3"
                >
                  <p className="text-xs text-text-sub">{memo.date}</p>
                  <p className="mt-1 text-sm text-text-main">{memo.text}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <Modal
        open={deactivateOpen}
        onClose={() => setDeactivateOpen(false)}
        title="店舗を非アクティブにしますか?"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeactivateOpen(false)}>
              キャンセル
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setDeactivateOpen(false);
                setMessage(`${store.name} を非アクティブにしました(モック)。`);
              }}
            >
              非アクティブにする
            </Button>
          </>
        }
      >
        <p className="text-sm leading-relaxed text-text-main">
          非アクティブにすると、この店舗の口コミ取得と通知が停止します。請求は次回請求日から停止されます。
        </p>
      </Modal>
    </div>
  );
}
