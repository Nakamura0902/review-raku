"use client";

import { useMemo, useState } from "react";
import { Copy, Download, Printer, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs } from "@/components/ui/Tabs";

// 依頼文テンプレート。評価を誘導する表現(「星5をお願いします」等)は使わない。
const templates: Record<string, string[]> = {
  line: [
    "本日はご来店いただきありがとうございました。\n今後のサービス向上のため、率直なご感想をいただけますと幸いです。\nこちらから口コミをご投稿いただけます。\nhttps://g.page/example/review",
    "ご来店ありがとうございました。\nお気づきの点やご感想がございましたら、ぜひ口コミでお聞かせください。\n今後のサービス改善の参考にさせていただきます。\nhttps://g.page/example/review",
  ],
  email: [
    "本日はご来店いただき、誠にありがとうございました。\n\nサービス向上のため、ご来店時の率直なご感想をお聞かせいただけますと幸いです。\n下記リンクより口コミをご投稿いただけます。\n\nhttps://g.page/example/review\n\n今後ともよろしくお願いいたします。",
    "この度はご利用いただき、誠にありがとうございました。\n\nお客様の声を今後のサービス改善に活かしてまいりたく、ご感想をお寄せいただけますと大変ありがたく存じます。\n\n口コミ投稿はこちら:\nhttps://g.page/example/review",
  ],
  pop: [
    "ご来店ありがとうございます。\n当店では、皆さまのご感想をサービス改善に活かしています。\nよろしければ、QRコードから率直なご感想をお聞かせください。",
    "お客様の声をお聞かせください。\nQRコードを読み取ると、Google口コミの投稿ページが開きます。\nいただいたご感想は、より良いお店づくりに活用させていただきます。",
  ],
};

// QR風プレースホルダー(実装時はQRライブラリに置き換える)
function QrPlaceholder() {
  const cells = useMemo(() => {
    const size = 21;
    const grid: boolean[] = [];
    let seed = 42;
    for (let i = 0; i < size * size; i++) {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      grid.push(seed % 100 < 45);
    }
    return { size, grid };
  }, []);

  const cellPx = 8;
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={7 * cellPx} height={7 * cellPx} fill="#111827" />
      <rect x={x + cellPx} y={y + cellPx} width={5 * cellPx} height={5 * cellPx} fill="#fff" />
      <rect x={x + 2 * cellPx} y={y + 2 * cellPx} width={3 * cellPx} height={3 * cellPx} fill="#111827" />
    </g>
  );

  return (
    <svg
      viewBox={`0 0 ${cells.size * cellPx} ${cells.size * cellPx}`}
      className="h-44 w-44"
      role="img"
      aria-label="口コミ投稿ページのQRコード"
    >
      <rect width="100%" height="100%" fill="#fff" />
      {cells.grid.map((filled, index) => {
        const x = (index % cells.size) * cellPx;
        const y = Math.floor(index / cells.size) * cellPx;
        const inFinder =
          (x < 8 * cellPx && y < 8 * cellPx) ||
          (x > (cells.size - 9) * cellPx && y < 8 * cellPx) ||
          (x < 8 * cellPx && y > (cells.size - 9) * cellPx);
        if (!filled || inFinder) return null;
        return (
          <rect key={index} x={x} y={y} width={cellPx} height={cellPx} fill="#111827" />
        );
      })}
      {finder(0, 0)}
      {finder((cells.size - 7) * cellPx, 0)}
      {finder(0, (cells.size - 7) * cellPx)}
    </svg>
  );
}

export default function ReviewRequestPage() {
  const [usage, setUsage] = useState("line");
  const [variant, setVariant] = useState(0);
  const [copied, setCopied] = useState(false);

  const list = templates[usage];
  const text = list[variant % list.length];

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <PageHeader
        title="口コミ依頼QR・依頼文"
        description="お客様に口コミ投稿をお願いするためのQRコードと依頼文を作成できます。"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>QRコード</CardTitle>
          </CardHeader>
          <CardBody className="flex flex-col items-center">
            <div className="rounded-xl border border-line p-4">
              <QrPlaceholder />
            </div>
            <p className="mt-3 text-xs text-text-sub">
              読み取ると口コミ投稿ページが開きます
            </p>
            <div className="mt-5 flex w-full flex-col gap-3 sm:flex-row">
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4" />
                QRをダウンロード
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                <Printer className="h-4 w-4" />
                印刷用POPを作成
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>依頼文テンプレート</CardTitle>
          </CardHeader>
          <CardBody>
            <Tabs
              items={[
                { value: "line", label: "LINE" },
                { value: "email", label: "メール" },
                { value: "pop", label: "店頭案内" },
              ]}
              value={usage}
              onChange={(value) => {
                setUsage(value);
                setVariant(0);
              }}
            />
            <p className="mt-4 min-h-40 rounded-lg bg-background px-4 py-3.5 text-sm leading-relaxed whitespace-pre-wrap text-text-main">
              {text}
            </p>
            <div className="mt-4 flex gap-3">
              <Button onClick={copy} className="flex-1">
                <Copy className="h-4 w-4" />
                {copied ? "コピーしました" : "コピーする"}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setVariant((prev) => prev + 1)}
              >
                <RefreshCw className="h-4 w-4" />
                再生成する
              </Button>
            </div>
            <p className="mt-3 text-xs text-text-sub">
              評価をお願いする表現は使わず、率直な感想を依頼する文面にしています。
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
