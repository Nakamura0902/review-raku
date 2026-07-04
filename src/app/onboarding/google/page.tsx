"use client";

import { useRouter } from "next/navigation";
import {
  Bell,
  CloudDownload,
  Link2,
  MessageSquareText,
  MousePointerClick,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

const benefits = [
  { icon: CloudDownload, label: "口コミ自動取得" },
  { icon: MessageSquareText, label: "AI返信案" },
  { icon: MousePointerClick, label: "ワンクリック返信" },
  { icon: Bell, label: "未返信管理" },
];

export default function OnboardingGooglePage() {
  const router = useRouter();

  return (
    <div>
      <p className="text-sm font-medium text-text-sub">ステップ 1 / 3</p>
      <h1 className="mt-1 text-2xl font-bold text-text-main">
        Googleビジネスプロフィール連携
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-text-sub">
        Googleビジネスプロフィールと連携すると、口コミを自動で取得し、AI返信案の作成やワンクリック返信が利用できます。
      </p>
      <Card className="mt-6">
        <CardBody className="p-8">
          <div className="flex items-center justify-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Link2 className="h-6 w-6 text-primary" />
            </div>
          </div>
          <p className="mt-5 text-center text-sm font-semibold text-text-main">
            連携するとできること
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.label}
                className="flex items-center gap-2.5 rounded-lg bg-background px-4 py-3 text-sm font-medium text-text-main"
              >
                <benefit.icon className="h-4 w-4 shrink-0 text-primary" />
                {benefit.label}
              </div>
            ))}
          </div>
          <Button
            size="lg"
            className="mt-7 w-full"
            onClick={() => router.push("/onboarding/stores")}
          >
            Googleと連携する
          </Button>
          <p className="mt-3 text-center text-xs text-text-sub">
            連携はいつでも解除できます。口コミへの返信は必ずご自身の確認後に行われます。
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
