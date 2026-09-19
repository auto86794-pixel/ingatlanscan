"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import PasswordRecoveryPanel from "@/components/PasswordRecoveryPanel";

export default function WelcomeCover({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false);
  const [recovering, setRecovering] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    setRecovering(params.get("type") === "recovery" && params.has("access_token"));
  }, []);

  if (recovering) return <PasswordRecoveryPanel onComplete={() => { setRecovering(false); setEntered(true); }} />;
  if (entered) return <>{children}</>;

  return (
    <main className="welcome-photo-screen" aria-label="IngatlanScan üdvözlő képernyő">
      <section className="welcome-photo-card">
        <Image src="/welcome-cover-light.png" alt="IngatlanScan – Érték a részletekben. Gyorsabb felmérés, pontosabb adatok, nagyobb lehetőségek." className="welcome-photo-art" fill priority sizes="(max-width: 760px) 100vw, 75vh" />
        <button className="welcome-photo-enter" type="button" onClick={() => setEntered(true)} aria-label="Belépés az IngatlanScan alkalmazásba"><span className="sr-only">Belépés az IngatlanScan alkalmazásba</span></button>
      </section>
    </main>
  );
}
