import {
  Bell,
  CreditCard,
  FileText,
  History,
  LayoutDashboard,
  MessageSquare,
  QrCode,
  Settings,
  Store,
  Stethoscope,
  Users,
} from "lucide-react";

export const appNavItems = [
  { href: "/app/dashboard", label: "ダッシュボード", icon: LayoutDashboard },
  { href: "/app/reviews", label: "口コミ一覧", icon: MessageSquare },
  { href: "/app/reply-history", label: "返信履歴", icon: History },
  { href: "/app/reports", label: "レポート", icon: FileText },
  { href: "/app/review-request", label: "QR・依頼文", icon: QrCode },
  { href: "/app/store-settings", label: "店舗設定", icon: Store },
  { href: "/app/notifications", label: "通知設定", icon: Bell },
  { href: "/app/billing", label: "請求・プラン", icon: CreditCard },
];

// スマホ下部タブは主要5項目に絞る
export const mobileNavItems = [
  { href: "/app/dashboard", label: "ホーム", icon: LayoutDashboard },
  { href: "/app/reviews", label: "口コミ", icon: MessageSquare },
  { href: "/app/reports", label: "レポート", icon: FileText },
  { href: "/app/review-request", label: "QR依頼", icon: QrCode },
  { href: "/app/store-settings", label: "設定", icon: Settings },
];

export const adminNavItems = [
  { href: "/admin", label: "ダッシュボード", icon: LayoutDashboard },
  { href: "/admin/diagnoses", label: "無料診断申し込み", icon: Stethoscope },
  { href: "/admin/stores", label: "契約店舗", icon: Users },
];
