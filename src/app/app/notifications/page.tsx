"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input, Label, Select } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Toggle } from "@/components/ui/Toggle";

const notificationItems = [
  {
    key: "newReview",
    label: "新しい口コミ通知",
    description: "新しい口コミが投稿されたときに通知します。",
  },
  {
    key: "lowRating",
    label: "低評価口コミ通知",
    description: "星2以下の口コミが投稿されたときに即時通知します。",
  },
  {
    key: "unreplied",
    label: "未返信アラート",
    description: "未返信の口コミが3日以上残っているときに通知します。",
  },
  {
    key: "weeklyReport",
    label: "週次レポート",
    description: "毎週月曜日に先週のレポートをお届けします。",
  },
  {
    key: "line",
    label: "LINE通知",
    description: "メールに加えてLINEでも通知を受け取ります。",
  },
];

export default function NotificationsPage() {
  const [settings, setSettings] = useState<Record<string, boolean>>({
    newReview: true,
    lowRating: true,
    unreplied: true,
    weeklyReport: true,
    line: false,
  });
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="通知設定" />

      {saved && (
        <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-success/30 bg-success/10 px-5 py-3.5 text-sm font-medium text-text-main">
          <CheckCircle2 className="h-5 w-5 text-success" />
          通知設定を保存しました
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>通知項目</CardTitle>
        </CardHeader>
        <CardBody className="divide-y divide-line">
          {notificationItems.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-text-main">
                  {item.label}
                </p>
                <p className="mt-0.5 text-xs text-text-sub">
                  {item.description}
                </p>
              </div>
              <Toggle
                checked={settings[item.key]}
                onChange={(checked) =>
                  setSettings((prev) => ({ ...prev, [item.key]: checked }))
                }
                label={item.label}
              />
            </div>
          ))}
        </CardBody>
      </Card>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>通知先</CardTitle>
        </CardHeader>
        <CardBody className="space-y-5">
          <div>
            <Label htmlFor="email">通知先メール</Label>
            <Input id="email" type="email" defaultValue="owner@example.com" />
          </div>
          <div>
            <Label htmlFor="frequency">通知頻度</Label>
            <Select id="frequency" defaultValue="realtime">
              <option value="realtime">即時(推奨)</option>
              <option value="daily">1日1回まとめて</option>
              <option value="weekly">週1回まとめて</option>
            </Select>
          </div>
        </CardBody>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button
          size="lg"
          className="w-full sm:w-auto"
          onClick={() => {
            setSaved(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          保存する
        </Button>
      </div>
    </div>
  );
}
