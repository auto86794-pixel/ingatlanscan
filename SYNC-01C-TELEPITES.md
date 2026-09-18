# HomeFlow SYNC-01C

Új végpont: `POST /api/ingatlanscan/photos`

Vercel környezeti változók szükségesek:
- `SUPABASE_SERVICE_ROLE_KEY` – kizárólag szerveroldali Supabase service role kulcs; SOHA ne kerüljön az IngatlanScan kliensbe.
- `INGATLANSCAN_SYNC_SECRET` – saját hosszú, véletlen titok. Az IngatlanScan később `x-ingatlanscan-key` headerben küldi.

A meglévő `NEXT_PUBLIC_SUPABASE_URL` változót használja.

A végpont ellenőrzi az ingatlan UUID-t, deduplikál `source_image_id` alapján, a `property-images/<property-id>/ingatlanscan/` útvonalra tölt, majd létrehozza a `property_images` rekordot.
