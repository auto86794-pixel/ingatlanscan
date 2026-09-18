"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { caseRepository } from "@/lib/repositories/case-repository";

import type { Case } from "@/types/case";
import type { Client } from "@/types/client";

import Button from "@/components/ui/Button";
import ClientPicker from "@/components/client/ClientPicker";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

type CaseFormProps = {
  initialData?: Case;
  clients: Client[];
};

export default function CaseForm({
  initialData,
  clients,
}: CaseFormProps) {
  const router = useRouter();

  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState(
    initialData?.title ?? ""
  );

  const [type, setType] = useState(
    initialData?.type ?? "Eladás"
  );

  const [priority, setPriority] = useState(
    initialData?.priority ?? "Normál"
  );

  const [description, setDescription] =
    useState(
      initialData?.description ?? ""
    );

  const [clientId, setClientId] =
    useState(
      initialData?.client_id ?? ""
    );

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        title: title.trim(),
        type,
        priority,
        description:
          description.trim() || null,
        client_id: clientId || null,
      };

      if (isEditing && initialData) {
        await caseRepository.update(
          initialData.id,
          payload
        );

        router.push(
          `/cases/${initialData.id}`
        );
        router.refresh();

        return;
      }

      const created =
        await caseRepository.create(
          payload
        );

      router.push(`/cases/${created.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Hiba történt az ügy mentése közben."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Alapadatok
        </h2>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Ügyszám
          </label>

          <Input
            readOnly
            value={
              initialData
                ? `HF-${String(
                    initialData.case_number
                  ).padStart(6, "0")}`
                : "Automatikusan generálódik"
            }
            className="bg-slate-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Ügy címe *
          </label>

          <Input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
            placeholder="Pl. Kovács család házvásárlása"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Típus
            </label>

            <Select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
            >
              <option>Eladás</option>
              <option>Vétel</option>
              <option>Bérbeadás</option>
              <option>Bérlés</option>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Prioritás
            </label>

            <Select
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value
                )
              }
            >
              <option>Normál</option>
              <option>Magas</option>
              <option>Sürgős</option>
            </Select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Ügyfél
          </label>

          <ClientPicker
            clients={clients}
            value={clientId}
            onChange={(value) =>
              setClientId(value ?? "")
            }
          />
        </div>
      </div>

      <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Leírás
        </h2>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Megjegyzések
          </label>

          <textarea
            rows={6}
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="További információk..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm transition-colors outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            router.push(
              initialData
                ? `/cases/${initialData.id}`
                : "/cases"
            )
          }
        >
          Mégse
        </Button>

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Mentés..."
            : isEditing
              ? "Módosítások mentése"
              : "Ügy mentése"}
        </Button>
      </div>
    </form>
  );
}