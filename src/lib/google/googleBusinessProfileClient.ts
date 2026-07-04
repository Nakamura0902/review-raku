// Google Business Profile API クライアント。
// 実APIの認証情報が未設定、または USE_MOCK_GOOGLE=true の間はモックへフォールバックする。
// 返信投稿(replyToReview)は必ずユーザーの「返信する」操作からのみ呼び出すこと。
import * as mock from "@/lib/google/mockGoogleBusinessProfileClient";
import type { Review, Store } from "@/lib/types";

function shouldUseMock(): boolean {
  return (
    process.env.USE_MOCK_GOOGLE === "true" || !process.env.GOOGLE_CLIENT_ID
  );
}

export async function listAccounts(): Promise<mock.GoogleAccount[]> {
  if (shouldUseMock()) return mock.listAccounts();
  // TODO: 実装時は My Business Account Management API を呼び出す
  return mock.listAccounts();
}

export async function listLocations(): Promise<Store[]> {
  if (shouldUseMock()) return mock.listLocations();
  // TODO: 実装時は My Business Business Information API を呼び出す
  return mock.listLocations();
}

export async function listReviews(locationId: string): Promise<Review[]> {
  if (shouldUseMock()) return mock.listReviews(locationId);
  // TODO: 実装時は My Business Reviews API を呼び出す
  return mock.listReviews(locationId);
}

export async function replyToReview(reviewId: string, replyText: string) {
  if (shouldUseMock()) return mock.replyToReview(reviewId, replyText);
  // TODO: 実装時は reviews.updateReply を呼び出す
  return mock.replyToReview(reviewId, replyText);
}
