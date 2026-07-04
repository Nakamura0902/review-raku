"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Input";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.9-.1-1.5-.3-2.3H12v4.5h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.6 2.8c2.2-2 3.8-5 3.8-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.6-2.8c-1 .7-2.4 1.2-4.3 1.2-3.3 0-6-2.2-7-5.1l-3.8 2.9C3.2 21.2 7.3 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4L1.2 6.7C.4 8.3 0 10.1 0 12s.4 3.7 1.2 5.3L5 14.4z"
      />
      <path
        fill="#EA4335"
        d="M12 4.7c1.8 0 3.1.8 3.8 1.5l3.2-3.1C17 1.2 15.2 0 12 0 7.3 0 3.2 2.8 1.2 6.7L5 9.6c1-2.9 3.7-4.9 7-4.9z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardBody className="p-8">
          <p className="text-center text-3xl font-bold text-primary">
            レビュ楽
          </p>
          <h1 className="mt-4 text-center text-xl font-bold text-text-main">
            ログイン
          </h1>
          <form
            className="mt-6 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              router.push("/app/dashboard");
            }}
          >
            <div>
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="メールアドレスを入力してください"
              />
            </div>
            <div>
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                placeholder="パスワードを入力してください"
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              ログイン
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
            onClick={() => router.push("/app/dashboard")}
          >
            <GoogleIcon />
            Googleでログイン
          </Button>
          <p className="mt-5 text-center">
            <Link
              href="#"
              className="text-sm font-medium text-primary hover:underline"
            >
              パスワードを忘れた方
            </Link>
          </p>
        </CardBody>
      </Card>
      <p className="mt-5 text-center text-sm text-text-sub">
        アカウントをお持ちでない方は
        <Link
          href="/signup"
          className="font-medium text-primary hover:underline"
        >
          こちら
        </Link>
      </p>
    </div>
  );
}
