import { normalizeIntake, type Intake } from "./model";
const KEY = "ingatlanscan:intake:v1";
export function readDraft(): Intake | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? normalizeIntake(JSON.parse(raw)) : null;
  } catch { return null; }
}
export function writeDraft(value: Intake) {
  localStorage.setItem(KEY, JSON.stringify({ ...value, updatedAt: new Date().toISOString() }));
}
export function clearDraft() { localStorage.removeItem(KEY); }
