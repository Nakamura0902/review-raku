import { mockInvoices, mockSubscription } from "@/lib/mock/billing";
import type { Invoice, Subscription } from "@/lib/types";

export async function getSubscription(): Promise<Subscription> {
  return mockSubscription;
}

export async function listInvoices(): Promise<Invoice[]> {
  return mockInvoices;
}

export async function createCheckoutSession(): Promise<{ url: string }> {
  return { url: "/app/billing?checkout=mock" };
}

export async function createCustomerPortalSession(): Promise<{ url: string }> {
  return { url: "/app/billing?portal=mock" };
}
