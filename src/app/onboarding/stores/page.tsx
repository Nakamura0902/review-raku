"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RatingStars } from "@/components/features/RatingStars";
import { cn } from "@/lib/cn";
import { mockStores } from "@/lib/mock/stores";

export default function OnboardingStoresPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>(mockStores[0].id);

  return (
    <div>
      <p className="text-sm font-medium text-text-sub">ステップ 2 / 3</p>
      <h1 className="mt-1 text-2xl font-bold text-text-main">店舗を選択</h1>
      <p className="mt-3 text-sm leading-relaxed text-text-sub">
        Googleアカウントに紐づく店舗が見つかりました。レビュ楽で管理する店舗を選択してください。
      </p>
      <div className="mt-6 space-y-3">
        {mockStores.map((store) => (
          <button
            key={store.id}
            onClick={() => setSelectedId(store.id)}
            className={cn(
              "w-full rounded-xl border bg-card p-5 text-left shadow-sm transition-colors",
              selectedId === store.id
                ? "border-primary ring-2 ring-primary/20"
                : "border-line hover:border-primary/40",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-text-main">
                  {store.name}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-text-sub">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {store.address}
                </p>
              </div>
              <span
                className={cn(
                  "mt-1 h-4 w-4 shrink-0 rounded-full border-2",
                  selectedId === store.id
                    ? "border-primary bg-primary"
                    : "border-gray-300",
                )}
              />
            </div>
            <div className="mt-3 flex items-center gap-4 text-sm text-text-main">
              <span className="flex items-center gap-1.5">
                <RatingStars rating={Math.round(store.averageRating)} size="sm" />
                <span className="font-semibold">{store.averageRating}</span>
              </span>
              <span className="text-text-sub">
                口コミ {store.reviewCount}件
              </span>
            </div>
          </button>
        ))}
      </div>
      <Button
        size="lg"
        className="mt-7 w-full"
        onClick={() => router.push("/onboarding/settings")}
      >
        この店舗で始める
      </Button>
    </div>
  );
}
