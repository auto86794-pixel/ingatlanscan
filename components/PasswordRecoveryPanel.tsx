"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase-client";

export default function PasswordRecoveryPanel({ onComplete }: { onComplete: () => void }) {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("A helyreállító link ellenőrzése…");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let active = true;
    void (async () => {
      const supabase = await getSupabaseClient();
      if (!active) return;
      if (!supabase) { setMessage("A szinkron környezeti változói nincsenek beállítva."); return; }
      const { data, error } = await supabase.auth.getSession();
      if (!active) return;
      if (error || !data.session) { setMessage("A helyreállító link lejárt vagy érvénytelen. Kérj új helyreállító e-mailt."); return; }
      window.history.replaceState({}, document.title, window.location.pathname);
      setReady(true);
      setMessage("");
    })();
    return () => { active = false; };
  }, []);

  async function updatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 8) { setMessage("Az új jelszó legalább 8 karakter legyen."); return; }
    if (password !== confirmation) { setMessage("A két új jelszó nem egyezik."); return; }
    const supabase = await getSupabaseClient();
    if (!supabase) return;
    setBusy(true); setMessage("");
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { setMessage("Az új jelszó mentése nem sikerült. Kérj új helyreállító linket."); return; }
    setPassword(""); setConfirmation(""); setCompleted(true);
    setMessage("Az új jelszó elmentve. A HomeFlow kapcsolat aktív.");
  }

  return (
    <main className="password-recovery-screen"><section className="password-recovery-card" aria-labelledby="password-recovery-title">
      <span className="overline">HomeFlow kapcsolat</span><h1 id="password-recovery-title">Új jelszó beállítása</h1>
      <p>A jelszót a Supabase Auth kezeli; az IngatlanScan nem menti el.</p>
      {completed ? <button type="button" className="btn primary" onClick={onComplete}>Tovább az alkalmazásba</button> :
        <form onSubmit={updatePassword}>
          <label>Új jelszó<input type="password" autoComplete="new-password" minLength={8} required disabled={!ready || busy} value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          <label>Új jelszó még egyszer<input type="password" autoComplete="new-password" minLength={8} required disabled={!ready || busy} value={confirmation} onChange={(event) => setConfirmation(event.target.value)} /></label>
          <button type="submit" className="btn primary" disabled={!ready || busy}>{busy ? "Mentés…" : "Új jelszó mentése"}</button>
        </form>}
      {message ? <p className="password-recovery-message" role="status">{message}</p> : null}
    </section></main>
  );
}
