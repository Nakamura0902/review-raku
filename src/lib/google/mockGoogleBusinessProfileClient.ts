import { mockReviews } from "@/lib/mock/reviews";
import { mockStores } from "@/lib/mock/stores";
import type { Review, Store } from "@/lib/types";

export type GoogleAccount = { id: string; email: string; name: string };

export async function listAccounts(): Promise<GoogleAccount[]> {
  return [
    { id: "acc_1", email: "owner@example.com", name: "店舗オーナーアカウント" },
  ];
}

export async function listLocations(): Promise<Store[]> {
  return mockStores;
}

export async function listReviews(locationId: string): Promise<Review[]> {
  return mockReviews.filter((review) => review.storeId === locationId);
}

// 実投稿は行わず、成功レスポンスを返すだけのモック。
// 呼び出し元は必ずユーザーの「返信する」操作を経由すること。
export async function replyToReview(
  reviewId: string,
  replyText: string,
): Promise<{ success: boolean; reviewId: string; replyText: string }> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { success: true, reviewId, replyText };
}
