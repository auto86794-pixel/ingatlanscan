"use client";

import { useEffect, useState } from "react";

import ClientPicker from "@/components/client/ClientPicker";
import { getClients } from "@/lib/clients";

import { Client } from "@/types/client";

export default function SearchSelectTestPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClients() {
      try {
        const result = await getClients();
        setClients(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadClients();
  }, []);

  if (loading) {
    return (
      <div className="max-w-md p-8">
        Ügyfelek betöltése...
      </div>
    );
  }

  return (
    <div className="max-w-md space-y-6 p-8">
      <h1 className="text-2xl font-bold">
        ClientPicker teszt
      </h1>

      <ClientPicker
        clients={clients}
        value={selected}
        onChange={setSelected}
      />

      <div>
        Kiválasztott ID: <strong>{selected ?? "nincs"}</strong>
      </div>
    </div>
  );
}