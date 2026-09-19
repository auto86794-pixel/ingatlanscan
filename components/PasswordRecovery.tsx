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
    let mounted = true;
    let unsubscribe: (() => void) | undefined;

    void (async () => {
      // A recovery bizonyítékát még a Supabase kliens létrehozása előtt olvassuk ki,
      // mert a kliens detectSessionInUrl funkciója közben eltávolíthatja/feldolgozhatja.
      const initialUrl = new URL(window.location.href);
      const code = initialUrl.searchParams.get("code");
      const hash = new URLSearchParams(initialUrl.hash.replace(/^#/, ""));
      const hashType = hash.get("type");
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");
      const hasRecoveryEvidence = Boolean(code || hashType === "recovery" || accessToken);

      const supabase = await getSupabaseClient();
      if (!supabase || !mounted) {
        if (mounted) setMessage("A jelszó-helyreállítás most nem érhető el.");
        return;
      }

      const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
        if (!mounted) return;
        if (event === "PASSWORD_RECOVERY" && session?.user) {
          setReady(true);
          setMessage("");
        }
      });
      unsubscribe = () => listener.subscription.unsubscribe();

      let sessionReady = false;

      // PKCE recovery link: ?code=... -> valódi session csere.
      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error && data.session?.user) sessionReady = true;
        // detectSessionInUrl esetén előfordulhat, hogy a kliens már feldolgozta a code-ot.
        if (error) {
          const { data: current } = await supabase.auth.getSession();
          if (current.session?.user) sessionReady = true;
        }
      }

      // Régebbi implicit recovery link: #access_token=...&refresh_token=...&type=recovery
      if (!sessionReady && hashType === "recovery" && accessToken && refreshToken) {
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (!error && data.session?.user) sessionReady = true;
      }

      // Ha a Supabase kliens automatikusan már feldolgozta a recovery URL-t,
      // a recovery bizonyíték megléte mellett a létrejött session elfogadható.
      if (!sessionReady && hasRecoveryEvidence) {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) sessionReady = true;
      }

      if (!mounted) return;
      if (sessionReady) {
        cleanRecoveryUrl();
        setReady(true);
        setMessage("");
      } else {
        setReady(false);
        setMessage("A helyreállító link lejárt vagy érvénytelen. Kérj új helyreállító linket a belépési képernyőn.");
      }
    })();

    return () => {
      mounted = false;
      unsubscribe?.();
    };
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

    // Mentés előtt még egyszer ellenőrizzük, hogy ténylegesen van-e hitelesített session.
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session?.user) {
      setBusy(false);
      setReady(false);
      setMessage("A helyreállító munkamenet lejárt. Kérj új helyreállító linket, és próbáld újra.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);

    if (error) {
      setMessage(`Az új jelszó mentése nem sikerült: ${error.message}`);
      return;
    }

    setPassword("");
    setConfirmPassword("");
    setReady(false);
    setCompleted(true);
    setMessage("Az új jelszó sikeresen elmentve. Most már beléphetsz vele.");
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
