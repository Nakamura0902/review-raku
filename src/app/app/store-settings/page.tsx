"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input, Label, Select, Textarea } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { currentStore } from "@/lib/mock/stores";

const industries = [
  "整体・整骨院",
  "美容室",
  "ネイルサロン",
  "パーソナルジム",
  "歯科医院",
  "カフェ・飲食店",
  "その他",
];

const tones = ["丁寧", "親しみやすい", "かっちり", "やわらかい"];

export default function StoreSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="店舗設定" />

      {saved && (
        <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-success/30 bg-success/10 px-5 py-3.5 text-sm font-medium text-text-main">
          <CheckCircle2 className="h-5 w-5 text-success" />
          設定を保存しました
        </div>
      )}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
          </CardHeader>
          <CardBody className="space-y-5">
            <div>
              <Label htmlFor="name">店舗名</Label>
              <Input id="name" defaultValue={currentStore.name} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="industry">業種</Label>
                <Select id="industry" defaultValue={currentStore.industry}>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="phone">電話番号</Label>
                <Input id="phone" defaultValue={currentStore.phone} />
              </div>
            </div>
            <div>
              <Label htmlFor="address">住所</Label>
              <Input id="address" defaultValue={currentStore.address} />
            </div>
            <div>
              <Label htmlFor="profileUrl">GoogleビジネスプロフィールURL</Label>
              <Input
                id="profileUrl"
                type="url"
                defaultValue={currentStore.googleProfileUrl}
              />
            </div>
          </CardBody>
        </Card>

        <Card className="mt-5">
          <CardHeader>
            <CardTitle>AI返信設定</CardTitle>
          </CardHeader>
          <CardBody className="space-y-5">
            <div>
              <Label htmlFor="tone">返信トーン</Label>
              <Select id="tone" defaultValue={currentStore.replyTone}>
                {tones.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="features">店舗の特徴</Label>
              <Textarea
                id="features"
                rows={3}
                defaultValue={currentStore.features}
              />
            </div>
            <div>
              <Label htmlFor="ngWords">NG表現(カンマ区切り)</Label>
              <Input id="ngWords" defaultValue={currentStore.ngWords.join(", ")} />
              <p className="mt-1 text-xs text-text-sub">
                登録した表現はAI返信案に使われません。
              </p>
            </div>
          </CardBody>
        </Card>

        <Card className="mt-5">
          <CardHeader>
            <CardTitle>Google連携</CardTitle>
            {currentStore.googleConnected ? (
              <Badge tone="green">連携中</Badge>
            ) : (
              <Badge tone="red">未連携</Badge>
            )}
          </CardHeader>
          <CardBody className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-sub">連携アカウント</span>
              <span className="font-medium text-text-main">
                owner@example.com
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-sub">連携店舗</span>
              <span className="font-medium text-text-main">
                {currentStore.name}
              </span>
            </div>
            <Button variant="outline" type="button" size="sm">
              連携を再設定する
            </Button>
          </CardBody>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            保存する
          </Button>
        </div>
      </form>
    </div>
  );
}
