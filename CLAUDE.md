# レビュ楽 開発ルール

## サービス概要

小規模店舗向けの Google 口コミ運用支援 Web アプリ「レビュ楽」。
新しい口コミを自動で読み取り、AI が返信案を作成し、店舗側は内容を確認して「返信する」ボタンを押すだけで Google 口コミへの返信が完了する体験を提供する。

初期ターゲットは整体・整骨院、美容室、ネイルサロン、パーソナルジム、歯科医院、カフェ・飲食店などの小規模店舗。ただし UI 文言は「小規模店舗向け」として汎用的にする。

## コア体験

```
口コミが来る
↓ アプリが自動で読み取る
↓ AIが返信案を作成する
↓ 店舗側が確認する
↓ 必要なら編集・再生成する
↓ 「返信する」を押す
↓ Google口コミに返信完了
```

AI は返信案を「提案」するだけ。投稿は必ず人間が確認してから行う。

## 実装方針

- まずは見た目と操作体験が完成している「8割完成版」を目指す
- データはモックデータ + TypeScript の型で実装する(将来 Supabase/PostgreSQL へ移行しやすい構成)
- 外部 API キーがなくても全画面・全操作が動くようにモック実装を用意する
- 状態管理は React 標準(useState / useContext)で行う
- 可読性・修正しやすさを最優先にしたシンプルなコードを書く
- 不明点があっても実装を止めず、合理的な仮定を置いて進める

## 使用技術

- Next.js 16 (App Router / `src/` ディレクトリ構成)
- TypeScript (strict)
- Tailwind CSS v4 (`@import "tailwindcss"` + `@theme` でトークン定義)
- React 19
- lucide-react(アイコン)
- ESLint (eslint-config-next)

Next.js 16 の注意点: `params` / `searchParams` は Promise。`const { id } = await params` の形で受け取る。

## 画面一覧

公開ページ:
- `/` — LPトップ
- `/diagnosis` — 無料口コミ診断フォーム

認証:
- `/login` — ログイン(モック: ボタンで `/app/dashboard` へ)
- `/signup` — 新規登録(ボタンで `/onboarding/google` へ)

オンボーディング:
- `/onboarding/google` — Google連携(モック)
- `/onboarding/stores` — 店舗選択
- `/onboarding/settings` — 初期設定

アプリ本体:
- `/app/dashboard` — ダッシュボード(KPI・要対応口コミ・低評価アラート・今週やること・口コミ推移)
- `/app/reviews` — 口コミ一覧(フィルター付き)
- `/app/reviews/[id]` — 口コミ返信詳細(AI返信案・再生成・編集・返信モーダル)
- `/app/reply-history` — 返信履歴
- `/app/reports` — レポート(週次/月次)
- `/app/review-request` — 口コミ依頼QR・依頼文
- `/app/store-settings` — 店舗設定
- `/app/notifications` — 通知設定
- `/app/billing` — 請求・プラン

管理者:
- `/admin` — 管理者ダッシュボード
- `/admin/diagnoses` — 無料診断申し込み一覧
- `/admin/stores` — 契約店舗一覧
- `/admin/stores/[id]` — 店舗詳細

## ルーティング設計

- ルートグループでレイアウトを分ける:
  - `src/app/(public)/` — PublicLayout(LP・診断)
  - `src/app/(auth)/` — AuthLayout(ログイン・登録)
  - `src/app/onboarding/` — OnboardingLayout
  - `src/app/app/` — AppLayout(サイドバー + トップバー + モバイル下部タブ)
  - `src/app/admin/` — AdminLayout
- 口コミデータの状態(返信済みへの変更など)はクライアント側 Context(`ReviewsProvider`)で共有する

## コンポーネント設計

- `src/components/ui/` — Button, Card, Badge, Input, Textarea, Select, Toggle, Tabs, Modal, StatCard, PageHeader, SectionHeader, EmptyState
- `src/components/layout/` — Sidebar, Topbar, MobileBottomNav, AdminSidebar
- `src/components/features/` — RatingStars, ReviewStatusBadge, RiskBadge, ReviewCard, ReviewReplyEditor, DiagnosisForm など
- コンポーネントは小さく保ち、ページ固有のロジックはページ側に置く

## データモデル

`src/lib/types.ts` に集約する。主要な型:

- `ReviewStatus = "未返信" | "返信済み" | "要確認" | "AI生成中" | "投稿失敗"`
- `RiskLevel = "low" | "medium" | "high"`
- `Store` / `Review` / `DiagnosisLead` / `Subscription`

モックデータは `src/lib/mock/` に置く(stores, reviews, leads, invoices, reports)。

## 外部連携方針

サービス層をインターフェースで分離し、環境変数の有無で実装を切り替える:

```
src/lib/google/   — Google Business Profile API
src/lib/ai/       — AI返信生成
src/lib/billing/  — Stripe
src/lib/mock/     — モックデータ
```

- API キー未設定時 or `USE_MOCK_* === "true"` のときは必ずモッククライアントを使う
- 実クライアントは現時点ではスタブ(未実装エラーではなく、モックへフォールバック)
- `.env.example` に必要な環境変数をすべて記載する

