"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase-client";

function cleanRecoveryUrl() {
  window.history.replaceState({}, document.title, window.location.pathname);
}

export default function PasswordRecovery() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("A helyreállító link ellenőrzése…");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let active = true;

    void (async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const hash = new URLSearchParams(url.hash.replace(/^#/, ""));
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");
      const type = hash.get("type");

      const supabase = await getSupabaseClient();
      if (!active) return;
      if (!supabase) {
        setMessage("A jelszó-helyreállítás most nem érhető el.");
        return;
      }

      let recoverySessionReady = false;
      let recoveryError = "";

      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        recoverySessionReady = Boolean(!error && data.session?.user);
        recoveryError = error?.message ?? "";
      } else if (type === "recovery" && accessToken && refreshToken) {
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        recoverySessionReady = Boolean(!error && data.session?.user);
        recoveryError = error?.message ?? "";
      }

      if (!active) return;
      if (!recoverySessionReady) {
        setMessage(recoveryError
          ? `A helyreállító link nem használható: ${recoveryError}`
          : "A helyreállító link lejárt vagy érvénytelen. Kérj új helyreállító linket a belépési képernyőn.");
        return;
      }

      cleanRecoveryUrl();
      setReady(true);
      setMessage("");
    })();

    return () => { active = false; };
  }, []);

  async function savePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || busy) return;
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

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      setBusy(false);
      setReady(false);
      setMessage(`A helyreállító munkamenet nem érvényes${userError?.message ? `: ${userError.message}` : "."}`);
      return;
    }

    const { data, error } = await supabase.auth.updateUser({ password });
    if (error || !data.user) {
      setBusy(false);
      setMessage(`Az új jelszó mentése nem sikerült${error?.message ? `: ${error.message}` : "."}`);
      return;
    }

    // A recovery munkamenet ne maradjon normál bejelentkezésként aktív.
    // Így a következő belépés valóban az új jelszót ellenőrzi.
    const { error: signOutError } = await supabase.auth.signOut();
    setBusy(false);

    if (signOutError) {
      setMessage(`Az új jelszó elmentve, de az ideiglenes munkamenet lezárása nem sikerült: ${signOutError.message}`);
      return;
    }

    setPassword("");
    setConfirmPassword("");
    setReady(false);
    setCompleted(true);
    setMessage("Az új jelszó sikeresen elmentve. Jelentkezz be vele az IngatlanScanben.");
  }

  return (
    <main className="recovery-screen">
      <section className="recovery-card" aria-label="Új jelszó beállítása">
        <div className="recovery-brand"><span>Ingatlan</span><strong>Scan</strong></div>
        <p className="recovery-kicker">Biztonságos fiók-helyreállítás</p>
        <h1>Új jelszó beállítása</h1>
        <p className="recovery-copy">Adj meg egy új, legalább 8 karakteres jelszót az IngatlanScan-fiókodhoz.</p>

        {ready && !completed ? (
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
        <a className="recovery-back" href="/">← {completed ? "Belépés az IngatlanScanbe" : "Vissza az IngatlanScanhez"}</a>
        <small>A jelszót a Supabase Auth kezeli; az IngatlanScan nem menti el.</small>
      </section>
    </main>
  );
}
