import type { Intake } from "./model";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getIntakePhotos, updatePhotoSync } from "./photos";
import { getSupabaseClient } from "./supabase-client";

export type SyncResult = {
  uploaded: number;
  skipped: number;
  failed: number;
  reason?: string;
  conflict?: boolean;
};

const activeSyncs = new Map<string, Promise<SyncResult>>();

function isAlreadyStored(error: { message?: string; statusCode?: string | number }) {
  const status = Number(error.statusCode);
  return status === 400 || status === 409 || /already exists|duplicate/i.test(error.message ?? "");
}

async function runSync(intake: Intake): Promise<SyncResult> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { uploaded: 0, skipped: 0, failed: 0, reason: "A Supabase környezeti változók nincsenek beállítva." };
  }
  const syncClient: SupabaseClient = supabase;

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return { uploaded: 0, skipped: 0, failed: 0, reason: "A szinkronhoz jelentkezz be a HomeFlow-fiókoddal." };
  }

  const photoCount = intake.rooms.reduce((count, room) => count + room.photoIds.length, 0);
  const { data: survey, error: surveyError } = await syncClient.rpc("sync_property_survey", {
    p_source_local_id: intake.id,
    p_schema_version: intake.schemaVersion,
    p_address: intake.property.address || null,
    p_city: intake.property.city || null,
    p_district: intake.property.district || null,
    p_property_type: intake.property.type || null,
    p_owner_name: intake.owner.name || null,
    p_owner_phone: intake.owner.phone || null,
    p_owner_email: intake.owner.email || null,
    p_expected_price_m: intake.sale.expectedPriceM
      ? Number(String(intake.sale.expectedPriceM).replace(",", "."))
      : null,
    p_photo_count: photoCount,
    p_payload: intake,
    p_source_updated_at: intake.updatedAt,
    p_captured_at: intake.createdAt,
  }).maybeSingle<{ id: string }>();

  if (surveyError) {
    return { uploaded: 0, skipped: 0, failed: 0, reason: surveyError.message };
  }
  if (!survey) {
    return {
      uploaded: 0,
      skipped: 0,
      failed: 0,
      conflict: true,
      reason: "A felhőben újabb változat található. A helyi példány nem írta felül.",
    };
  }

  const photos = await getIntakePhotos(intake.id);
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const photo of photos) {
    const path = photo.storagePath || `${user.id}/${survey.id}/${photo.id}.webp`;
    const wasSynced = photo.syncStatus === "synced" && photo.storagePath === path;

    try {
      await updatePhotoSync(photo.id, { syncStatus: "uploading", syncError: null });

      if (!wasSynced) {
        const { error: uploadError } = await syncClient.storage
          .from("property-survey-images")
          .upload(path, photo.blob, { contentType: "image/webp", upsert: false });
        if (uploadError && !isAlreadyStored(uploadError)) throw uploadError;
      }

      const syncedAt = new Date().toISOString();
      const { error: metadataError } = await syncClient.from("property_survey_images").upsert({
        survey_id: survey.id,
        user_id: user.id,
        source_photo_id: photo.id,
        room_local_id: photo.roomId,
        storage_bucket: "property-survey-images",
        storage_path: path,
        file_name: `${photo.id}.webp`,
        mime_type: "image/webp",
        file_size: photo.blob.size,
        sync_status: "synced",
        source_updated_at: intake.updatedAt,
        synced_at: syncedAt,
      }, { onConflict: "user_id,source_photo_id" });
      if (metadataError) throw metadataError;

      await updatePhotoSync(photo.id, {
        syncStatus: "synced",
        storagePath: path,
        syncedAt,
        syncError: null,
      });
      if (wasSynced) skipped += 1;
      else uploaded += 1;
    } catch (error) {
      failed += 1;
      await updatePhotoSync(photo.id, {
        syncStatus: "error",
        syncError: error instanceof Error ? error.message : "Ismeretlen szinkronhiba",
      });
    }
  }

  return { uploaded, skipped, failed };
}

export function syncIntakePhotos(intake: Intake): Promise<SyncResult> {
  const running = activeSyncs.get(intake.id);
  if (running) return running;
  const promise = runSync(intake).finally(() => activeSyncs.delete(intake.id));
  activeSyncs.set(intake.id, promise);
  return promise;
}