## Google Business Profile API方針

- `src/lib/google/googleBusinessProfileClient.ts`(実装スタブ)と `mockGoogleBusinessProfileClient.ts`(モック)
- 関数: `listAccounts()` / `listLocations()` / `listReviews(locationId)` / `replyToReview(reviewId, replyText)`
- `process.env.USE_MOCK_GOOGLE === "true"` または API キー未設定時はモックを使う
- **AI が勝手に Google 口コミへ返信投稿する設計は禁止。** `replyToReview` は必ずユーザーの「返信する」ボタン操作からのみ呼ばれる

## AI返信生成方針

- `src/lib/ai/generateReviewReply.ts`(切り替え口)と `mockGenerateReviewReply.ts`(モック)
- モックは複数パターンの返信文を持ち、「再生成」で別パターンを返す

返信文ルール:
- 150〜300文字程度
- 感謝を入れる / 口コミ内容に触れる
- 低評価には謝罪と改善姿勢を入れる
- 口コミ本文にない内容を勝手に足さない
- 医療・整体系では効果を断定しない(「必ず治る」「完治する」「絶対改善する」は禁止)
- 個人情報に触れない / 反論しない / 絵文字は使わない

## Stripe請求方針

- `src/lib/billing/stripeClient.ts`(実装スタブ)と `mockBillingClient.ts`(モック)
- 将来対応: Checkout Session 作成 / Customer Portal / サブスクリプション取得 / 請求履歴取得 / Webhook
- API キー未設定時はモックで動作する

## UIデザインルール

ui-mock/ 配下のモックアップ画像に準拠する。

カラートークン(globals.css の `@theme` に定義):

```
Primary Blue:      #0066E6
Primary Blue Dark: #004FB8
Background:        #F7F9FC
Card:              #FFFFFF
Text Main:         #111827
Text Sub:          #6B7280
Border:            #E5E7EB
Danger:            #DC2626
Warning:           #F59E0B
Success:           #16A34A
```

- 白ベース + 青アクセント、薄いグレー背景、角丸カード、控えめなシャドウ
- B2B SaaS らしい清潔感。過度にポップにしない
- 余白を広めに取る
- 主要 CTA は青、危険操作は赤、ステータスはバッジ表示
- 口コミ返信の主ボタンは「返信する」、口コミ一覧の主ボタンは「確認して返信」
- テキストはすべて日本語
- **UI 内で絵文字は一切使わない**
- アイコンは lucide-react のシンプルな線アイコン

## レスポンシブ対応ルール

PC(`lg` 以上):
- 左サイドバー固定 + 上部ヘッダー
- メインコンテンツは最大幅を取りすぎない(`max-w-6xl` 程度)
- 一覧はテーブル表示を基本にする

スマホ:
- サイドバー非表示、下部タブバー(MobileBottomNav)表示
- テーブルはカードリストへ変換(`lg:hidden` / `hidden lg:block` で切り替え)
- 主要操作は画面下部に近く配置
- 口コミ返信画面はスマホで完結できるようにする

## 禁止事項

- UI に絵文字を使うこと
- 口コミ操作・評価操作に見える文言(「星5を増やします」「悪い口コミを消します」「低評価を防ぎます」等)
- 口コミ依頼文で「星5をお願いします」などの評価誘導表現
- AI による完全自動返信投稿(必ずユーザー確認 → 「返信する」ボタンで投稿)
- API キーをコードに直書きすること
- 画面だけで動作がない状態にすること(ボタン・トグル・フィルターはモックでも動かす)
- PC だけ対応でスマホを崩すこと
- 既存ファイル(ui-mock/, icon/)を不用意に破壊すること
- 不明点を理由に実装を止めること

## 実装順序

1. Phase 0: プロジェクト確認・CLAUDE.md 作成(完了)
2. Phase 1: セットアップ・デザイントークン・型定義・モックデータ
3. Phase 2: 公開ページ・認証・オンボーディング
4. Phase 3: アプリ本体レイアウト・ダッシュボード・口コミ一覧・返信詳細
5. Phase 4: レポート・QR依頼文・店舗設定・通知設定・請求
6. Phase 5: 管理者画面
7. Phase 6: 外部連携サービス層・`.env.example`
8. Phase 7: レスポンシブ調整・ビルド確認・README

## 開発コマンド

```bash
npm run dev     # 開発サーバー起動 (http://localhost:3000)
npm run build   # 本番ビルド
npm run lint    # ESLint
```

## 完了条件

- `npm run dev` で起動でき、`npm run build` が通る
- PC とスマホで主要画面が崩れない
- すべての主要ページへ遷移できる(ログイン→ダッシュボード、登録→オンボーディング→ダッシュボード)
- 口コミ一覧→返信詳細→AI返信案の編集・再生成→確認モーダル→返信済み化が動く
- 通知設定のトグルが操作できる
- 請求画面・管理者画面が表示できる
- `.env.example` / `CLAUDE.md` / `README.md`(起動方法付き)がある
