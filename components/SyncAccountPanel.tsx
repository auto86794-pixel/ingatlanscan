"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase-client";

export default function SyncAccountPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedInAs, setSignedInAs] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    void (async () => {
      const supabase = await getSupabaseClient();
      if (!supabase) return;

      const { data } = await supabase.auth.getUser();
      setSignedInAs(data.user?.email ?? null);

      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setSignedInAs(session?.user.email ?? null);
      });
      unsubscribe = () => listener.subscription.unsubscribe();
    })();
    return () => unsubscribe?.();
  }, []);

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = await getSupabaseClient();
    if (!supabase) {
      setMessage("A szinkron környezeti változói nincsenek beállítva.");
      return;
    }
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) {
      setMessage(`A bejelentkezés nem sikerült: ${error.message}`);
      return;
    }
    setPassword("");
    setMessage("Sikeres bejelentkezés. A felmérés szinkronizálható.");
  }

  async function requestPasswordReset() {
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setMessage("Előbb add meg az IngatlanScan e-mail-címedet.");
      return;
    }
    const supabase = await getSupabaseClient();
    if (!supabase) {
      setMessage("A szinkron környezeti változói nincsenek beállítva.");
      return;
    }
    setBusy(true);
    setMessage("");
    const redirectTo = `${window.location.origin}/auth/recovery`;
    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, { redirectTo });
    setBusy(false);
    setMessage(error
      ? `A jelszó-helyreállító e-mail küldése nem sikerült: ${error.message}`
      : "Elküldtük a jelszó-helyreállító e-mailt. Nyisd meg a benne lévő linket ezen az eszközön.");
  }

  async function signOut() {
    const supabase = await getSupabaseClient();
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.auth.signOut();
    setBusy(false);
    setMessage(error ? "A kijelentkezés nem sikerült." : "Kijelentkeztél.");
  }

  if (signedInAs) {
    return (
      <section className="full sync-account" aria-label="HomeFlow szinkronfiók">
        <div>
          <span className="overline">HomeFlow kapcsolat</span>
          <strong>Bejelentkezve</strong>
          <small>{signedInAs}</small>
        </div>
        <button type="button" className="btn secondary" disabled={busy} onClick={() => void signOut()}>Kijelentkezés</button>
        {message ? <p role="status">{message}</p> : null}
      </section>
    );
  }

  return (
    <form className="full sync-account sync-login" onSubmit={signIn}>
      <div className="sync-account-heading">
        <span className="overline">HomeFlow kapcsolat</span>
        <strong>Jelentkezz be a szinkronhoz</strong>
        <small>A jelszót a Supabase Auth kezeli; az IngatlanScan nem menti el.</small>
      </div>
      <label>
        E-mail
        <input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Jelszó
        <input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <div className="sync-login-actions">
        <button type="submit" className="btn primary" disabled={busy}>{busy ? "Belépés…" : "Belépés"}</button>
        <button type="button" className="btn secondary" disabled={busy} onClick={() => void requestPasswordReset()}>Elfelejtettem a jelszavam</button>
      </div>
      {message ? <p role="alert">{message}</p> : null}
    </form>
  );
}
