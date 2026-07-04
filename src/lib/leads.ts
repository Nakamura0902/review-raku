import { getSupabaseClient } from "@/lib/supabase/client";

export type DiagnosisInput = {
  storeName: string;
  industry: string;
  googleProfileUrl: string;
  managerName: string;
  email: string;
  concerns: string[];
};

// 無料診断の申し込みを保存する。
// Supabase 未設定時はモックとして成功扱いにする。
export async function submitDiagnosis(
  input: DiagnosisInput,
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { success: true };

  const { error } = await supabase.from("diagnosis_leads").insert({
    store_name: input.storeName,
    industry: input.industry,
    google_profile_url: input.googleProfileUrl || null,
    manager_name: input.managerName,
    email: input.email,
    concerns: input.concerns,
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}
