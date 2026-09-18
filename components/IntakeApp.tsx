"use client";

import { useEffect, useMemo, useState } from "react";
import { createIntake, createRoom, type Intake, type Room } from "@/lib/model";
import { deleteDraft, readDraft, readIntakes, selectDraft, writeDraft } from "@/lib/offline";
import { createHomeFlowPayload } from "@/lib/homeflow";
import { deleteIntakePhotos, deletePhoto, getPhotos, resizeImage, savePhoto } from "@/lib/photos";
import { syncIntakePhotos } from "@/lib/photo-sync";
import SyncAccountPanel from "@/components/SyncAccountPanel";

const steps = ["Ingatlan", "Tulajdonos", "Műszaki adatok", "Értékesítés", "Helyiségek + fotók", "Dokumentumok", "Extrák", "Összegzés"];
const documentItems = [
  ["titleDeed", "Tulajdoni lap"], ["floorPlan", "Alaprajz"], ["energyCertificate", "Energetikai tanúsítvány"],
  ["utilityBills", "Közüzemi számlák"], ["meterPhotos", "Mérőóra fotók"], ["keysReceived", "Kulcsok átvétele"], ["otherDocuments", "Egyéb dokumentum"]
] as const;
const extraList = ["Klíma","Napelem","Hőszivattyú","Padlófűtés","Kandalló","Redőny","Szúnyogháló","Riasztó","Kamera","Elektromos kapu","Öntözőrendszer","Kút","Medence","Szauna","Jacuzzi","Elektromosautó-töltő","Gardrób","Kamra","Pince","Tároló","Erkély","Terasz","Télikert","Garázs","Kocsibeálló"];
const utilityList = ["Víz", "Villany", "Gáz", "Csatorna"];
const roomTypes = ["Nappali","Hálószoba","Gyerekszoba","Konyha","Étkező","Fürdő","WC","Előszoba","Közlekedő","Kamra","Gardrób","Dolgozó","Háztartási helyiség","Garázs","Tároló","Pince","Terasz","Erkély","Egyéb"];
const roomConditions = ["Újszerű","Felújított","Jó","Átlagos","Felújítandó"];
const roomFloorings = ["Parketta","Laminált","Járólap","Vinyl","Szőnyeg","Beton","Vegyes","Egyéb"];
const roomFeatures = ["Világos","Csendes","Utcai","Udvari","Kertkapcsolatos","Klímás","Beépített bútor","Erkélykapcsolat","Teraszkapcsolat"];
const orientations = ["Északi","Északkeleti","Keleti","Délkeleti","Déli","Délnyugati","Nyugati","Északnyugati","Többirányú"];

const technicalOptions = {
  walls: ["Tégla", "Porotherm", "Panel", "Ytong", "Vályog", "Vegyes", "Könnyűszerkezet", "Egyéb"],
  insulation: ["Nincs", "5 cm", "8 cm", "10 cm", "12 cm", "15 cm", "20 cm+", "Nem ismert"],
  roof: ["Cserép", "Betoncserép", "Zsindely", "Lemez", "Lapos tető", "Palafedés", "Egyéb", "Nem releváns"],
  windows: ["Műanyag 2 rétegű", "Műanyag 3 rétegű", "Fa", "Fa hőszigetelt", "Alumínium", "Vegyes", "Régi típusú", "Nem ismert"],
  heating: ["Gázcirkó", "Gázkazán", "Konvektor", "Távfűtés", "Hőszivattyú", "Elektromos", "Vegyes tüzelés", "Kandalló / cserépkályha", "Padlófűtés", "Egyéb"],
  hotWater: ["Kombi kazán", "Villanybojler", "Gázbojler", "Hőszivattyús bojler", "Központi", "Távhő", "Egyéb"],
  cooling: ["Nincs", "1 klíma", "2 klíma", "3+ klíma", "Központi klíma", "Fan-coil", "Hőszivattyú", "Egyéb"],
  energy: ["A+++", "A++", "A+", "A", "B", "C", "D", "E", "F vagy rosszabb", "Nincs / nem ismert"],
  condition: ["Új építésű", "Újszerű", "Felújított", "Jó", "Átlagos", "Felújítandó", "Szerkezetkész"]
} as const;

const saleOptions = {
  priority: ["Maximális ár", "Piaci ár + ésszerű idő", "2–3 hónapon belül", "Gyors értékesítés"],
  desiredDate: ["Azonnal", "1 hónapon belül", "2–3 hónapon belül", "3–6 hónapon belül", "6+ hónap", "Nincs sürgősség"],
  reason: ["Költözés", "Nagyobba költözés", "Kisebbe költözés", "Öröklés", "Befektetés lezárása", "Anyagi ok", "Válás / élethelyzet", "Új építés / vásárlás", "Egyéb"],
  possession: ["Azonnal", "30 napon belül", "60 napon belül", "90 napon belül", "Megegyezés szerint", "Másik ingatlanhoz kötött"],
  financing: ["Tehermentes", "Jelzálog van", "CSOK / támogatás érinti", "Folyamatban lévő hitel", "Egyéb / tisztázandó"],
  negotiation: ["Fix ár", "Kis alku belefér", "Ésszerű alku", "Ajánlatot vár", "Nincs egyeztetve"],
  viewing: ["Rugalmasan", "Előre egyeztetve", "Hétköznap", "Hétvégén", "Csak meghatározott időben"],
  keyAccess: ["Kulcs nálam", "Tulajdonosnál", "Bérlőnél", "Kulcsszéf", "Egyeztetni kell"],
  marketingReadiness: ["Fotózható azonnal", "Kisebb rendrakás kell", "Home staging javasolt", "Felújítás / javítás kell", "Még nem hirdethető"]
} as const;

