"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    // A borító már látszik, közben előtöltjük az alkalmazás chunkját.
    // Így mobilon a Belépés gomb után nem kell a nagy csomagra várni.
    void import("@/components/IntakeApp");

    // Régi statikus/PWA verziók service workere mobilon még vezérelheti az oldalt.
    // Az aktuális Next.js alkalmazás nem használ service workert, ezért biztonságosan
    // eltávolítjuk a legacy regisztrációt és annak cache-ét.
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.getRegistrations().then((registrations) =>
        Promise.all(registrations.map((registration) => registration.unregister())),
      );
    }
    if ("caches" in window) {
      void caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("ingatlanscan-"))
            .map((key) => caches.delete(key)),
        ),
      );
    }
  }, []);

  const enterApp = () => setEntered(true);

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
          onClick={enterApp}
          onPointerUp={enterApp}
          aria-label="Belépés az IngatlanScan alkalmazásba"
        >
          <span className="sr-only">Belépés az IngatlanScan alkalmazásba</span>
        </button>
      </section>
    </main>
  );
}
