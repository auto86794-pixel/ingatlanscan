"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase-client";

function authErrorMessage(error: unknown, fallback: string) {
  const message = error instanceof Error ? error.message : String(error ?? "");

  if (/invalid login credentials/i.test(message)) {
    return "Hibás e-mail-cím vagy jelszó.";
  }
  if (/email not confirmed/i.test(message)) {
    return "Az e-mail-cím még nincs megerősítve.";
  }
  if (/failed to fetch|network|timeout/i.test(message)) {
    return "A bejelentkezési szolgáltatás most nem érhető el. Ellenőrizd az internetkapcsolatot, majd próbáld újra.";
  }

  return fallback;
}

export default function SyncAccountPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedInAs, setSignedInAs] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;
    void (async () => {
      try {
        const supabase = await getSupabaseClient();
        if (!supabase) return;

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
          if (active) setSignedInAs(session?.user.email ?? null);
        });
        unsubscribe = () => listener.subscription.unsubscribe();

        if (!active) {
          unsubscribe();
          return;
        }

        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (active) setSignedInAs(data.session?.user.email ?? null);

        if (data.session) {
          const { data: verified, error: verifyError } = await supabase.auth.getUser();
          if (!verifyError && verified.user && active) {
            setSignedInAs(verified.user.email ?? null);
          }
        }
      } catch (error) {
        console.error("[sync-auth] A munkamenet ellenőrzése nem sikerült.", error);
        if (active) setMessage("A bejelentkezési szolgáltatás most nem érhető el. Próbáld újra később.");
      }
    })();
    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) {
        setMessage("A bejelentkezési szolgáltatás nincs megfelelően beállítva.");
        return;
      }
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) {
        setMessage(authErrorMessage(error, "A bejelentkezés nem sikerült. Ellenőrizd az adatokat, majd próbáld újra."));
        return;
      }
      setPassword("");
      setMessage("Sikeres bejelentkezés. A felmérés szinkronizálható.");
    } catch (error) {
      console.error("[sync-auth] A bejelentkezés nem sikerült.", error);
      setMessage(authErrorMessage(error, "Váratlan háttérhiba történt a bejelentkezéskor. Próbáld újra."));
    } finally {
      setBusy(false);
    }
  }

  async function requestPasswordReset() {
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setMessage("Előbb add meg az IngatlanScan e-mail-címedet.");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) {
        setMessage("A bejelentkezési szolgáltatás nincs megfelelően beállítva.");
        return;
      }
      const redirectTo = `${window.location.origin}/auth/recovery`;
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, { redirectTo });
      setMessage(error
        ? authErrorMessage(error, "A jelszó-helyreállító e-mail küldése nem sikerült. Próbáld újra.")
        : "Elküldtük a jelszó-helyreállító e-mailt. Nyisd meg a benne lévő linket ezen az eszközön.");
    } catch (error) {
      console.error("[sync-auth] A jelszó-helyreállítás nem sikerült.", error);
      setMessage(authErrorMessage(error, "Váratlan háttérhiba történt. Próbáld újra."));
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    setBusy(true);
    setMessage("");
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) {
        setMessage("A bejelentkezési szolgáltatás nincs megfelelően beállítva.");
        return;
      }
      const { error } = await supabase.auth.signOut();
      setMessage(error ? "A kijelentkezés nem sikerült." : "Kijelentkeztél.");
    } catch (error) {
      console.error("[sync-auth] A kijelentkezés nem sikerült.", error);
      setMessage(authErrorMessage(error, "Váratlan háttérhiba történt a kijelentkezéskor."));
    } finally {
      setBusy(false);
    }
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
