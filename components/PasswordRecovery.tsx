"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase-client";

export default function PasswordRecovery() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("A helyreállító link ellenőrzése…");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let mounted = true;
    let unsubscribe: (() => void) | undefined;

    void (async () => {
      const supabase = await getSupabaseClient();
      if (!supabase || !mounted) {
        if (mounted) setMessage("A jelszó-helyreállítás most nem érhető el.");
        return;
      }

      const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
        if (!mounted) return;
        if (event === "PASSWORD_RECOVERY" || session?.user) {
          setReady(true);
          setMessage("");
        }
      });
      unsubscribe = () => listener.subscription.unsubscribe();

      // A Supabase a recovery URL hash/code feldolgozását aszinkron végzi.
      // Ha a session már elkészült, ne várjunk külön PASSWORD_RECOVERY eseményre.
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      if (data.session?.user) {
        setReady(true);
        setMessage("");
      } else {
        window.setTimeout(() => {
          if (mounted) setMessage((current) => current || "A helyreállító link lejárt vagy érvénytelen. Kérj új linket a belépési képernyőn.");
        }, 2500);
      }
    })();

    return () => {
      mounted = false;
      unsubscribe?.();
    };
  }, []);

  async function savePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 8) {
      setMessage("Az új jelszó legalább 8 karakter legyen.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("A két új jelszó nem egyezik.");
      return;
    }

    const supabase = await getSupabaseClient();
    if (!supabase) {
      setMessage("A jelszó-helyreállítás most nem érhető el.");
      return;
    }

    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);

    if (error) {
      setMessage("Az új jelszó mentése nem sikerült. Kérj új helyreállító linket, és próbáld újra.");
      return;
    }

    setPassword("");
    setConfirmPassword("");
    setReady(false);
    setMessage("Az új jelszó elmentve. Most már beléphetsz vele.");
  }

  return (
    <main className="recovery-screen">
      <section className="recovery-card" aria-label="Új jelszó beállítása">
        <div className="recovery-brand"><span>Ingatlan</span><strong>Scan</strong></div>
        <p className="recovery-kicker">Biztonságos fiók-helyreállítás</p>
        <h1>Új jelszó beállítása</h1>
        <p className="recovery-copy">Adj meg egy új, legalább 8 karakteres jelszót a HomeFlow-fiókodhoz.</p>

        {ready ? (
          <form className="recovery-form" onSubmit={savePassword}>
            <label>Új jelszó
              <input type="password" autoComplete="new-password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>Új jelszó még egyszer
              <input type="password" autoComplete="new-password" minLength={8} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
            <button type="submit" className="welcome-code-enter recovery-submit" disabled={busy}>{busy ? "Mentés…" : "Új jelszó mentése"}</button>
          </form>
        ) : null}

        {message ? <p className="recovery-message" role="status">{message}</p> : null}
        <a className="recovery-back" href="/">← Vissza az IngatlanScanhez</a>
        <small>A jelszót a Supabase Auth kezeli; az IngatlanScan nem menti el.</small>
      </section>
    </main>
  );
}
