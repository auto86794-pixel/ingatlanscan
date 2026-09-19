"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase-client";

export default function SyncAccountPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signedInAs, setSignedInAs] = useState<string | null>(null);
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    void (async () => {
      const supabase = await getSupabaseClient();
      if (!supabase) return;

      const { data } = await supabase.auth.getUser();
      setSignedInAs(data.user?.email ?? null);

      const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
        setSignedInAs(session?.user.email ?? null);
        if (event === "PASSWORD_RECOVERY") {
          setRecoveryMode(true);
          setMessage("Adj meg egy új jelszót a HomeFlow-fiókhoz.");
        }
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
      setMessage("A bejelentkezés nem sikerült. Ellenőrizd az e-mail-címet és a jelszót.");
      return;
    }
    setPassword("");
    setMessage("Sikeres bejelentkezés. A felmérés szinkronizálható.");
  }

  async function requestPasswordReset() {
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setMessage("Előbb add meg a HomeFlow e-mail-címedet.");
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
      ? "A jelszó-helyreállító e-mail küldése nem sikerült."
      : "Elküldtük a jelszó-helyreállító e-mailt. Nyisd meg a benne lévő linket ezen az eszközön.");
  }

  async function updatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newPassword.length < 8) {
      setMessage("Az új jelszó legalább 8 karakter legyen.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("A két új jelszó nem egyezik.");
      return;
    }
    const supabase = await getSupabaseClient();
    if (!supabase) return;
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setBusy(false);
    if (error) {
      setMessage("Az új jelszó mentése nem sikerült. Kérj új helyreállító linket, és próbáld újra.");
      return;
    }
    setNewPassword("");
    setConfirmPassword("");
    setRecoveryMode(false);
    setMessage("Az új jelszó elmentve. A HomeFlow kapcsolat aktív.");
    if (window.history.replaceState) window.history.replaceState({}, document.title, window.location.pathname);
  }

  async function signOut() {
    const supabase = await getSupabaseClient();
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.auth.signOut();
    setBusy(false);
    setMessage(error ? "A kijelentkezés nem sikerült." : "Kijelentkeztél.");
  }

  if (recoveryMode) {
    return (
      <form className="full sync-account sync-login" onSubmit={updatePassword}>
        <div className="sync-account-heading">
          <span className="overline">HomeFlow kapcsolat</span>
          <strong>Új jelszó beállítása</strong>
          <small>A jelszót a Supabase Auth kezeli; az IngatlanScan nem menti el.</small>
        </div>
        <label>
          Új jelszó
          <input type="password" autoComplete="new-password" minLength={8} required value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
        </label>
        <label>
          Új jelszó még egyszer
          <input type="password" autoComplete="new-password" minLength={8} required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        </label>
        <button type="submit" className="btn primary" disabled={busy}>{busy ? "Mentés…" : "Új jelszó mentése"}</button>
        {message ? <p role="status">{message}</p> : null}
      </form>
    );
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
