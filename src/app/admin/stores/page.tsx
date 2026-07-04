import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { mockAdminStores } from "@/lib/mock/adminStores";
import type { AdminStore } from "@/lib/types";

const statusTone: Record<
  AdminStore["contractStatus"],
  "green" | "blue" | "gray" | "red"
> = {
  契約中: "green",
  トライアル: "blue",
  解約済み: "gray",
  支払い遅延: "red",
};

export default function AdminStoresPage() {
  return (
    <div>
      <PageHeader
        title="契約店舗一覧"
        description={`全 ${mockAdminStores.length} 店舗`}
      />

      {/* PC: テーブル */}
      <Card className="hidden overflow-hidden lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-background text-left text-xs text-text-sub">
              <th className="px-5 py-3 font-medium">店舗名</th>
              <th className="px-5 py-3 font-medium">業種</th>
              <th className="px-5 py-3 font-medium">プラン</th>
              <th className="px-5 py-3 font-medium">契約ステータス</th>
              <th className="px-5 py-3 font-medium">次回請求日</th>
              <th className="px-5 py-3 font-medium">返信率</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {mockAdminStores.map((store) => (
              <tr key={store.id} className="border-b border-line last:border-0">
                <td className="px-5 py-4 font-medium text-text-main">
                  {store.name}
                </td>
                <td className="px-5 py-4 text-text-sub">{store.industry}</td>
                <td className="px-5 py-4 text-text-sub">{store.plan}</td>
                <td className="px-5 py-4">
                  <Badge tone={statusTone[store.contractStatus]}>
                    {store.contractStatus}
                  </Badge>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-text-sub">
                  {store.nextBillingDate}
                </td>
                <td className="px-5 py-4 font-medium">{store.replyRate}%</td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/admin/stores/${store.id}`}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    詳細
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* スマホ: カード */}
      <div className="space-y-3 lg:hidden">
        {mockAdminStores.map((store) => (
          <Link key={store.id} href={`/admin/stores/${store.id}`}>
            <Card className="mb-3">
              <CardBody className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-text-main">
                    {store.name}
                  </span>
                  <Badge tone={statusTone[store.contractStatus]}>
                    {store.contractStatus}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-text-sub">
                  {store.industry} / {store.plan}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-text-sub">
                  <span>次回請求日: {store.nextBillingDate}</span>
                  <span>返信率: {store.replyRate}%</span>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
