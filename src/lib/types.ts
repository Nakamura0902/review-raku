export type ReviewStatus =
  | "未返信"
  | "返信済み"
  | "要確認"
  | "AI生成中"
  | "投稿失敗";

export type RiskLevel = "low" | "medium" | "high";

export type Store = {
  id: string;
  name: string;
  industry: string;
  address: string;
  phone?: string;
  googleProfileUrl?: string;
  reviewCount: number;
  averageRating: number;
  replyTone: string;
  features: string;
  ngWords: string[];
  googleConnected: boolean;
};

export type Review = {
  id: string;
  storeId: string;
  reviewerName: string;
  rating: number;
  text: string;
  date: string;
  status: ReviewStatus;
  category: string;
  riskLevel: RiskLevel;
  aiReply: string;
  repliedAt?: string;
  repliedBy?: string;
};

export type DiagnosisLead = {
  id: string;
  storeName: string;
  industry: string;
  managerName: string;
  email: string;
  phone?: string;
  status: "未対応" | "診断済み" | "商談予定" | "契約済み" | "失注";
  createdAt: string;
};

export type Subscription = {
  id: string;
  storeId: string;
  planName: string;
  amount: number;
  status: "trialing" | "active" | "past_due" | "canceled";
  nextBillingDate: string;
};

export type Invoice = {
  id: string;
  date: string;
  period: string;
  amount: number;
  status: "支払い済み" | "未払い" | "処理中";
};

export type AdminStore = {
  id: string;
  name: string;
  industry: string;
  plan: string;
  contractStatus: "契約中" | "トライアル" | "解約済み" | "支払い遅延";
  nextBillingDate: string;
  replyRate: number;
  unrepliedCount: number;
  lowRatingCount: number;
  googleConnected: boolean;
  lastSyncedAt: string;
  fetchedReviewCount: number;
  apiErrorCount: number;
  memos: { date: string; text: string }[];
};
