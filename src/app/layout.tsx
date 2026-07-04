import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "レビュ楽 | Google口コミの返信をもっと楽に",
    template: "%s | レビュ楽",
  },
  description:
    "新しい口コミを自動で読み取り、AIが返信文を作成。あとは確認して「返信する」を押すだけ。小規模店舗向けのGoogle口コミ運用支援サービスです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
