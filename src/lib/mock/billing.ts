import type { Invoice, Subscription } from "@/lib/types";

export const mockSubscription: Subscription = {
  id: "sub_1",
  storeId: "store_1",
  planName: "Standardプラン",
  amount: 14800,
  status: "active",
  nextBillingDate: "2024/06/01",
};

export const mockInvoices: Invoice[] = [
  {
    id: "inv_5",
    date: "2024/05/01",
    period: "2024/05/01 - 2024/05/31",
    amount: 14800,
    status: "支払い済み",
  },
  {
    id: "inv_4",
    date: "2024/04/01",
    period: "2024/04/01 - 2024/04/30",
    amount: 14800,
    status: "支払い済み",
  },
  {
    id: "inv_3",
    date: "2024/03/01",
    period: "2024/03/01 - 2024/03/31",
    amount: 14800,
    status: "支払い済み",
  },
  {
    id: "inv_2",
    date: "2024/02/01",
    period: "2024/02/01 - 2024/02/29",
    amount: 14800,
    status: "支払い済み",
  },
  {
    id: "inv_1",
    date: "2024/01/15",
    period: "初期設定費",
    amount: 19800,
    status: "支払い済み",
  },
];
