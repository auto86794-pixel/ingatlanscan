"use client";

import { useState } from "react";

const STORAGE_KEY = "ingatlanscan-welcome-seen-v1";

export default function WelcomeCover({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false);

  function enter() {
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
    setEntered(true);
  }

  if (entered) return <>{children}</>;

  return (
    <main className="welcome-cover">
      <div className="welcome-glow welcome-glow-one" />
      <div className="welcome-glow welcome-glow-two" />
      <span className="welcome-version">v1.0.0</span>
      <section className="welcome-inner" aria-label="IngatlanScan üdvözlő képernyő">
        <div className="welcome-brand">
          <img src="/logo.png" alt="IngatlanScan" className="welcome-logo" />
          <h1><span>Ingatlan</span>Scan</h1>
          <p>Érték a részletekben.</p>
        </div>

        <div className="welcome-copy">
          <h2>Gyorsabb felmérés.<br />Pontosabb adatok.<br /><strong>Nagyobb lehetőségek.</strong></h2>
        </div>

        <div className="welcome-features">
          <div><b>⌂</b><span>Felmérés<br />helyben</span></div>
          <div><b>▤</b><span>Pontos<br />adatlap</span></div>
          <div><b>☁</b><span>Offline is<br />működik</span></div>
          <div><b>↻</b><span>Szinkron<br />HomeFlow-val</span></div>
        </div>

        <button className="welcome-enter" onClick={enter} type="button" aria-label="Belépés az IngatlanScan alkalmazásba">
          <span className="welcome-lock">▣</span> Belépés <span aria-hidden="true">→</span>
        </button>
        <p className="welcome-professional">Professzionális eszköz ingatlanosoknak</p>
        <div className="welcome-footer"><i /> <span>INGATLAN. ADATBAN AZ ERŐ.</span> <i /></div>
      </section>
    </main>
  );
}
