import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold text-primary">
          レビュ楽
        </Link>
        <Link href="/" className="text-sm text-primary hover:underline">
          トップへ戻る
        </Link>
      </header>
      <main className="flex flex-1 items-start justify-center px-4 py-8 sm:items-center">
        {children}
      </main>
      <footer className="flex flex-wrap items-center justify-center gap-4 px-4 py-6 text-xs text-text-sub">
        <span>© 2024 レビュ楽 - レビュー業務をもっと楽に。</span>
        <span className="space-x-4">
          <Link href="#" className="text-primary hover:underline">
            利用規約
          </Link>
          <Link href="#" className="text-primary hover:underline">
            プライバシーポリシー
          </Link>
        </span>
      </footer>
    </div>
  );
}
