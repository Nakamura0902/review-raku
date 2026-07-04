# レビュ楽

小規模店舗向けの Google 口コミ運用支援 Web アプリ。
新しい口コミを自動で読み取り、AI が返信案を作成。店舗側は内容を確認して「返信する」を押すだけで返信が完了します。

現在はモックデータで動作する「8割完成版」です。外部 API(Google Business Profile / AI / Stripe)は未接続でも全画面が動作します。

## 起動方法

```bash
npm install
npm run dev
```

http://localhost:3000 で起動します。

## 主なページ

| URL | 内容 |
| --- | --- |
| `/` | LPトップ |
| `/diagnosis` | 無料口コミ診断フォーム |
| `/login` / `/signup` | ログイン / 新規登録(モック認証) |
| `/onboarding/google` → `/onboarding/stores` → `/onboarding/settings` | 初期設定フロー |
| `/app/dashboard` | ダッシュボード |
| `/app/reviews` / `/app/reviews/[id]` | 口コミ一覧 / 返信詳細(AI返信案・再生成・返信モーダル) |
| `/app/reply-history` | 返信履歴 |
| `/app/reports` | 週次・月次レポート |
| `/app/review-request` | 口コミ依頼QR・依頼文 |
| `/app/store-settings` / `/app/notifications` / `/app/billing` | 各種設定・請求 |
| `/admin` 以下 | 管理者画面(診断申し込み・契約店舗) |

## コマンド

```bash
npm run dev     # 開発サーバー
npm run build   # 本番ビルド
npm run lint    # ESLint
```

## 外部連携

`.env.example` を `.env.local` にコピーして設定します。キー未設定時は自動的にモックで動作します。

- `src/lib/google/` — Google Business Profile API(モック: `mockGoogleBusinessProfileClient.ts`)
- `src/lib/ai/` — AI返信生成(モック: `mockGenerateReviewReply.ts`)
- `src/lib/billing/` — Stripe(モック: `mockBillingClient.ts`)

## 開発ルール

詳細は [CLAUDE.md](./CLAUDE.md) を参照してください。
特に「AIによる自動返信投稿の禁止(必ずユーザー確認後に投稿)」「UIに絵文字を使わない」「評価誘導表現の禁止」は必ず守ること。
