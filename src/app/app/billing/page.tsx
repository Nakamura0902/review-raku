"use client";

import { useState } from "react";
import { CreditCard, FileText, Receipt } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { mockInvoices, mockSubscription } from "@/lib/mock/billing";

export default function BillingPage() {
  const [cancelOpen, setCancelOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="請求・プラン" />

      {message && (
        <div className="mb-5 rounded-xl border border-primary/30 bg-primary/5 px-5 py-3.5 text-sm text-text-main">
          {message}
        </div>
      )}

      {/* 現在のプラン */}
      <Card>
        <CardHeader>
          <CardTitle>現在のプラン</CardTitle>
          <Badge tone="green">契約中</Badge>
        </CardHeader>
        <CardBody>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-lg font-bold text-primary">
                {mockSubscription.planName}
              </p>
              <p className="mt-1 text-2xl font-bold text-text-main">
                月額 {mockSubscription.amount.toLocaleString()}円
                <span className="text-sm font-medium text-text-sub">
                  (税込)
                </span>
              </p>
            </div>
            <dl className="space-y-1.5 text-sm">
              <div className="flex items-center justify-between gap-8">
                <dt className="text-text-sub">次回請求日</dt>
                <dd className="font-medium text-text-main">
                  {mockSubscription.nextBillingDate}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-8">
                <dt className="text-text-sub">支払い方法</dt>
                <dd className="flex items-center gap-1.5 font-medium text-text-main">
                  <CreditCard className="h-4 w-4 text-text-sub" />
                  Visa •••• 4242
                </dd>
              </div>
            </dl>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() =>
                setMessage(
                  "支払い方法の変更ページ(Stripeカスタマーポータル)は現在準備中です。",
                )
              }
            >
              支払い方法を変更
            </Button>
            <Button
              variant="ghost"
              className="text-danger hover:bg-danger/5 hover:text-danger"
              onClick={() => setCancelOpen(true)}
            >
              プランを解約する
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* 請求履歴 */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>請求履歴</CardTitle>
        </CardHeader>

        {/* PC: テーブル */}
        <div className="hidden lg:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-background text-left text-xs text-text-sub">
                <th className="px-5 py-3 font-medium">請求日</th>
                <th className="px-5 py-3 font-medium">期間</th>
                <th className="px-5 py-3 font-medium">金額</th>
                <th className="px-5 py-3 font-medium">ステータス</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-4 whitespace-nowrap">{invoice.date}</td>
                  <td className="px-5 py-4 text-text-sub">{invoice.period}</td>
                  <td className="px-5 py-4 font-medium">
                    {invoice.amount.toLocaleString()}円
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={invoice.status === "支払い済み" ? "green" : "yellow"}>
                      {invoice.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-3 text-xs font-medium text-primary">
                      <button className="flex items-center gap-1 hover:underline">
                        <FileText className="h-3.5 w-3.5" />
                        請求書を見る
                      </button>
                      <button className="flex items-center gap-1 hover:underline">
                        <Receipt className="h-3.5 w-3.5" />
                        領収書を見る
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* スマホ: カード */}
        <CardBody className="space-y-3 lg:hidden">
          {mockInvoices.map((invoice) => (
            <div key={invoice.id} className="rounded-lg border border-line p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-main">
                  {invoice.date}
                </span>
                <Badge tone={invoice.status === "支払い済み" ? "green" : "yellow"}>
                  {invoice.status}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-text-sub">{invoice.period}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-base font-bold text-text-main">
                  {invoice.amount.toLocaleString()}円
                </span>
                <div className="flex gap-3 text-xs font-medium text-primary">
                  <button className="hover:underline">請求書</button>
                  <button className="hover:underline">領収書</button>
                </div>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      <Modal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        title="プランを解約しますか?"
        footer={
          <>
            <Button variant="outline" onClick={() => setCancelOpen(false)}>
              解約しない
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setCancelOpen(false);
                setMessage(
                  "解約手続きを受け付けました。担当者よりご連絡いたします。",
                );
              }}
            >
              解約を申請する
            </Button>
          </>
        }
      >
        <p className="text-sm leading-relaxed text-text-main">
          解約すると、口コミの自動取得・AI返信案・レポートなどすべての機能が利用できなくなります。
        </p>
        <p className="mt-2 text-xs text-text-sub">
          解約は次回請求日の前日まで受け付けています。日割りでの返金はありません。
        </p>
      </Modal>
    </div>
  );
}
