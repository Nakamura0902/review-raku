"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label, Textarea } from "@/components/ui/Input";
import { cn } from "@/lib/cn";

const tones = ["丁寧", "親しみやすい", "かっちり", "やわらかい"];

export default function OnboardingSettingsPage() {
  const router = useRouter();
  const [tone, setTone] = useState("丁寧");

  return (
    <div>
      <p className="text-sm font-medium text-text-sub">ステップ 3 / 3</p>
      <h1 className="mt-1 text-2xl font-bold text-text-main">初期設定</h1>
      <p className="mt-3 text-sm leading-relaxed text-text-sub">
        AIが返信案を作成するときに使う情報です。あとから店舗設定でいつでも変更できます。
      </p>
      <Card className="mt-6">
        <CardBody>
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              router.push("/app/dashboard");
            }}
          >
            <div>
              <Label htmlFor="features">店舗の特徴</Label>
              <Textarea
                id="features"
                rows={3}
                placeholder="例: 駅徒歩1分の整体院。肩こり・腰痛の根本改善が得意で、国家資格保有スタッフが施術します。"
              />
            </div>
            <div>
              <Label>返信トーン</Label>
              <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {tones.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTone(item)}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                      tone === item
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-line text-text-sub hover:border-primary/40",
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="ngWords">NG表現(カンマ区切り)</Label>
              <Input
                id="ngWords"
                placeholder="例: 完治, 必ず治る, 絶対"
              />
              <p className="mt-1 text-xs text-text-sub">
                返信文に使ってほしくない表現を登録できます。
              </p>
            </div>
            <div>
              <Label htmlFor="notifyEmail">通知先メール</Label>
              <Input
                id="notifyEmail"
                type="email"
                placeholder="例: info@example.com"
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              設定を保存して始める
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
