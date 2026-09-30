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

## Jelenlegi HomeFlow-szinkron

Bejelentkezés után a felmérés és a fotók közvetlenül a közös Supabase-projektbe szinkronizálódnak, és megjelennek a HomeFlow **Felmérések** részében. A szinkron önmagában még nem hoz létre CRM-ingatlant: az adatokat előbb ellenőrizni kell, majd a HomeFlowban az **Ingatlan létrehozása** művelettel lehet átvenni. Az új verzió a felmérés készültségét is továbbítja, és a felhőből a már eltávolított fotók metaadatait frissíti. Az offline piszkozat működése megmarad. Szinkronhiba esetén a helyi adatokat ne töröld; ismételd meg a szinkront.

A HomeFlow `20260922130000_ingatlanscan_sync_consistency.sql` migrációját az IngatlanScan új verziójának közzététele előtt kell futtatni. Nincs szükség `HOMEFLOW_API_TOKEN` változóra vagy külön fotó-API-ra. A bejelentkezés és az RLS védi az adatokat.

## Korábbi verziójegyzetek

Az alábbi leírások történeti információk.

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
