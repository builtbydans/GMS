import "server-only";

import { createClient } from "@/lib/supabase/server";
import { createApiFetch } from "@/lib/create-api-fetch";

async function getAccessToken(): Promise<string | null> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token ?? null;
}

/** Server Component / RSC API calls. Safe to use next/headers. */
export const apiFetch = createApiFetch(getAccessToken);
