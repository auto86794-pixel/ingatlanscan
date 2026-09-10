import { normalizeIntake, type Intake } from "./model";

const CURRENT_KEY = "ingatlanscan:intake:v1";
const LIST_KEY = "ingatlanscan:intakes:v1";

function sortIntakes(items: Intake[]) {
  return [...items].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function readIntakes(): Intake[] {
  try {
    const raw = localStorage.getItem(LIST_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return sortIntakes(parsed.map(normalizeIntake));
    }
    const current = readDraft();
    if (current) {
      localStorage.setItem(LIST_KEY, JSON.stringify([current]));
      return [current];
    }
    return [];
  } catch {
    return [];
  }
}

export function readDraft(): Intake | null {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    return raw ? normalizeIntake(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export function writeDraft(value: Intake) {
  const next = { ...value, updatedAt: new Date().toISOString() };
  localStorage.setItem(CURRENT_KEY, JSON.stringify(next));

  const items = readIntakes();
  const exists = items.some(item => item.id === next.id);
  const updated = exists
    ? items.map(item => item.id === next.id ? next : item)
    : [next, ...items];
  localStorage.setItem(LIST_KEY, JSON.stringify(sortIntakes(updated)));
}

export function selectDraft(value: Intake) {
  localStorage.setItem(CURRENT_KEY, JSON.stringify(value));
}

export function deleteDraft(id: string) {
  const items = readIntakes().filter(item => item.id !== id);
  localStorage.setItem(LIST_KEY, JSON.stringify(items));
  const current = readDraft();
  if (current?.id === id) localStorage.removeItem(CURRENT_KEY);
}

export function clearDraft() {
  localStorage.removeItem(CURRENT_KEY);
}
