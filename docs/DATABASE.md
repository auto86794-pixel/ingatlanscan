# HomeFlow Database

## Az intelligens munkatárs minden ingatlanközvetítő számára.

---

# Adatbázis filozófia

A HomeFlow központi eleme nem az ügyfél és nem az ingatlan.

A központi elem az ÜGY (Case).

Minden információ egy ügyhöz kapcsolódik.

---

# Fő entitások

Users

↓

Cases

↓

Contacts

↓

Properties

↓

Tasks

↓

Appointments

↓

Documents

↓

Activities

↓

Notes

---

# Kapcsolatok

Case

├── Contacts

├── Properties

├── Tasks

├── Appointments

├── Documents

├── Notes

└── Activities

---

# Táblák

## users

Felhasználók

---

## cases

Az ügy.

Lehet:

- Eladó megbízás
- Vevő megbízás
- Bérbeadás
- Bérlés
- Befektetés

---

## contacts

Kapcsolatok.

Nem csak ügyfelek.

Lehetnek:

- Eladó
- Vevő
- Tulajdonos
- Ügyvéd
- Hitelközvetítő
- Energetikus
- Földmérő
- Partner

---

## properties

Ingatlanok.

Minden ingatlan önálló rekord.

---

## tasks

Feladatok.

Mindig egy ügyhöz kapcsolódnak.

---

## appointments

Megtekintések

Telefon

Találkozók

---

## documents

Szerződések

Tulajdoni lap

Alaprajz

Fotók

---

## activities

Minden esemény.

Telefon

Email

SMS

Megtekintés

Jegyzet

Státuszváltás

AI esemény

---

## notes

Szabad jegyzetek.

---

# Tervezési alapelvek

Minden rekord rendelkezik:

- id
- created_at
- updated_at

Amennyiben szükséges:

- created_by
- updated_by

---

# Soft Delete

A rekordokat nem töröljük.

deleted_at mezőt használunk.

Így minden visszaállítható.

---

# Timeline

A HomeFlow egyik legfontosabb eleme.

Minden esemény bekerül az idővonalra.

Például:

Telefon

↓

Megtekintés

↓

Ajánlat

↓

Szerződés

↓

Lezárás

---

# AI

Az AI nem külön modul.

Az AI az összes adatból dolgozik.

Kapcsolatok

Ingatlanok

Kommunikáció

Feladatok

Megtekintések

Jegyzetek

---

# Hosszú távú cél

A HomeFlow minden ügy teljes történetét egyetlen helyen kezelje.