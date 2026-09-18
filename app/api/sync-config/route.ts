import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  if (!url || !key) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }

  return NextResponse.json(
    { configured: true, url, key },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
