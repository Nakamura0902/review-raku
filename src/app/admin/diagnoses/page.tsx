"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input, Select } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { cn } from "@/lib/cn";
import { mockLeads } from "@/lib/mock/leads";
import type { DiagnosisLead } from "@/lib/types";

const tabs = ["すべて", "未対応", "診断済み", "商談予定", "契約済み"] as const;

const statusTone: Record<
  DiagnosisLead["status"],
  "blue" | "yellow" | "green" | "gray" | "red"
> = {
  未対応: "blue",
  診断済み: "yellow",
  商談予定: "green",
  契約済み: "green",
  失注: "gray",
};

const industries = [...new Set(mockLeads.map((lead) => lead.industry))];

export default function AdminDiagnosesPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("すべて");
  const [industry, setIndustry] = useState("all");
  const [keyword, setKeyword] = useState("");

  const filtered = mockLeads.filter((lead) => {
    if (tab !== "すべて" && lead.status !== tab) return false;
    if (industry !== "all" && lead.industry !== industry) return false;
    if (
      keyword &&
      !`${lead.storeName}${lead.managerName}${lead.email}`.includes(keyword)
    )
      return false;
    return true;
  });

  return (
    <div>
      <PageHeader
        title="無料診断申し込み一覧"
        description="LPの無料診断フォームから届いた申し込みです。"
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              tab === item
                ? "bg-primary text-white"
                : "border border-line bg-card text-text-sub hover:text-text-main",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="店舗名・担当者・メールで検索"
            className="pl-9"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </div>
        <Select
          className="sm:w-48"
          value={industry}
          onChange={(event) => setIndustry(event.target.value)}
        >
          <option value="all">すべての業種</option>
          {industries.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="該当する申し込みはありません" />
      ) : (
        <>
          {/* PC: テーブル */}
          <Card className="hidden overflow-hidden lg:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-background text-left text-xs text-text-sub">
                  <th className="px-5 py-3 font-medium">申込日</th>
                  <th className="px-5 py-3 font-medium">店舗名</th>
                  <th className="px-5 py-3 font-medium">業種</th>
                  <th className="px-5 py-3 font-medium">担当者</th>
                  <th className="px-5 py-3 font-medium">連絡先</th>
                  <th className="px-5 py-3 font-medium">状態</th>
                  <th className="px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr key={lead.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-4 whitespace-nowrap text-text-sub">
                      {lead.createdAt}
                    </td>
                    <td className="px-5 py-4 font-medium text-text-main">
                      {lead.storeName}
                    </td>
                    <td className="px-5 py-4 text-text-sub">{lead.industry}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {lead.managerName}
                    </td>
                    <td className="px-5 py-4 text-xs text-text-sub">
                      <p>{lead.email}</p>
                      {lead.phone && <p>{lead.phone}</p>}
                    </td>
                    <td className="px-5 py-4">
                      <Badge tone={statusTone[lead.status]}>{lead.status}</Badge>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="text-xs font-medium text-primary hover:underline">
                        対応する
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* スマホ: カード */}
          <div className="space-y-3 lg:hidden">
            {filtered.map((lead) => (
              <Card key={lead.id}>
                <CardBody className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-text-main">
                      {lead.storeName}
                    </span>
                    <Badge tone={statusTone[lead.status]}>{lead.status}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-text-sub">
                    {lead.createdAt} / {lead.industry}
                  </p>
                  <p className="mt-2 text-sm text-text-main">
                    {lead.managerName}
                  </p>
                  <p className="text-xs text-text-sub">{lead.email}</p>
                  <button className="mt-3 text-sm font-medium text-primary hover:underline">
                    対応する
                  </button>
                </CardBody>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
