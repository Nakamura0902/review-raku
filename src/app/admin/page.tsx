import Link from "next/link";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { mockAdminStores } from "@/lib/mock/adminStores";
import { mockLeads } from "@/lib/mock/leads";

export default function AdminDashboardPage() {
  const pendingLeads = mockLeads.filter((lead) => lead.status === "未対応");
  const pastDueStores = mockAdminStores.filter(
    (store) => store.contractStatus === "支払い遅延",
  );
  const errorStores = mockAdminStores.filter(
    (store) => store.apiErrorCount > 0,
  );

  return (
    <div>
      <PageHeader title="管理者ダッシュボード" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="契約店舗数"
          value={String(mockAdminStores.length)}
          unit="店舗"
          note="今月 +1店舗"
          noteTone="up"
        />
        <StatCard
          label="無料診断数"
          value={String(mockLeads.length)}
          unit="件"
          note={`未対応 ${pendingLeads.length}件`}
          noteTone="down"
        />
        <StatCard
          label="APIエラー"
          value={String(errorStores.length)}
          unit="店舗"
          note="要確認"
          noteTone="down"
        />
        <StatCard label="MRR" value="59,200" unit="円" note="前月比 +14,800円" noteTone="up" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>要対応</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3">
            {pendingLeads.map((lead) => (
              <Link
                key={lead.id}
                href="/admin/diagnoses"
                className="flex items-center justify-between gap-3 rounded-lg border border-line px-4 py-3 text-sm hover:border-primary/40"
              >
                <div>
                  <p className="font-medium text-text-main">
                    無料診断: {lead.storeName}
                  </p>
                  <p className="mt-0.5 text-xs text-text-sub">
                    {lead.createdAt} 申込 / {lead.industry}
                  </p>
                </div>
                <Badge tone="blue">未対応</Badge>
              </Link>
            ))}
            {pastDueStores.map((store) => (
              <Link
                key={store.id}
                href={`/admin/stores/${store.id}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-line px-4 py-3 text-sm hover:border-primary/40"
              >
                <div>
                  <p className="font-medium text-text-main">
                    未払い: {store.name}
                  </p>
                  <p className="mt-0.5 text-xs text-text-sub">
                    請求日 {store.nextBillingDate} を経過
                  </p>
                </div>
                <Badge tone="red">支払い遅延</Badge>
              </Link>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              API連携エラー
            </CardTitle>
          </CardHeader>
          <CardBody className="space-y-3">
            {errorStores.length === 0 && (
              <p className="text-sm text-text-sub">エラーはありません。</p>
            )}
            {errorStores.map((store) => (
              <Link
                key={store.id}
                href={`/admin/stores/${store.id}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-line px-4 py-3 text-sm hover:border-primary/40"
              >
                <div>
                  <p className="font-medium text-text-main">{store.name}</p>
                  <p className="mt-0.5 text-xs text-text-sub">
                    直近のAPIエラー {store.apiErrorCount}件 / 最終同期{" "}
                    {store.lastSyncedAt}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-gray-300" />
              </Link>
            ))}
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>最近の契約店舗</CardTitle>
          <Link
            href="/admin/stores"
            className="text-xs font-medium text-primary hover:underline"
          >
            すべて見る
          </Link>
        </CardHeader>
        <CardBody className="space-y-3">
          {mockAdminStores.slice(0, 3).map((store) => (
            <Link
              key={store.id}
              href={`/admin/stores/${store.id}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-line px-4 py-3 text-sm hover:border-primary/40"
            >
              <div>
                <p className="font-medium text-text-main">{store.name}</p>
                <p className="mt-0.5 text-xs text-text-sub">
                  {store.industry} / {store.plan}
                </p>
              </div>
              <Badge
                tone={
                  store.contractStatus === "契約中"
                    ? "green"
                    : store.contractStatus === "トライアル"
                      ? "blue"
                      : "red"
                }
              >
                {store.contractStatus}
              </Badge>
            </Link>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
