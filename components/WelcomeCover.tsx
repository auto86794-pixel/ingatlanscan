"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";

const IntakeApp = dynamic(() => import("@/components/IntakeApp"), {
  ssr: false,
  loading: () => (
    <main className="app-start-loading" role="status" aria-live="polite">
      <img src="/icon.svg" alt="" />
      <strong>IngatlanScan</strong>
      <span>Betöltés…</span>
    </main>
  ),
});

export default function WelcomeCover() {
  const [entered, setEntered] = useState(false);

  if (entered) return <IntakeApp />;

  return (
    <main className="welcome-photo-screen" aria-label="IngatlanScan üdvözlő képernyő">
      <section className="welcome-photo-card">
        <Image
          src="/welcome-cover-light.png"
          alt="IngatlanScan – Érték a részletekben. Gyorsabb felmérés, pontosabb adatok, nagyobb lehetőségek."
          className="welcome-photo-art"
          fill
          priority
          sizes="(max-width: 760px) 100vw, 760px"
        />
        <button
          className="welcome-photo-enter"
          type="button"
          onClick={() => setEntered(true)}
          aria-label="Belépés az IngatlanScan alkalmazásba"
        >
          <span className="sr-only">Belépés az IngatlanScan alkalmazásba</span>
        </button>
      </section>
    </main>
  );
}
