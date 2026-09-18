"use client";

import { useState } from "react";

export default function WelcomeCover({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false);

  if (entered) return <>{children}</>;

  return (
    <main className="welcome-photo-screen" aria-label="IngatlanScan üdvözlő képernyő">
      <section className="welcome-photo-card">
        <img
          src="/welcome-cover-light.png"
          alt="IngatlanScan – Érték a részletekben. Gyorsabb felmérés, pontosabb adatok, nagyobb lehetőségek."
          className="welcome-photo-art"
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
