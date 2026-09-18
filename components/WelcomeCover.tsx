"use client";

import { useState } from "react";

const features = [
  ["⌂", "Felmérés", "helyben"],
  ["▤", "Pontos", "adatlap"],
  ["☁", "Offline is", "működik"],
  ["↻", "Szinkron", "HomeFlow-val"],
];

export default function WelcomeCover({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false);
  if (entered) return <>{children}</>;

  return (
    <main className="welcome-code-screen" aria-label="IngatlanScan üdvözlő képernyő">
      <div className="welcome-code-bg" aria-hidden="true" />
      <div className="welcome-code-shade" aria-hidden="true" />
      <span className="welcome-code-version">v1.0.0</span>

      <section className="welcome-code-content">
        <div className="welcome-code-mark" aria-hidden="true">
          <span className="welcome-code-roof">⌂</span><span className="welcome-code-lens" />
        </div>
        <h1><span>Ingatlan</span>Scan</h1>
        <p className="welcome-code-tagline">Érték a részletekben.</p>

        <h2>Gyorsabb felmérés.<br/>Pontosabb adatok.<br/><strong>Nagyobb lehetőségek.</strong></h2>

        <div className="welcome-code-features">
          {features.map(([icon, a, b]) => (
            <div key={a}><b aria-hidden="true">{icon}</b><span>{a}<br/>{b}</span></div>
          ))}
        </div>

        <button className="welcome-code-enter" type="button" onClick={() => setEntered(true)}>
          <span aria-hidden="true">▣</span> Belépés <span aria-hidden="true">→</span>
        </button>
        <p className="welcome-code-pro">Professzionális eszköz ingatlanosoknak</p>
        <div className="welcome-code-footer"><i/>INGATLAN. ADATBAN AZ ERŐ.<i/></div>
      </section>
    </main>
  );
}
