import { createClient } from "@supabase/supabase-js";

let browserClient: ReturnType<typeof createClient> | null = null;
let browserClientPromise: Promise<ReturnType<typeof createClient> | null> | null = null;

export async function getSupabaseClient() {
  if (browserClient) return browserClient;
  if (browserClientPromise) return browserClientPromise;

  browserClientPromise = (async () => {
    let url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
    let key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

    // Vercelen a publikus változók normál esetben build időben bekerülnek.
    // Ha egy régi/PWA build miatt mégsem, runtime-ban a szervertől kérjük le őket.
    if ((!url || !key) && typeof window !== "undefined") {
      try {
        const response = await fetch("/api/sync-config", { cache: "no-store" });
        if (response.ok) {
          const config = (await response.json()) as { url?: string; key?: string };
          url = config.url ?? "";
          key = config.key ?? "";
        }
      } catch {
        // A hívó null eredményből felhasználóbarát hibaüzenetet ad.
      }
    }

    if (!url || !key) return null;

    browserClient = createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
    return browserClient;
  })();

  const result = await browserClientPromise;
  browserClientPromise = null;
  return result;
}
