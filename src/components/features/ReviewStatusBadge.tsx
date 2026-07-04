import { Badge } from "@/components/ui/Badge";
import type { ReviewStatus, RiskLevel } from "@/lib/types";

const statusTone: Record<ReviewStatus, "gray" | "blue" | "green" | "yellow" | "red"> =
  {
    未返信: "blue",
    返信済み: "green",
    要確認: "yellow",
    AI生成中: "gray",
    投稿失敗: "red",
  };

export function ReviewStatusBadge({ status }: { status: ReviewStatus }) {
  return <Badge tone={statusTone[status]}>{status}</Badge>;
}

const riskLabel: Record<RiskLevel, string> = {
  low: "リスク: 低",
  medium: "リスク: 中",
  high: "リスク: 高",
};

const riskTone: Record<RiskLevel, "green" | "yellow" | "red"> = {
  low: "green",
  medium: "yellow",
  high: "red",
};

export function RiskBadge({ level }: { level: RiskLevel }) {
  return <Badge tone={riskTone[level]}>{riskLabel[level]}</Badge>;
}
