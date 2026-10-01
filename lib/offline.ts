import { normalizeIntake, type Intake } from "./model";

const CURRENT_KEY = "ingatlanscan:intake:v1";
const LIST_KEY = "ingatlanscan:intakes:v1";

function sortIntakes(items: Intake[]) {
  return [...items].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

function safeGet(key: string) {
  try { return localStorage.getItem(key); } catch { return null; }
}

function safeSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(`IngatlanScan: a helyi mentés sikertelen (${key}).`, error);
    return false;
  }
}

function safeRemove(key: string) {
  try { localStorage.removeItem(key); } catch { /* A tároló hibája nem blokkolhatja az appot. */ }
}

export function readIntakes(): Intake[] {
  try {
    const raw = safeGet(LIST_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return sortIntakes(parsed.map(normalizeIntake));
    }
    const current = readDraft();
    if (current) {
      safeSet(LIST_KEY, JSON.stringify([current]));
      return [current];
    }
    return [];
  } catch {
    return [];
  }
}

export function readDraft(): Intake | null {
  try {
    const raw = safeGet(CURRENT_KEY);
    return raw ? normalizeIntake(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export function writeDraft(value: Intake) {
  // Az updatedAt a tényleges adatváltozás időpontja. Egy sima automatikus
  // mentés vagy szinkronállapot-változás nem teheti újabbá a felmérést.
  const next = { ...value };
  safeSet(CURRENT_KEY, JSON.stringify(next));

  const items = readIntakes();
  const exists = items.some(item => item.id === next.id);
  const updated = exists
    ? items.map(item => item.id === next.id ? next : item)
    : [next, ...items];
  safeSet(LIST_KEY, JSON.stringify(sortIntakes(updated)));
}

export function selectDraft(value: Intake) {
  safeSet(CURRENT_KEY, JSON.stringify(value));
}

export function deleteDraft(id: string) {
  const items = readIntakes().filter(item => item.id !== id);
  safeSet(LIST_KEY, JSON.stringify(items));
  const current = readDraft();
  if (current?.id === id) safeRemove(CURRENT_KEY);
}

export function clearDraft() {
  safeRemove(CURRENT_KEY);
}
