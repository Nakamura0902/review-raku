"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Tabs } from "@/components/ui/Tabs";

const weekly = {
  period: "2024/05/13 - 2024/05/19",
  kpis: [
    { label: "口コミ数", value: "6", unit: "件", note: "前週比 +2件", noteTone: "up" as const },
    { label: "平均評価", value: "4.6", note: "前週比 +0.2", noteTone: "up" as const },
    { label: "未返信", value: "5", unit: "件", note: "前週比 -1件", noteTone: "up" as const },
    { label: "低評価", value: "2", unit: "件", note: "前週比 +1件", noteTone: "down" as const },
  ],
  chart: [
    { label: "月", count: 1 },
    { label: "火", count: 2 },
    { label: "水", count: 0 },
    { label: "木", count: 1 },
    { label: "金", count: 1 },
    { label: "土", count: 1 },
    { label: "日", count: 0 },
  ],
  good: [
    "平均評価が前週より +0.2 向上しました",
    "ポジティブな口コミが増加しました",
    "返信率が改善傾向にあります",
  ],
  bad: [
    "未返信口コミが 5件あります",
    "低評価(星2以下)の口コミが 2件あります",
    "週末の口コミ数が少なくなっています",
  ],
  next: [
    "未返信口コミ 5件に返信する",
    "低評価口コミ 2件を確認する",
    "新しい口コミ依頼を配布する",
  ],
};

const monthly = {
  period: "2024/05/01 - 2024/05/31",
  kpis: [
    { label: "口コミ数", value: "24", unit: "件", note: "前月比 +3件", noteTone: "up" as const },
    { label: "平均評価", value: "4.6", note: "前月比 +0.1", noteTone: "up" as const },
    { label: "未返信", value: "7", unit: "件", note: "前月比 -2件", noteTone: "up" as const },
    { label: "低評価", value: "3", unit: "件", note: "前月比 ±0件", noteTone: "neutral" as const },
  ],
  chart: [
    { label: "第1週", count: 5 },
    { label: "第2週", count: 7 },
    { label: "第3週", count: 6 },
    { label: "第4週", count: 6 },
  ],
  good: [
    "口コミ数が3か月連続で増加しています",
    "「接客」カテゴリの高評価が増えました",
    "返信率が 70% から 78% に改善しました",
  ],
  bad: [
    "「待ち時間」に関する指摘が 3件ありました",
    "未返信のまま1週間経過した口コミがあります",
  ],
  next: [
    "待ち時間改善の取り組みを店頭で告知する",
    "未返信口コミをゼロにする",
    "QRコードの設置場所を増やす",
  ],
};

export default function ReportsPage() {
  const [tab, setTab] = useState("weekly");
  const report = tab === "weekly" ? weekly : monthly;
  const maxCount = Math.max(...report.chart.map((c) => c.count), 1);

  return (
    <div>
      <PageHeader
        title="レポート"
        description={`対象期間: ${report.period}`}
        actions={
          <>
            <Button variant="outline" onClick={() => window.print()}>
              <Download className="h-4 w-4" />
              PDFでダウンロード
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4" />
              メールで送る
            </Button>
          </>
        }
      />

      <Tabs
        items={[
          { value: "weekly", label: "週次" },
          { value: "monthly", label: "月次" },
        ]}
        value={tab}
        onChange={setTab}
        className="mb-6"
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {report.kpis.map((kpi) => (
          <StatCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>口コミ推移</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex h-44 items-end gap-4">
              {report.chart.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <span className="text-xs text-text-sub">{item.count}</span>
                  <div
                    className="w-full max-w-12 rounded-t-md bg-primary"
                    style={{
                      height: `${(item.count / maxCount) * 110 + 4}px`,
                    }}
                  />
                  <span className="text-xs text-text-sub">{item.label}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>来週やること</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3">
            {report.next.map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg bg-background px-4 py-3 text-sm text-text-main"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {index + 1}
                </span>
                {item}
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>良かった点</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3">
            {report.good.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm text-text-main">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                {item}
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>改善点</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3">
            {report.bad.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm text-text-main">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                {item}
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
