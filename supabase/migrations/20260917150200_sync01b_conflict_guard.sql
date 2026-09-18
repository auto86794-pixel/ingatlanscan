-- Stable, last-write guarded IngatlanScan survey synchronization.
-- Runs with the caller's permissions; the existing RLS policies remain authoritative.

begin;

create or replace function public.sync_property_survey(
  p_source_local_id text,
  p_schema_version integer,
  p_address text,
  p_city text,
  p_district text,
  p_property_type text,
  p_owner_name text,
  p_owner_phone text,
  p_owner_email text,
  p_expected_price_m numeric,
  p_photo_count integer,
  p_payload jsonb,
  p_source_updated_at timestamptz,
  p_captured_at timestamptz
)
returns setof public.property_surveys
language sql
security invoker
set search_path = ''
as $$
  insert into public.property_surveys (
    source_local_id,
    user_id,
    schema_version,
    address,
    city,
    district,
    property_type,
    owner_name,
    owner_phone,
    owner_email,
    expected_price_m,
    photo_count,
    payload,
    source_updated_at,
    captured_at,
    sync_status
  )
  values (
    p_source_local_id,
    (select auth.uid()),
    p_schema_version,
    p_address,
    p_city,
    p_district,
    p_property_type,
    p_owner_name,
    p_owner_phone,
    p_owner_email,
    p_expected_price_m,
    p_photo_count,
    p_payload,
    p_source_updated_at,
    p_captured_at,
    'synced'
  )
  on conflict (user_id, source_local_id) do update
  set
    schema_version = excluded.schema_version,
    address = excluded.address,
    city = excluded.city,
    district = excluded.district,
    property_type = excluded.property_type,
    owner_name = excluded.owner_name,
    owner_phone = excluded.owner_phone,
    owner_email = excluded.owner_email,
    expected_price_m = excluded.expected_price_m,
    photo_count = excluded.photo_count,
    payload = excluded.payload,
    source_updated_at = excluded.source_updated_at,
    captured_at = excluded.captured_at,
    sync_status = case
      when public.property_surveys.sync_status = 'imported' then 'synced'
      else public.property_surveys.sync_status
    end
  where excluded.source_updated_at >= public.property_surveys.source_updated_at
  returning *;
$$;

revoke all on function public.sync_property_survey(
  text, integer, text, text, text, text, text, text, text,
  numeric, integer, jsonb, timestamptz, timestamptz
) from public, anon;

grant execute on function public.sync_property_survey(
  text, integer, text, text, text, text, text, text, text,
  numeric, integer, jsonb, timestamptz, timestamptz
) to authenticated;

commit;
