-- SYNC-01A: IngatlanScan <-> HomeFlow common asynchronous photo foundation
-- Safe foundation only: creates a survey-photo metadata table + private Storage bucket.
-- Existing offline IndexedDB and existing HomeFlow property_images are untouched.

begin;

create table if not exists public.property_survey_images (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid not null references public.property_surveys(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  source_photo_id text not null,
  room_local_id text,
  storage_bucket text not null default 'property-survey-images',
  storage_path text not null,
  file_name text,
  mime_type text,
  file_size integer check (file_size is null or file_size >= 0),
  width integer check (width is null or width > 0),
  height integer check (height is null or height > 0),
  sort_order integer not null default 0 check (sort_order >= 0),
  is_cover boolean not null default false,
  sync_status text not null default 'synced'
    check (sync_status in ('pending','uploading','synced','error','archived')),
  source_updated_at timestamptz,
  synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, source_photo_id),
  unique (storage_bucket, storage_path)
);

comment on table public.property_survey_images is
  'Shared IngatlanScan/HomeFlow photo metadata. Binary files live in the private property-survey-images Storage bucket.';

create index if not exists property_survey_images_survey_sort_idx
  on public.property_survey_images (survey_id, sort_order, created_at);
create index if not exists property_survey_images_user_status_idx
  on public.property_survey_images (user_id, sync_status, updated_at desc);

drop trigger if exists property_survey_images_set_updated_at on public.property_survey_images;
create trigger property_survey_images_set_updated_at
before update on public.property_survey_images
for each row execute function public.update_updated_at_column();

alter table public.property_survey_images enable row level security;
revoke all on table public.property_survey_images from anon, public;
grant select, insert, update, delete on table public.property_survey_images to authenticated;

drop policy if exists "Users read own survey images" on public.property_survey_images;
drop policy if exists "Users create own survey images" on public.property_survey_images;
drop policy if exists "Users update own survey images" on public.property_survey_images;
drop policy if exists "Users delete own survey images" on public.property_survey_images;
drop policy if exists "Admins manage all survey images" on public.property_survey_images;

create policy "Users read own survey images"
on public.property_survey_images for select to authenticated
using (user_id = (select auth.uid()));

create policy "Users create own survey images"
on public.property_survey_images for insert to authenticated
with check (
  user_id = (select auth.uid())
  and exists (
    select 1 from public.property_surveys s
    where s.id = survey_id and s.user_id = (select auth.uid())
  )
);

create policy "Users update own survey images"
on public.property_survey_images for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

create policy "Users delete own survey images"
on public.property_survey_images for delete to authenticated
using (user_id = (select auth.uid()));

create policy "Admins manage all survey images"
on public.property_survey_images for all to authenticated
using ((select auth.jwt() ->> 'user_role') = 'admin')
with check ((select auth.jwt() ->> 'user_role') = 'admin');

-- Private bucket. 2 MB is intentionally above the planned ~500 KB optimized target.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'property-survey-images',
  'property-survey-images',
  false,
  2097152,
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Object path contract for 01B: <auth.uid()>/<survey-id>/<source-photo-id>.webp
-- This makes Storage authorization independent from client-supplied metadata.
drop policy if exists "Users read own survey image objects" on storage.objects;
drop policy if exists "Users upload own survey image objects" on storage.objects;
drop policy if exists "Users update own survey image objects" on storage.objects;
drop policy if exists "Users delete own survey image objects" on storage.objects;

create policy "Users read own survey image objects"
on storage.objects for select to authenticated
using (
  bucket_id = 'property-survey-images'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "Users upload own survey image objects"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'property-survey-images'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "Users update own survey image objects"
on storage.objects for update to authenticated
using (
  bucket_id = 'property-survey-images'
  and (storage.foldername(name))[1] = (select auth.uid())::text
)
with check (
  bucket_id = 'property-survey-images'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "Users delete own survey image objects"
on storage.objects for delete to authenticated
using (
  bucket_id = 'property-survey-images'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

commit;
