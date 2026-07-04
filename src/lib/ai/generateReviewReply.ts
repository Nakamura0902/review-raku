// AI返信生成の切り替え口。
// AI_API_KEY 未設定、または USE_MOCK_AI=true の間はモック生成を使う。
//
// 返信文ルール:
// - 150〜300文字程度 / 感謝を入れる / 口コミ内容に触れる
// - 低評価には謝罪と改善姿勢を入れる
// - 口コミ本文にない内容を勝手に足さない
// - 医療・整体系では効果を断定しない(「必ず治る」「完治する」「絶対改善する」は禁止)
// - 個人情報に触れない / 反論しない / 絵文字は使わない
import { mockGenerateReviewReply } from "@/lib/ai/mockGenerateReviewReply";
import type { Review } from "@/lib/types";

function shouldUseMock(): boolean {
  return process.env.USE_MOCK_AI === "true" || !process.env.AI_API_KEY;
}

export async function generateReviewReply(
  review: Review,
  variant = 0,
): Promise<string> {
  if (shouldUseMock()) return mockGenerateReviewReply(review, variant);
  // TODO: 実装時は Claude API などで店舗設定(トーン・NG表現)を踏まえて生成する
  return mockGenerateReviewReply(review, variant);
}
