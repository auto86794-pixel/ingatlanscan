# IngatlanScan

Next.js 16 alapú, mobilon és weben használható ingatlanfelmérő alkalmazás.

## Indítás Windows alatt

```cmd
npm.cmd install
npm.cmd run dev
```

Ezután: `http://localhost:3000`

## Jelenlegi funkciók

- valódi React/Next.js felület, iframe nélkül
- hatlépéses, mobilbarát adatfelvétel
- automatikus offline piszkozatmentés
- verziózott adatmodell
- HomeFlow-kompatibilis JSON-export
- nyomtatható/PDF-be menthető adatlap
- PWA manifest és alkalmazásikon
- előkészített többirodás Supabase-séma RLS-szabályokkal

## Következő bekötési lépések

1. Másold az `.env.example` fájlt `.env.local` néven, és add meg az új IngatlanScan Supabase-projekt publikus adatait.
2. A `supabase/schema.sql` csak ellenőrzött migrációként kerüljön az adatbázisba.
3. Az Auth és közvetlen szinkron bekötése előtt tesztelni kell az összes RLS allow/deny esetet.
4. A `HOMEFLOW_API_TOKEN` kizárólag szerveroldali környezeti változó lehet.

Git-repositoryt és Vercel-kapcsolatot a csomag szándékosan nem tartalmaz.

## IngatlanScan 03
- Értékesítési rész mobilos gyorsválasztókkal
- Áralku, megtekinthetőség, kulcs/bejutás, hirdetési készültség
- Kibővített összegzés, PDF és HomeFlow export
- Schema version 4, régi helyi piszkozatok normalizálása

## 04 – Helyiségek + fotók
- helyiségek gyors hozzáadása mobilon
- helyiségenként méret, állapot, burkolat, tájolás és jellemzők
- hossz × szélesség alapján területszámítás
- helyiségenként legfeljebb 8 fotó
- fotók külön IndexedDB-ben tárolva, nem terhelik a localStorage piszkozatot
- helyiségadatok bekerülnek az összegzésbe, nyomtatási nézetbe és HomeFlow exportba


## IngatlanScan 06
Vizuális finomítás a stabil 05-ös funkcionális alapra. Az adatmodell és a működési logika változatlan.


## IngatlanScan 07
Offline automatikus helyszíni kivonat az összegzésben, egygombos másolással és PDF/nyomtatási megjelenítéssel. A 06 adatmodellje változatlan.


## IngatlanScan 08
Több helyi felmérés kezelése: Felmérések kezdőoldal, újranyitás, készültség, fotószám, utolsó módosítás és biztonságos törlés. A 07 adatmodellje változatlan; a korábbi helyi piszkozat automatikusan bekerül a listába.
