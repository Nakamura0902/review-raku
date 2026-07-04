import Link from "next/link";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center border-b border-line bg-card px-6">
        <Link href="/" className="text-xl font-bold text-primary">
          レビュ楽
        </Link>
        <span className="ml-4 text-sm text-text-sub">初期設定</span>
      </header>
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
        {children}
      </main>
    </div>
  );
}
