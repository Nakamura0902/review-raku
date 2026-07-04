import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  CloudDownload,
  FileText,
  MessageSquareText,
  MousePointerClick,
  Play,
  QrCode,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

const problems = [
  "口コミを毎日確認できていない",
  "返信文を考えるのが面倒",
  "低評価口コミへの対応が不安",
  "未返信口コミがそのままになっている",
  "口コミを店舗改善に活かせていない",
];

const features = [
  {
    icon: CloudDownload,
    title: "口コミ自動取得",
    description:
      "Googleビジネスプロフィールの新しい口コミを自動で取得。見逃しを防ぎます。",
  },
  {
    icon: MessageSquareText,
    title: "AI返信案",
    description:
      "口コミの内容を分析し、AIが最適な返信文案を自動で作成。丁寧で自然な文章を提案します。",
  },
  {
    icon: MousePointerClick,
    title: "ワンクリック返信",
    description:
      "内容を確認して「返信する」をクリックするだけ。すぐに公開まで完了します。",
  },
  {
    icon: Bell,
    title: "低評価アラート",
    description:
      "低評価の口コミを即時に通知。早期対応で悪化を防ぎ、信頼を守ります。",
  },
  {
    icon: FileText,
    title: "週次レポート",
    description:
      "口コミ数・評価・返信状況を毎週レポート。店舗改善のヒントが分かります。",
  },
  {
    icon: QrCode,
    title: "QR・依頼文作成",
    description:
      "口コミ依頼用のQRコードと依頼文をワンクリックで作成。店頭やLINEで使えます。",
  },
];

const planFeatures = [
  "口コミ自動取得(無制限)",
  "AI返信案の自動生成(無制限)",
  "ワンクリック返信",
  "低評価アラート(即時通知)",
  "返信履歴の管理",
  "レポート・分析ダッシュボード",
  "QR・依頼文の作成・印刷",
  "メール・チャットサポート",
];

const faqs = [
  {
    question: "自動で勝手に返信されますか?",
    answer:
      "いいえ。AIはあくまで返信文の「案」を作成するだけです。必ず店舗様が内容を確認し、「返信する」ボタンを押したときにのみ投稿されます。勝手に投稿されることは一切ありません。",
  },
  {
    question: "Google口コミの規約は大丈夫ですか?",
    answer:
      "はい。レビュ楽は口コミへの返信業務を効率化するツールであり、評価の操作や口コミの削除・誘導を行うものではありません。Googleのポリシーに沿った運用をサポートします。",
  },
  {
    question: "どんな店舗に向いていますか?",
    answer:
      "整体院・美容室・サロン・ジム・歯科医院・飲食店など、Google口コミが集客に影響する小規模店舗に向いています。1店舗からご利用いただけます。",
  },
  {
    question: "無料診断では何が分かりますか?",
    answer:
      "現在の口コミ数・平均評価・未返信の状況などを診断し、口コミ運用の改善ポイントをレポートにしてお渡しします。診断は無料で、契約の義務はありません。",
  },
];

function LpHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-card/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-6">
        <Link href="/" className="text-xl font-bold text-primary">
          レビュ楽
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-text-main md:flex">
          <a href="#features" className="hover:text-primary">
            機能
          </a>
          <a href="#pricing" className="hover:text-primary">
            料金プラン
          </a>
          <a href="#problems" className="hover:text-primary">
            導入事例
          </a>
          <a href="#faq" className="hover:text-primary">
            よくある質問
          </a>
          <Link href="/login" className="hover:text-primary">
            ログイン
          </Link>
        </nav>
        <Link
          href="/diagnosis"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          無料で始める
        </Link>
      </div>
    </header>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-card">
      <LpHeader />

      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6 lg:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl leading-snug font-bold text-text-main lg:text-5xl lg:leading-tight">
              Google口コミの返信、
              <br />
              もう毎回考えなくていい。
            </h1>
            <p className="mt-5 text-base leading-relaxed text-text-sub lg:text-lg">
              新しい口コミを自動で読み取り、AIが返信文を作成。
              <br className="hidden sm:block" />
              あとは確認して「返信する」を押すだけ。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/diagnosis"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-semibold text-white hover:bg-primary-dark"
              >
                無料診断を申し込む
              </Link>
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-primary px-8 text-base font-semibold text-primary hover:bg-primary/5"
              >
                <Play className="h-4 w-4" />
                デモを見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 課題 */}
      <section id="problems" className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
        <h2 className="text-center text-2xl font-bold text-text-main">
          こんなお悩みはありませんか?
        </h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-3">
          {problems.map((problem) => (
            <div
              key={problem}
              className="flex items-center gap-3 rounded-xl border border-line bg-background px-5 py-4 text-sm font-medium text-text-main"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
              {problem}
            </div>
          ))}
        </div>
      </section>

      {/* 機能 */}
      <section id="features" className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
          <h2 className="text-center text-2xl font-bold text-text-main">
            レビュ楽の機能
          </h2>
          <p className="mt-2 text-center text-sm text-text-sub">
            口コミ運用に必要な機能を、これひとつで。
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-text-main">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-sub">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 料金 */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
        <h2 className="text-center text-2xl font-bold text-text-main">
          料金プラン
        </h2>
        <Card className="mx-auto mt-8 max-w-4xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="border-b border-line p-8 lg:border-r lg:border-b-0">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                初期キャンペーン実施中
              </span>
              <h3 className="mt-4 text-lg font-bold text-primary">
                Standardプラン
              </h3>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-sm font-medium text-text-main">月額</span>
                <span className="text-5xl font-bold text-primary">14,800</span>
                <span className="text-sm font-medium text-text-main">
                  円(税込)
                </span>
              </div>
              <p className="mt-2 text-sm text-text-sub">
                初期設定費 19,800円(税込)
              </p>
              <p className="mt-1 text-xs text-text-sub">
                すべての基本機能を利用できるスタンダードプランです。
              </p>
            </div>
            <div className="p-8">
              <p className="text-sm font-semibold text-text-main">
                プランに含まれる機能
              </p>
              <ul className="mt-4 grid gap-2.5">
                {planFeatures.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-text-main"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
          <h2 className="text-center text-2xl font-bold text-text-main">
            よくある質問
          </h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.question} className="p-6">
                <h3 className="text-sm font-semibold text-text-main">
                  Q. {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-sub">
                  A. {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center lg:px-6 lg:py-20">
        <h2 className="text-2xl font-bold text-text-main lg:text-3xl">
          口コミ運用、今日から楽になります。
        </h2>
        <p className="mt-3 text-sm text-text-sub">
          まずは無料診断で、いまの口コミ状況をチェックしませんか。
        </p>
        <Link
          href="/diagnosis"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-primary px-10 text-base font-semibold text-white hover:bg-primary-dark"
        >
          無料診断を申し込む
        </Link>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-xs text-text-sub lg:px-6">
          <span>© 2024 レビュ楽 - レビュー業務をもっと楽に。</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary">
              利用規約
            </Link>
            <Link href="#" className="hover:text-primary">
              プライバシーポリシー
            </Link>
            <Link href="/admin" className="hover:text-primary">
              運営会社
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
