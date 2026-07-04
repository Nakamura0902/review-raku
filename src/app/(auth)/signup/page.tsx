"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Input";

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardBody className="p-8">
          <p className="text-center text-3xl font-bold text-primary">
            レビュ楽
          </p>
          <h1 className="mt-4 text-center text-xl font-bold text-text-main">
            新規登録
          </h1>
          <form
            className="mt-6 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              router.push("/onboarding/google");
            }}
          >
            <div>
              <Label htmlFor="name">お名前</Label>
              <Input id="name" required placeholder="例: 山田 太郎" />
            </div>
            <div>
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="メールアドレスを入力してください"
              />
            </div>
            <div>
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="8文字以上で入力してください"
              />
            </div>
            <div>
              <Label htmlFor="passwordConfirm">パスワード(確認)</Label>
              <Input
                id="passwordConfirm"
                type="password"
                required
                placeholder="もう一度入力してください"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-text-main">
              <input type="checkbox" required className="h-4 w-4 accent-primary" />
              <span>
                <Link href="#" className="text-primary hover:underline">
                  利用規約
                </Link>
                に同意する
              </span>
            </label>
            <label className="flex items-center gap-2 text-sm text-text-main">
              <input type="checkbox" required className="h-4 w-4 accent-primary" />
              <span>
                <Link href="#" className="text-primary hover:underline">
                  プライバシーポリシー
                </Link>
                に同意する
              </span>
            </label>
            <Button type="submit" size="lg" className="w-full">
              アカウントを作成する
            </Button>
          </form>
          <div className="my-5 flex items-center gap-3 text-xs text-text-sub">
            <span className="h-px flex-1 bg-line" />
            または
            <span className="h-px flex-1 bg-line" />
          </div>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => router.push("/onboarding/google")}
          >
            Googleで登録する
          </Button>
        </CardBody>
      </Card>
      <p className="mt-5 text-center text-sm text-text-sub">
        すでにアカウントをお持ちの方は
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          ログイン
        </Link>
      </p>
    </div>
  );
}