type Section = "property" | "owner" | "technical" | "sale";

export default function IntakeApp() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Intake | null>(null);
  const [saveState, setSaveState] = useState("Helyi piszkozat");
  const [errors, setErrors] = useState<string[]>([]);
  const [photoUrls, setPhotoUrls] = useState<Record<string, string>>({});
  const [photoBusyRoom, setPhotoBusyRoom] = useState<string | null>(null);
  const [summaryCopied, setSummaryCopied] = useState(false);
  const [screen, setScreen] = useState<"list" | "form">("list");
  const [intakes, setIntakes] = useState<Intake[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [syncState, setSyncState] = useState("Szinkron");

  useEffect(() => {
    const items = readIntakes();
    const current = readDraft();
    setIntakes(items);
    setForm(current || items[0] || null);
    setLoaded(true);
  }, []);

  useEffect(() => {
    const retry = () => { if (form && screen === "form") void syncPhotos(true); };
    window.addEventListener("online", retry);
    return () => window.removeEventListener("online", retry);
  }, [form?.id, screen]);

  useEffect(() => {
    if (!form || screen !== "form") return;
    setSaveState("Mentés…");
    const timer = setTimeout(() => {
      writeDraft(form);
      setIntakes(readIntakes());
      setSaveState("Mentve");
    }, 300);
    return () => clearTimeout(timer);
  }, [form, screen]);

  const allPhotoIds = useMemo(() => form?.rooms.flatMap(room => room.photoIds) || [], [form]);
  useEffect(() => {
    let active = true;
    const ids = allPhotoIds;
    (async () => {
      const photos = await getPhotos(ids);
      if (!active) return;
      const next: Record<string, string> = {};
      photos.forEach(photo => { next[photo.id] = URL.createObjectURL(photo.blob); });
      setPhotoUrls(old => {
        Object.values(old).forEach(url => URL.revokeObjectURL(url));
        return next;
      });
    })().catch(() => undefined);
    return () => { active = false; };
  }, [allPhotoIds.join("|")]);

  useEffect(() => () => { Object.values(photoUrls).forEach(url => URL.revokeObjectURL(url)); }, []);

  const done = useMemo(() => {
    if (!form) return 0;
    const values = [form.property.address, form.property.type, form.property.city, form.property.floorArea, form.owner.name, form.owner.phone, form.technical.heating, form.technical.condition, form.sale.expectedPriceM, form.sale.priority, form.rooms.length ? "rooms" : "", form.notes];
    return Math.round(values.filter(Boolean).length / values.length * 100);
  }, [form]);

  const autoSummary = useMemo(() => {
    if (!form) return "";
    const p = form.property, t = form.technical, s = form.sale;
    const photoCount = form.rooms.reduce((sum, room) => sum + room.photoIds.length, 0);
    const checkedDocuments = documentItems.filter(([key]) => form.documents[key]).map(([, label]) => label);
    const roomText = form.rooms.length
      ? form.rooms.map(room => [room.name || room.type, room.area ? `${room.area} m²` : "", room.condition].filter(Boolean).join(" · ")).join("; ")
      : "nincs külön rögzítve";
    const lines = [
      `${p.address || "Cím nélküli ingatlan"} – ${[p.type, p.floorArea && `${p.floorArea} m²`, p.lotArea && `${p.lotArea} m² telek`].filter(Boolean).join(", ") || "alapadatok részben rögzítve"}.`,
      `Elhelyezkedés: ${[p.postalCode, p.city, p.district].filter(Boolean).join(" ") || "nincs megadva"}${p.orientation ? `; tájolás: ${p.orientation}` : ""}${p.floor ? `; emelet: ${p.floor}` : ""}.`,
      `Műszaki állapot: ${t.condition || "nincs megadva"}${t.heating ? `; fűtés: ${t.heating}` : ""}${t.windows ? `; nyílászárók: ${t.windows}` : ""}${t.insulation ? `; szigetelés: ${t.insulation}` : ""}.`,
      `Helyiségek: ${roomText}. Összesen ${form.rooms.length} helyiség és ${photoCount} fotó került rögzítésre.`,
      `Értékesítés: ${s.expectedPriceM ? `${s.expectedPriceM} M Ft tulajdonosi ár elképzelés` : "ár még nincs rögzítve"}${s.priority ? `; prioritás: ${s.priority}` : ""}${s.desiredDate ? `; kívánt idő: ${s.desiredDate}` : ""}${s.possession ? `; birtokbaadás: ${s.possession}` : ""}.`,
      form.extras.length ? `Extrák / értéknövelő elemek: ${form.extras.join(", ")}.` : "",
      checkedDocuments.length ? `Rendelkezésre áll / rögzítve: ${checkedDocuments.join(", ")}.` : "Dokumentumok még nincsenek megjelölve.",
      form.strengths.some(Boolean) ? `Fő értékesítési előnyök: ${form.strengths.filter(Boolean).join("; ")}.` : "",
      form.notes ? `Helyszíni megjegyzés: ${form.notes}` : ""
    ];
    return lines.filter(Boolean).join("\n");
  }, [form]);

  const intakeProgress = (item: Intake) => {
    const values = [item.property.address, item.property.type, item.property.city, item.property.floorArea, item.owner.name, item.owner.phone, item.technical.heating, item.technical.condition, item.sale.expectedPriceM, item.sale.priority, item.rooms.length ? "rooms" : "", item.notes];
    return Math.round(values.filter(Boolean).length / values.length * 100);
  };
  const intakePhotoCount = (item: Intake) => item.rooms.reduce((sum, room) => sum + room.photoIds.length, 0);
  const formatUpdated = (iso: string) => {
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? "" : date.toLocaleString("hu-HU", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  };
  const openIntake = (item: Intake) => {
    selectDraft(item);
    setForm(item);
    setStep(0);
    setErrors([]);
    setScreen("form");
  };
  const startNewIntake = () => {
    const next = createIntake();
    writeDraft(next);
    setIntakes(readIntakes());
    setForm(next);
    setStep(0);
    setErrors([]);
    setScreen("form");
  };
  const removeSavedIntake = async (item: Intake) => {
    if (!window.confirm(`Törlöd ezt a felmérést?\n\n${item.property.address || "Cím nélküli ingatlan"}\n\nA hozzá tartozó helyi fotók is törlődnek.`)) return;
    await deleteIntakePhotos(item.id);
    deleteDraft(item.id);
    const nextItems = readIntakes();
    setIntakes(nextItems);
    if (form?.id === item.id) setForm(nextItems[0] || null);
  };

  if (!loaded) return <main className="loading">IngatlanScan betöltése…</main>;

  if (screen === "list") {
    return <div className="app intake-library">
      <header className="header library-header"><div className="header-main"><div className="brand"><img className="brand-logo" src="/icon.svg" alt="" /><div><h1>Ingatlan<span>Scan</span></h1><p>Érték a részletekben.</p></div></div><button className="new-btn library-new" onClick={startNewIntake}>+ Új felmérés</button></div></header>
      <main className="library-content">
        <section className="library-hero"><div><span className="eyebrow">Saját felmérések</span><h2>Felmérések</h2><p>Folytasd a korábbi adatfelvételt, vagy indíts új helyszíni felmérést.</p></div><div className="library-count"><strong>{intakes.length}</strong><span>mentett felmérés</span></div></section>
        {intakes.length === 0 ? <section className="library-empty"><img src="/icon.svg" alt="" /><h3>Még nincs mentett felmérés</h3><p>Az első adatlap indításához nyomd meg az Új felmérés gombot.</p><button className="btn export" onClick={startNewIntake}>+ Új felmérés indítása</button></section> :
        <section className="intake-list">{intakes.map(item => {
          const progress = intakeProgress(item);
          const photos = intakePhotoCount(item);
          return <article className="intake-card" key={item.id}>
            <button type="button" className="intake-open" onClick={() => openIntake(item)}>
              <div className="intake-card-top"><div><span className="intake-type">{item.property.type || "Ingatlanfelmérés"}</span><h3>{item.property.address || "Cím nélküli ingatlan"}</h3><p>{[item.property.city, item.property.district].filter(Boolean).join(" · ") || "Helyszín még nincs megadva"}</p></div><span className="intake-chevron">›</span></div>
              <div className="intake-meta"><span>{item.property.floorArea ? `${item.property.floorArea} m²` : "– m²"}</span><span>{item.rooms.length} helyiség</span><span>{photos} fotó</span><span>{item.sale.expectedPriceM ? `${item.sale.expectedPriceM} M Ft` : "ár nincs"}</span></div>
              <div className="intake-progress"><div><span>Készültség</span><strong>{progress}%</strong></div><div className="track"><div className="bar" style={{width:`${progress}%`}} /></div></div>
              <small>Utolsó módosítás: {formatUpdated(item.updatedAt)}</small>
            </button>
            <button type="button" className="intake-delete" onClick={() => removeSavedIntake(item)}>Törlés</button>
          </article>;
        })}</section>}
      </main>
    </div>;
  }

  if (!form) return <main className="loading">IngatlanScan betöltése…</main>;

  const touch = (next: Intake) => setForm({ ...next, updatedAt: new Date().toISOString() });
  const patch = (section: Section, key: string, value: string | string[]) => {
    setErrors([]);
    setForm(current => current ? { ...current, [section]: { ...current[section], [key]: value }, updatedAt: new Date().toISOString() } : current);
  };
  const patchRoom = (roomId: string, patchValue: Partial<Room>) => touch({ ...form, rooms: form.rooms.map(room => room.id === roomId ? { ...room, ...patchValue } : room) });

  const input = (label: string, section: Section, key: string, opts?: { type?: string; unit?: string; required?: boolean; placeholder?: string }) => (
    <div className="field"><label>{label}{opts?.required ? <span className="required"> *</span> : <span className="optional"> · opcionális</span>}</label><div className="unit"><input type={opts?.type || "text"} inputMode={opts?.type === "number" ? "decimal" : undefined} placeholder={opts?.placeholder} value={String(form[section][key as keyof typeof form[typeof section]] || "")} onChange={e => patch(section, key, e.target.value)} />{opts?.unit && <span>{opts.unit}</span>}</div></div>
  );
  const select = (label: string, section: Section, key: string, options: string[], required = false) => (
    <div className="field"><label>{label}{required ? <span className="required"> *</span> : <span className="optional"> · opcionális</span>}</label><select value={String(form[section][key as keyof typeof form[typeof section]] || "")} onChange={e => patch(section, key, e.target.value)}><option value="">Válassz…</option>{options.map(x => <option key={x}>{x}</option>)}</select></div>
  );
  const quickSelect = (label: string, key: keyof Intake["technical"], options: readonly string[], required = false) => {
    const value = String(form.technical[key] || "");
    return <div className="field full quick-field"><span className="label">{label}{required ? <span className="required"> *</span> : <span className="optional"> · opcionális</span>}</span><div className="quick-options">{options.map(option => <button type="button" key={option} className={`quick-option ${value === option ? "selected" : ""}`} onClick={() => patch("technical", String(key), value === option ? "" : option)}>{option}</button>)}</div></div>;
  };
  const saleQuickSelect = (label: string, key: keyof Intake["sale"], options: readonly string[], required = false) => {
    const value = String(form.sale[key] || "");
    return <div className="field full quick-field"><span className="label">{label}{required ? <span className="required"> *</span> : <span className="optional"> · opcionális</span>}</span><div className="quick-options">{options.map(option => <button type="button" key={option} className={`quick-option ${value === option ? "selected" : ""}`} onClick={() => patch("sale", String(key), value === option ? "" : option)}>{option}</button>)}</div></div>;
  };

  const validateStep = () => {
    const missing: string[] = [];
    if (step === 0) { if (!form.property.address.trim()) missing.push("Ingatlan címe"); if (!form.property.type) missing.push("Ingatlan típusa"); if (!form.property.city.trim()) missing.push("Település"); if (!form.property.floorArea.trim()) missing.push("Hasznos alapterület"); }
    if (step === 1) { if (!form.owner.name.trim()) missing.push("Tulajdonos neve"); if (!form.owner.phone.trim()) missing.push("Telefonszám"); }
    if (step === 2) { if (!form.technical.heating.trim()) missing.push("Fűtés"); if (!form.technical.condition) missing.push("Állapot"); }
    if (step === 3) { if (!form.sale.expectedPriceM.trim()) missing.push("Tulajdonosi ár elképzelés"); if (!form.sale.priority) missing.push("Értékesítési prioritás"); }
    setErrors(missing); return missing.length === 0;
  };
  const next = () => { if (!validateStep()) return; setStep(s => Math.min(s + 1, steps.length - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const toggleArray = (key: "extras" | "utilities", value: string, checked: boolean) => {
    if (key === "extras") touch({ ...form, extras: checked ? [...form.extras, value] : form.extras.filter(v => v !== value) });
    else patch("technical", "utilities", checked ? [...form.technical.utilities, value] : form.technical.utilities.filter(v => v !== value));
  };
  const toggleDocument = (key: keyof Intake["documents"]) => {
    if (key === "notes") return;
    touch({ ...form, documents: { ...form.documents, [key]: !form.documents[key] } });
  };
  const addRoom = (type: string) => touch({ ...form, rooms: [...form.rooms, createRoom(type)] });
  const removeRoom = async (room: Room) => {
    if (!window.confirm(`Törlöd ezt a helyiséget: ${room.name || room.type}?`)) return;
    await Promise.all(room.photoIds.map(id => deletePhoto(id)));
    touch({ ...form, rooms: form.rooms.filter(item => item.id !== room.id) });
  };
  const toggleRoomFeature = (room: Room, feature: string) => patchRoom(room.id, { features: room.features.includes(feature) ? room.features.filter(x => x !== feature) : [...room.features, feature] });
  const calculateRoomArea = (room: Room) => {
    const length = Number(room.length.replace(",", ".")); const width = Number(room.width.replace(",", "."));
    if (length > 0 && width > 0) patchRoom(room.id, { area: String(Math.round(length * width * 100) / 100).replace(".", ",") });
  };
  const addPhotos = async (room: Room, files: FileList | null) => {
    if (!files?.length) return;
    const remaining = Math.max(0, 8 - room.photoIds.length);
    if (!remaining) { alert("Egy helyiséghez legfeljebb 8 fotó menthető."); return; }
    setPhotoBusyRoom(room.id);
    try {
      const ids: string[] = [];
      for (const file of Array.from(files).slice(0, remaining)) {
        const id = crypto.randomUUID(); const blob = await resizeImage(file);
        await savePhoto({ id, intakeId: form.id, roomId: room.id, blob, createdAt: new Date().toISOString() }); ids.push(id);
      }
      patchRoom(room.id, { photoIds: [...room.photoIds, ...ids] });
    } catch { alert("Egy vagy több fotót nem sikerült elmenteni."); }
    finally { setPhotoBusyRoom(null); }
  };
  const removePhoto = async (room: Room, id: string) => { await deletePhoto(id); patchRoom(room.id, { photoIds: room.photoIds.filter(photoId => photoId !== id) }); };
  const download = () => { const blob = new Blob([JSON.stringify(createHomeFlowPayload({ ...form, status: "ready" }), null, 2)], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `ingatlanscan-homeflow-${form.id}.json`; a.click(); URL.revokeObjectURL(a.href); };
  const syncPhotos = async (silent = false) => {
    if (!form || !navigator.onLine) { if (!silent) alert("Nincs internetkapcsolat. A fotók helyben biztonságban maradnak, és később újrapróbálhatók."); return; }
    setSyncState("Szinkron…");
    const result = await syncIntakePhotos(form);
    if (result.reason) { setSyncState("Szinkron"); if (!silent) alert(result.reason); return; }
    setSyncState(result.failed ? `Hiba: ${result.failed}` : "Szinkronizálva");
    if (!silent) alert(`Képszinkron kész. Feltöltve: ${result.uploaded}, már fent volt: ${result.skipped}, hiba: ${result.failed}.`);
  };
  const newIntake = () => {
    if (!window.confirm("Új felmérést indítasz? A jelenlegi felmérés mentve marad a Felmérések között.")) return;
    startNewIntake();
  };
  const summaryRow = (label: string, value: string | undefined) => value ? <div className="summary-row"><span>{label}</span><strong>{value}</strong></div> : null;
  const copyAutoSummary = async () => {
    try {
      await navigator.clipboard.writeText(autoSummary);
      setSummaryCopied(true);
      window.setTimeout(() => setSummaryCopied(false), 1800);
    } catch {
      alert("A másolás nem sikerült. Jelöld ki az összegző szöveget és másold kézzel.");
    }
  };

  return <div className="app">
    <header className="header"><div className="header-main"><div className="brand"><img className="brand-logo" src="/icon.svg" alt="" /><div><h1>Ingatlan<span>Scan</span></h1><p>Érték a részletekben.</p></div></div><div className="header-tools"><span className="save">{saveState} · {done}% kész</span><button className="library-btn" onClick={() => { setIntakes(readIntakes()); setScreen("list"); }}>Felmérések</button><button className="new-btn" onClick={newIntake}>+ Új felmérés</button></div></div><div className="progress-box"><div className="progress-label"><span>{steps[step]}</span><span>{step + 1}/{steps.length}</span></div><div className="track"><div className="bar" style={{ width: `${(step + 1) / steps.length * 100}%` }} /></div></div></header>

    <main className="content"><section className="card screen-card"><div className="card-head"><div className="eyebrow">{step + 1}. lépés</div><h2>{steps[step]}</h2><p>{step === 4 ? "Add hozzá a helyiségeket, rögzítsd a fő jellemzőket és készíts fotókat közvetlenül telefonról." : step === 5 ? "Jelöld meg, mely dokumentumok és helyszíni tételek állnak már rendelkezésre." : step === 7 ? "Ellenőrizd az adatokat, add meg a fő értékesítési előnyöket, majd készíthetsz PDF-et." : "A mezők automatikusan mentődnek ezen az eszközön."}</p></div>
      {errors.length > 0 && <div className="error-box"><strong>Még szükséges:</strong> {errors.join(" · ")}</div>}
      <div className="fields">
        {step === 7 ? <SyncAccountPanel /> : null}
        {step === 0 && <>{input("Ingatlan címe", "property", "address", { required: true, placeholder: "Utca, házszám" })}{select("Ingatlan típusa", "property", "type", ["Társasházi lakás","Panel lakás","Családi ház","Ikerház","Sorház","Új építésű ház","Telek","Iroda","Üzlethelyiség","Garázs"], true)}{input("Település", "property", "city", { required: true })}{input("Irányítószám", "property", "postalCode")}{input("Városrész", "property", "district", { placeholder: "pl. Nagyerdő" })}{input("Helyrajzi szám", "property", "hrsz")}{input("Hasznos alapterület", "property", "floorArea", { type: "number", unit: "m²", required: true })}{input("Telekterület", "property", "lotArea", { type: "number", unit: "m²" })}{input("Építés éve", "property", "yearBuilt", { type: "number" })}{input("Szobák", "property", "rooms", { type: "number" })}{input("Félszobák", "property", "halfRooms", { type: "number" })}{input("Emelet", "property", "floor", { placeholder: "pl. 2. / földszint" })}{input("Épület szintjeinek száma", "property", "buildingLevels", { type: "number" })}{select("Tájolás", "property", "orientation", orientations)}{input("Erkély / terasz", "property", "balconyArea", { type: "number", unit: "m²" })}{select("Lift", "property", "elevator", ["Van","Nincs","Nem releváns"])}{select("Parkolás", "property", "parking", ["Utcán ingyenes","Utcán fizetős","Udvari beálló","Garázs","Teremgarázs","Beálló + garázs","Nincs"])}{select("Jelenlegi használat", "property", "occupancy", ["Tulajdonos lakja","Bérlő lakja","Üres","Építés alatt","Egyéb"])}</>}
        {step === 1 && <>{input("Tulajdonos neve", "owner", "name", { required: true })}{input("Telefonszám", "owner", "phone", { type: "tel", required: true })}{input("E-mail", "owner", "email", { type: "email" })}{select("Elsődleges kapcsolattartás", "owner", "contactPreference", ["Telefon","SMS","E-mail","Messenger","WhatsApp"])}<div className="full note">A személyes adatok helyben maradnak, amíg nem exportálod vagy később nem kapcsoljuk be a bejelentkezéshez kötött szinkronizálást.</div></>}
        {step === 2 && <><div className="full quick-hint"><strong>Gyors műszaki felvétel</strong><span>Érintsd meg a megfelelő választ. Csak a ritkább részleteket kell begépelni.</span></div>{quickSelect("Falazat", "walls", technicalOptions.walls)}{quickSelect("Szigetelés", "insulation", technicalOptions.insulation)}{quickSelect("Tető / fedés", "roof", technicalOptions.roof)}{quickSelect("Nyílászárók", "windows", technicalOptions.windows)}{quickSelect("Fűtés", "heating", technicalOptions.heating, true)}{quickSelect("Melegvíz", "hotWater", technicalOptions.hotWater)}{quickSelect("Hűtés / klíma", "cooling", technicalOptions.cooling)}{quickSelect("Energetikai besorolás", "energy", technicalOptions.energy)}{quickSelect("Állapot", "condition", technicalOptions.condition, true)}<div className="field full"><span className="label">Közművek</span><div className="choices compact">{utilityList.map(x => <label className="choice" key={x}><input type="checkbox" checked={form.technical.utilities.includes(x)} onChange={e => toggleArray("utilities", x, e.target.checked)} />{x}</label>)}</div></div><div className="field full"><label>Műszaki pontosítás <span className="optional">· opcionális</span></label><textarea className="technical-note" placeholder="Csak amit a választógombok nem fednek le…" value={form.technical.details} onChange={e => patch("technical", "details", e.target.value)} /></div></>}
        {step === 3 && <><div className="full quick-hint"><strong>Gyors értékesítési felvétel</strong><span>A legtöbb adat egy érintéssel rögzíthető. Csak az árnál kell gépelni.</span></div>{input("Tulajdonosi ár elképzelés", "sale", "expectedPriceM", { type: "number", unit: "M Ft", required: true })}{saleQuickSelect("Értékesítési prioritás", "priority", saleOptions.priority, true)}{saleQuickSelect("Eladás kívánt ideje", "desiredDate", saleOptions.desiredDate)}{saleQuickSelect("Értékesítés oka", "reason", saleOptions.reason)}{saleQuickSelect("Birtokbaadás", "possession", saleOptions.possession)}{saleQuickSelect("Teher / finanszírozás", "financing", saleOptions.financing)}{saleQuickSelect("Áralku", "negotiation", saleOptions.negotiation)}{saleQuickSelect("Megtekinthetőség", "viewing", saleOptions.viewing)}{saleQuickSelect("Kulcs / bejutás", "keyAccess", saleOptions.keyAccess)}{saleQuickSelect("Fotózás / hirdetési készültség", "marketingReadiness", saleOptions.marketingReadiness)}</>}

        {step === 4 && <div className="full rooms-step">
          <div className="quick-hint"><strong>Helyiségek felvétele</strong><span>Válassz helyiséget. Ezután csak a fontos adatokat kell megérinteni vagy röviden beírni. Helyiségenként legfeljebb 8 fotó menthető.</span></div>
          <div className="room-add-grid">{roomTypes.map(type => <button type="button" key={type} className="room-add" onClick={() => addRoom(type)}>+ {type}</button>)}</div>
          {form.rooms.length === 0 && <div className="empty-rooms"><strong>Még nincs helyiség hozzáadva.</strong><span>Például kezdd a nappalival, majd haladj végig az ingatlanon.</span></div>}
          <div className="room-list">{form.rooms.map((room, index) => <article className="room-card" key={room.id}>
            <div className="room-card-head"><div><span className="room-number">{index + 1}. helyiség</span><h3>{room.name || room.type}</h3></div><button type="button" className="room-delete" onClick={() => removeRoom(room)}>Törlés</button></div>
            <div className="room-fields"><div className="field"><label>Típus</label><select value={room.type} onChange={e => patchRoom(room.id, { type: e.target.value })}>{roomTypes.map(type => <option key={type}>{type}</option>)}</select></div><div className="field"><label>Elnevezés <span className="optional">· opcionális</span></label><input placeholder="pl. szülői háló" value={room.name} onChange={e => patchRoom(room.id, { name: e.target.value })} /></div></div>
            <span className="label">Méret</span><div className="room-measure"><div className="unit"><input inputMode="decimal" placeholder="hossz" value={room.length} onChange={e => patchRoom(room.id, { length: e.target.value })} /><span>m</span></div><b>×</b><div className="unit"><input inputMode="decimal" placeholder="szélesség" value={room.width} onChange={e => patchRoom(room.id, { width: e.target.value })} /><span>m</span></div><button type="button" className="calc-btn" onClick={() => calculateRoomArea(room)}>Számol</button><div className="unit area-unit"><input inputMode="decimal" placeholder="m²" value={room.area} onChange={e => patchRoom(room.id, { area: e.target.value })} /><span>m²</span></div></div>
            <div className="room-quick"><span className="label">Állapot</span><div className="quick-options">{roomConditions.map(option => <button type="button" key={option} className={`quick-option ${room.condition === option ? "selected" : ""}`} onClick={() => patchRoom(room.id, { condition: room.condition === option ? "" : option })}>{option}</button>)}</div></div>
            <div className="room-quick"><span className="label">Burkolat</span><div className="quick-options">{roomFloorings.map(option => <button type="button" key={option} className={`quick-option ${room.flooring === option ? "selected" : ""}`} onClick={() => patchRoom(room.id, { flooring: room.flooring === option ? "" : option })}>{option}</button>)}</div></div>
            <div className="room-quick"><span className="label">Tájolás</span><div className="quick-options">{orientations.map(option => <button type="button" key={option} className={`quick-option ${room.orientation === option ? "selected" : ""}`} onClick={() => patchRoom(room.id, { orientation: room.orientation === option ? "" : option })}>{option}</button>)}</div></div>
            <div className="field"><span className="label">Jellemzők</span><div className="choices room-features">{roomFeatures.map(feature => <label className="choice" key={feature}><input type="checkbox" checked={room.features.includes(feature)} onChange={() => toggleRoomFeature(room, feature)} />{feature}</label>)}</div></div>
            <div className="field"><label>Rövid megjegyzés <span className="optional">· opcionális</span></label><textarea className="room-note" placeholder="pl. új burkolat, fal javítandó, utcai zaj…" value={room.notes} onChange={e => patchRoom(room.id, { notes: e.target.value })} /></div>
            <div className="photo-box"><div className="photo-head"><div><span className="label">Fotók</span><small>{room.photoIds.length}/8 kép</small></div><label className={`photo-button ${photoBusyRoom === room.id ? "disabled" : ""}`}>📷 {photoBusyRoom === room.id ? "Mentés…" : "Fotó / képek"}<input type="file" accept="image/*" capture="environment" multiple disabled={photoBusyRoom === room.id} onChange={e => { void addPhotos(room, e.target.files); e.currentTarget.value = ""; }} /></label></div>
              {room.photoIds.length > 0 ? <div className="photo-grid">{room.photoIds.map((id, photoIndex) => <div className="photo-thumb" key={id}>{photoUrls[id] ? <img src={photoUrls[id]} alt={`${room.name || room.type} ${photoIndex + 1}. fotó`} /> : <div className="photo-loading">Kép…</div>}<button type="button" aria-label="Fotó törlése" onClick={() => void removePhoto(room, id)}>×</button></div>)}</div> : <p className="photo-empty">Készíts fotót közvetlenül a telefon kamerájával, vagy válassz képet a galériából.</p>}
            </div>
          </article>)}</div>
        </div>}

        {step === 5 && <div className="full documents-step">
          <div className="quick-hint"><strong>Dokumentum és helyszíni checklist</strong><span>Egy érintéssel jelöld, ami már megvan vagy a helyszínen megtörtént. A lista nem kötelező, később is kiegészíthető.</span></div>
          <div className="document-list">{documentItems.map(([key, label]) => <button type="button" key={key} className={`document-item ${form.documents[key] ? "checked" : ""}`} onClick={() => toggleDocument(key)}><span className="document-check">{form.documents[key] ? "✓" : ""}</span><strong>{label}</strong></button>)}</div>
          <div className="field"><label>Dokumentum megjegyzés <span className="optional">· opcionális</span></label><textarea className="document-note" placeholder="pl. energetika készül, alaprajzot a tulajdonos később küldi…" value={form.documents.notes} onChange={e => touch({ ...form, documents: { ...form.documents, notes: e.target.value } })} /></div>
        </div>}
        {step === 6 && <div className="full"><span className="label">Extrák és értéknövelő elemek</span><div className="choices">{extraList.map(x => <label className="choice" key={x}><input type="checkbox" checked={form.extras.includes(x)} onChange={e => toggleArray("extras", x, e.target.checked)} />{x}</label>)}</div></div>}
        {step === 7 && <><div className="full overview"><div><span className="overline">Felmérés</span><strong>{form.property.address || "Cím nélküli ingatlan"}</strong><small>{[form.property.city, form.property.district].filter(Boolean).join(" · ")}</small></div><div className="overview-stats"><b>{form.property.floorArea || "–"}<small> m²</small></b><b>{form.rooms.length}<small> helyiség</small></b><b>{form.sale.expectedPriceM || "–"}<small> M Ft</small></b></div></div><div className="full auto-summary"><div className="auto-summary-head"><div><span className="overline">Automatikus helyszíni kivonat</span><h3>Összefoglaló egyben</h3></div><button type="button" className="copy-summary" onClick={copyAutoSummary}>{summaryCopied ? "Másolva ✓" : "Másolás"}</button></div><pre>{autoSummary}</pre><small>Offline készül az eddig rögzített adatokból. Nem módosítja az adatlapot.</small></div>{([0,1,2] as const).map(i => <div className="field full" key={i}><label>{i + 1}. legerősebb értékesítési előny</label><input value={form.strengths[i]} onChange={e => { const strengths = [...form.strengths] as Intake["strengths"]; strengths[i] = e.target.value; touch({ ...form, strengths }); }} /></div>)}<div className="field full"><label>Helyszíni összegzés / megjegyzés</label><textarea placeholder="Állapot, tulajdonosi motiváció, javítandó pontok…" value={form.notes} onChange={e => touch({ ...form, notes: e.target.value })} /></div><div className="full review-grid"><div className="review"><h3>Ingatlan</h3>{summaryRow("Típus", form.property.type)}{summaryRow("Alapterület", form.property.floorArea ? `${form.property.floorArea} m²` : "")}{summaryRow("Helyiségek", String(form.rooms.length))}{summaryRow("Fotók", String(form.rooms.reduce((sum, room) => sum + room.photoIds.length, 0)))}{summaryRow("Állapot", form.technical.condition)}</div><div className="review"><h3>Értékesítés</h3>{summaryRow("Tulajdonos", form.owner.name)}{summaryRow("Telefon", form.owner.phone)}{summaryRow("Ár elképzelés", form.sale.expectedPriceM ? `${form.sale.expectedPriceM} M Ft` : "")}{summaryRow("Prioritás", form.sale.priority)}{summaryRow("Birtokbaadás", form.sale.possession)}{summaryRow("Áralku", form.sale.negotiation)}</div></div></>}
      </div></section>

      <section className="print-sheet"><div className="print-title"><div><h1>IngatlanScan</h1><p>Ingatlanfelvételi adatlap</p></div><strong>{new Date(form.createdAt).toLocaleDateString("hu-HU")}</strong></div><h2>{form.property.address || "Ingatlan"}</h2><p>{[form.property.postalCode, form.property.city, form.property.district].filter(Boolean).join(" · ")}</p><div className="print-grid"><div><h3>Ingatlan adatai</h3>{summaryRow("Típus", form.property.type)}{summaryRow("Alapterület", form.property.floorArea ? `${form.property.floorArea} m²` : "")}{summaryRow("Telek", form.property.lotArea ? `${form.property.lotArea} m²` : "")}{summaryRow("Építés éve", form.property.yearBuilt)}{summaryRow("Emelet", form.property.floor)}{summaryRow("Tájolás", form.property.orientation)}{summaryRow("Parkolás", form.property.parking)}{summaryRow("HRSZ", form.property.hrsz)}</div><div><h3>Tulajdonos</h3>{summaryRow("Név", form.owner.name)}{summaryRow("Telefon", form.owner.phone)}{summaryRow("E-mail", form.owner.email)}{summaryRow("Kapcsolattartás", form.owner.contactPreference)}</div><div><h3>Műszaki adatok</h3>{summaryRow("Állapot", form.technical.condition)}{summaryRow("Falazat", form.technical.walls)}{summaryRow("Szigetelés", form.technical.insulation)}{summaryRow("Tető", form.technical.roof)}{summaryRow("Nyílászárók", form.technical.windows)}{summaryRow("Fűtés", form.technical.heating)}{summaryRow("Hűtés", form.technical.cooling)}{summaryRow("Közművek", form.technical.utilities.join(", "))}</div><div><h3>Értékesítés</h3>{summaryRow("Ár elképzelés", form.sale.expectedPriceM ? `${form.sale.expectedPriceM} M Ft` : "")}{summaryRow("Prioritás", form.sale.priority)}{summaryRow("Kívánt idő", form.sale.desiredDate)}{summaryRow("Birtokbaadás", form.sale.possession)}{summaryRow("Áralku", form.sale.negotiation)}{summaryRow("Megtekinthetőség", form.sale.viewing)}</div></div>
      <div className="print-section"><h3>Automatikus helyszíni kivonat</h3><p className="preline">{autoSummary}</p></div>
      {form.rooms.length > 0 && <div className="print-section"><h3>Helyiségek</h3><div className="print-rooms">{form.rooms.map((room, i) => <div className="print-room" key={room.id}><strong>{i + 1}. {room.name || room.type}</strong><span>{[room.area && `${room.area} m²`, room.condition, room.flooring, room.orientation].filter(Boolean).join(" · ") || "–"}</span>{room.features.length > 0 && <small>{room.features.join(" · ")}</small>}{room.notes && <small>{room.notes}</small>}<small>{room.photoIds.length} fotó rögzítve</small></div>)}</div></div>}
      <div className="print-section"><h3>Dokumentum checklist</h3><div className="print-documents">{documentItems.map(([key, label]) => <span key={key}>{form.documents[key] ? "☑" : "☐"} {label}</span>)}</div>{form.documents.notes && <p className="preline document-print-note">{form.documents.notes}</p>}</div>
      {form.extras.length > 0 && <div className="print-section"><h3>Extrák</h3><p>{form.extras.join(" · ")}</p></div>}{form.strengths.some(Boolean) && <div className="print-section"><h3>Fő értékesítési előnyök</h3><ol>{form.strengths.filter(Boolean).map(x => <li key={x}>{x}</li>)}</ol></div>}{form.notes && <div className="print-section"><h3>Helyszíni összegzés</h3><p className="preline">{form.notes}</p></div>}</section>
    </main>
    <nav className="actions"><div className="actions-inner">{step === steps.length - 1 && <><button className="btn export" onClick={() => void syncPhotos(false)}>{syncState}</button><button className="btn export" onClick={download}>HomeFlow export</button></>}<button className="btn secondary" disabled={step === 0} onClick={() => { setErrors([]); setStep(s => s - 1); }}>Vissza</button>{step < steps.length - 1 && <button className="btn primary" onClick={next}>Tovább</button>}<button className="btn pdf" onClick={() => window.print()}>PDF / Nyomtatás</button></div></nav>
  </div>;
}
