"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function WelcomeCover() {
  useEffect(() => {
    // Legacy PWA/service-worker takarítás. A belépés ettől függetlenül natív link,
    // ezért mobilon a React hidratáció késése sem tudja blokkolni.
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.getRegistrations().then((registrations) =>
        Promise.all(registrations.map((registration) => registration.unregister())),
      );
    }
    if ("caches" in window) {
      void caches.keys().then((keys) =>
        Promise.all(keys.filter((key) => key.startsWith("ingatlanscan-")).map((key) => caches.delete(key))),
      );
    }
  }, []);

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
        <a
          className="welcome-photo-enter"
          href="/scan"
          aria-label="Belépés az IngatlanScan alkalmazásba"
        >
          <span className="sr-only">Belépés az IngatlanScan alkalmazásba</span>
        </a>
      </section>
    </main>
  );
}
