// Stripe クライアント。
// STRIPE_SECRET_KEY 未設定、または USE_MOCK_BILLING=true の間はモックへフォールバックする。
// 将来対応: Checkout Session / Customer Portal / サブスクリプション取得 / 請求履歴 / Webhook
import * as mock from "@/lib/billing/mockBillingClient";
import type { Invoice, Subscription } from "@/lib/types";

function shouldUseMock(): boolean {
  return (
    process.env.USE_MOCK_BILLING === "true" || !process.env.STRIPE_SECRET_KEY
  );
}

export async function getSubscription(): Promise<Subscription> {
  if (shouldUseMock()) return mock.getSubscription();
  // TODO: stripe.subscriptions.retrieve
  return mock.getSubscription();
}

export async function listInvoices(): Promise<Invoice[]> {
  if (shouldUseMock()) return mock.listInvoices();
  // TODO: stripe.invoices.list
  return mock.listInvoices();
}

export async function createCheckoutSession(): Promise<{ url: string }> {
  if (shouldUseMock()) return mock.createCheckoutSession();
  // TODO: stripe.checkout.sessions.create
  return mock.createCheckoutSession();
}

export async function createCustomerPortalSession(): Promise<{ url: string }> {
  if (shouldUseMock()) return mock.createCustomerPortalSession();
  // TODO: stripe.billingPortal.sessions.create
  return mock.createCustomerPortalSession();
}
