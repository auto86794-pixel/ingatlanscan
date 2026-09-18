import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const BUCKET = "property-images";
const MAX_FILE_SIZE = 8 * 1024 * 1024;

function serverClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRole) throw new Error("Hiányzó Supabase szerver konfiguráció.");
  return createClient(url, serviceRole, { auth: { persistSession: false, autoRefreshToken: false } });
}

function authorized(req: NextRequest) {
  const expected = process.env.INGATLANSCAN_SYNC_SECRET;
  const received = req.headers.get("x-ingatlanscan-key");
  return Boolean(expected && received && received === expected);
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "Nincs jogosultság." }, { status: 401 });

  try {
    const form = await req.formData();
    const propertyId = String(form.get("property_id") ?? "").trim();
    const sourceImageId = String(form.get("source_image_id") ?? "").trim();
    const file = form.get("file");
    const sortOrder = Number(form.get("sort_order") ?? 0);
    const isCover = String(form.get("is_cover") ?? "false") === "true";

    if (!propertyId || !sourceImageId || !(file instanceof File)) {
      return NextResponse.json({ error: "property_id, source_image_id és file kötelező." }, { status: 400 });
    }
    if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Érvénytelen fájlméret." }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Csak képfájl tölthető fel." }, { status: 400 });
    }

    const supabase = serverClient();
    const { data: property, error: propertyError } = await supabase
      .from("properties").select("id").eq("id", propertyId).maybeSingle();
    if (propertyError) throw propertyError;
    if (!property) return NextResponse.json({ error: "Az ingatlan nem található a HomeFlow-ban." }, { status: 404 });

    const { data: existing, error: existingError } = await supabase
      .from("property_images").select("*").eq("source", "ingatlanscan")
      .eq("source_image_id", sourceImageId).maybeSingle();
    if (existingError) throw existingError;
    if (existing) return NextResponse.json({ ok: true, duplicate: true, image: existing });

    const ext = (file.name.split(".").pop() || "webp").replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "webp";
    const safeSourceId = sourceImageId.replace(/[^a-zA-Z0-9_-]/g, "-");
    const storagePath = `${propertyId}/ingatlanscan/${safeSourceId}.${ext}`;
    const bytes = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(storagePath, bytes, {
      contentType: file.type || "image/webp", upsert: false,
    });
    if (uploadError && !uploadError.message.toLowerCase().includes("already exists")) throw uploadError;

    const { data: publicUrl } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
    const { data: image, error: insertError } = await supabase.from("property_images").insert({
      property_id: propertyId,
      url: publicUrl.publicUrl,
      file_name: file.name,
      mime_type: file.type || null,
      file_size: file.size,
      is_cover: isCover,
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
      source: "ingatlanscan",
      source_image_id: sourceImageId,
      sync_status: "synced",
      storage_path: storagePath,
      synced_at: new Date().toISOString(),
    }).select().single();

    if (insertError) {
      await supabase.storage.from(BUCKET).remove([storagePath]);
      throw insertError;
    }
    return NextResponse.json({ ok: true, duplicate: false, image });
  } catch (error) {
    console.error("IngatlanScan photo sync error", error);
    return NextResponse.json({ error: "A képfeltöltés nem sikerült." }, { status: 500 });
  }
}
