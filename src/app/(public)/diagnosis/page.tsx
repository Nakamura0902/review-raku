"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label, Select } from "@/components/ui/Input";

const industries = [
  "整体・整骨院",
  "美容室",
  "ネイルサロン",
  "パーソナルジム",
  "歯科医院",
  "カフェ・飲食店",
  "その他",
];

const concerns = [
  "口コミの数を増やしたい",
  "評価を高めたい",
  "悪い口コミを減らしたい",
  "口コミへの返信を効率化したい",
  "口コミを集客につなげたい",
  "何から始めればいいかわからない",
  "その他",
];

export default function DiagnosisPage() {
  const [submitted, setSubmitted] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);

  function toggleConcern(concern: string) {
    setChecked((prev) =>
      prev.includes(concern)
        ? prev.filter((item) => item !== concern)
        : [...prev, concern],
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-4 text-center">
        <CheckCircle2 className="h-14 w-14 text-success" />
        <h1 className="mt-6 text-2xl font-bold text-text-main">
          お申し込みありがとうございます
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-text-sub">
          無料口コミ診断のお申し込みを受け付けました。
          <br />
          担当者が内容を確認し、3営業日以内にメールでご連絡いたします。
        </p>
        <Link
          href="/"
          className="mt-8 text-sm font-medium text-primary hover:underline"
        >
          トップページへ戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 items-center justify-between border-b border-line bg-card px-6">
        <Link href="/" className="text-xl font-bold text-primary">
          レビュ楽
        </Link>
        <Link href="/" className="text-sm text-primary hover:underline">
          トップへ戻る
        </Link>
      </header>
      <main className="mx-auto max-w-xl px-4 py-10">
        <h1 className="text-2xl font-bold text-text-main">無料口コミ診断</h1>
        <p className="mt-2 text-sm leading-relaxed text-text-sub">
          現在の口コミ状況を無料で診断し、改善ポイントをレポートにしてお届けします。契約の義務はありません。
        </p>
        <Card className="mt-6">
          <CardBody>
            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <Label htmlFor="storeName">店舗名</Label>
                <Input
                  id="storeName"
                  required
                  placeholder="例: 千歳駅前整体院"
                />
              </div>
              <div>
                <Label htmlFor="industry">業種</Label>
                <Select id="industry" required defaultValue="">
                  <option value="" disabled>
                    選択してください
                  </option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="profileUrl">
                  GoogleビジネスプロフィールURL
                </Label>
                <Input
                  id="profileUrl"
                  type="url"
                  placeholder="https://maps.google.com/..."
                />
              </div>
              <div>
                <Label htmlFor="managerName">担当者名</Label>
                <Input id="managerName" required placeholder="例: 山田 太郎" />
              </div>
              <div>
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="例: info@example.com"
                />
              </div>
              <div>
                <Label>お悩み(当てはまるものすべて)</Label>
                <div className="mt-1 grid gap-2">
                  {concerns.map((concern) => (
                    <label
                      key={concern}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-line px-4 py-3 text-sm text-text-main has-checked:border-primary has-checked:bg-primary/5"
                    >
                      <input
                        type="checkbox"
                        checked={checked.includes(concern)}
                        onChange={() => toggleConcern(concern)}
                        className="h-4 w-4 accent-primary"
                      />
                      {concern}
                    </label>
                  ))}
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full">
                無料診断を申し込む
              </Button>
              <p className="text-center text-xs text-text-sub">
                送信いただいた情報は診断のご連絡のみに使用します。
              </p>
            </form>
          </CardBody>
        </Card>
      </main>
    </div>
  );
}
