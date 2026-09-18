# SYNC-01B

1. Az offline mentés változatlanul helyi marad.
2. A fotók IndexedDB-ben `pending/uploading/synced/error` állapotot kapnak.
3. Új képek 1920 px maximum méretű WebP-ként készülnek.
4. A Szinkron gomb a HomeFlow Supabase-be küldi a felmérést és a képeket.
5. Visszatérő internetkapcsolatnál a megnyitott felmérés csendben újrapróbálható.
6. A HomeFlow-fiókos bejelentkezés az Összegzés lépésen érhető el.
7. Az adatbázis csak azonos vagy frissebb `source_updated_at` változatot fogad el; régebbi eszköz nem írhatja felül az újabb felhőadatot.
8. Az azonos fotóútvonal újraküldése idempotens; egyszerre egy szinkron futhat felmérésenként.

Szükséges Vercel környezeti változók:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (vagy kompatibilitásként NEXT_PUBLIC_SUPABASE_ANON_KEY)

A három SQL migráció sorrendben futtatandó. A második már a `property_surveys` táblára épül, a harmadik a konfliktusvédett RPC-t telepíti.
