"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createClient,
  updateClient,
} from "@/lib/clients";

import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import FormSection from "@/components/ui/FormSection";
import Input from "@/components/ui/Input";

import type { Client } from "@/types/client";

type ClientFormProps = {
  initialData?: Client;
};

export default function ClientForm({
  initialData,
}: ClientFormProps) {
  const router = useRouter();

  const isEditing = Boolean(initialData);

  const [firstName, setFirstName] = useState(
    initialData?.first_name ?? ""
  );

  const [lastName, setLastName] = useState(
    initialData?.last_name ?? ""
  );

  const [email, setEmail] = useState(
    initialData?.email ?? ""
  );

  const [phone, setPhone] = useState(
    initialData?.phone ?? ""
  );

  const [city, setCity] = useState(
    initialData?.city ?? ""
  );

  const [status, setStatus] = useState(
    initialData?.status ?? "Aktív"
  );

  const [source, setSource] = useState(
    initialData?.source ?? ""
  );

  const [propertyType, setPropertyType] = useState(
    initialData?.property_type ?? ""
  );

  const [budgetMin, setBudgetMin] = useState(
    initialData?.budget_min?.toString() ?? ""
  );

  const [budgetMax, setBudgetMax] = useState(
    initialData?.budget_max?.toString() ?? ""
  );

  const [notes, setNotes] = useState(
    initialData?.notes ?? ""
  );

  const [loading, setLoading] = useState(false);

  function toNumberOrNull(
    value: string
  ): number | null {
    if (!value.trim()) {
      return null;
    }

    const numberValue = Number(value);

    return Number.isNaN(numberValue)
      ? null
      : numberValue;
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedFirstName =
      firstName.trim();

    const trimmedLastName =
      lastName.trim();

    if (
      !trimmedFirstName ||
      !trimmedLastName
    ) {
      alert(
        "A vezetéknév és a keresztnév megadása kötelező."
      );

      return;
    }

    const parsedBudgetMin =
      toNumberOrNull(budgetMin);

    const parsedBudgetMax =
      toNumberOrNull(budgetMax);

    if (
      parsedBudgetMin !== null &&
      parsedBudgetMax !== null &&
      parsedBudgetMin >
        parsedBudgetMax
    ) {
      alert(
        "A minimum költségkeret nem lehet nagyobb a maximum költségkeretnél."
      );

      return;
    }

    try {
      setLoading(true);

      if (
        isEditing &&
        initialData
      ) {
        await updateClient(
          initialData.id,
          {
            first_name:
              trimmedFirstName,

            last_name:
              trimmedLastName,

            email:
              email.trim() ||
              null,

            phone:
              phone.trim() ||
              null,

            city:
              city.trim() ||
              null,

            status:
              status || null,

            source:
              source || null,

            property_type:
              propertyType ||
              null,

            budget_min:
              parsedBudgetMin,

            budget_max:
              parsedBudgetMax,

            notes:
              notes.trim() ||
              null,
          }
        );

        router.push(
          `/clients/${initialData.id}`
        );

        router.refresh();

        return;
      }

      await createClient({
        first_name:
          trimmedFirstName,

        last_name:
          trimmedLastName,

        email:
          email.trim() ||
          undefined,

        phone:
          phone.trim() ||
          undefined,

        city:
          city.trim() ||
          undefined,

        status:
          status ||
          undefined,

        source:
          source ||
          undefined,

        property_type:
          propertyType ||
          undefined,

        budget_min:
          parsedBudgetMin ??
          undefined,

        budget_max:
          parsedBudgetMax ??
          undefined,

        notes:
          notes.trim() ||
          undefined,
      });

      router.push("/clients");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Hiba történt az ügyfél mentése közben."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    router.push(
      initialData
        ? `/clients/${initialData.id}`
        : "/clients"
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <FormSection
        title="Kapcsolati adatok"
        description="Az ügyfél alapadatai és elérhetőségei."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            label="Vezetéknév"
            htmlFor="client-last-name"
            required
          >
            <Input
              id="client-last-name"
              type="text"
              value={lastName}
              onChange={(event) =>
                setLastName(
                  event.target.value
                )
              }
              required
              autoComplete="family-name"
              placeholder="Kovács"
            />
          </FormField>

          <FormField
            label="Keresztnév"
            htmlFor="client-first-name"
            required
          >
            <Input
              id="client-first-name"
              type="text"
              value={firstName}
              onChange={(event) =>
                setFirstName(
                  event.target.value
                )
              }
              required
              autoComplete="given-name"
              placeholder="Péter"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            label="Email"
            htmlFor="client-email"
          >
            <Input
              id="client-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              autoComplete="email"
              placeholder="peter@example.com"
            />
          </FormField>

          <FormField
            label="Telefon"
            htmlFor="client-phone"
          >
            <Input
              id="client-phone"
              type="tel"
              value={phone}
              onChange={(event) =>
                setPhone(
                  event.target.value
                )
              }
              autoComplete="tel"
              placeholder="+36 30 123 4567"
            />
          </FormField>
        </div>

        <FormField
          label="Város"
          htmlFor="client-city"
        >
          <Input
            id="client-city"
            type="text"
            value={city}
            onChange={(event) =>
              setCity(
                event.target.value
              )
            }
            autoComplete="address-level2"
            placeholder="Debrecen"
          />
        </FormField>
      </FormSection>

      <FormSection
        title="Ügyfélkezelés"
        description="Az ügyfél aktuális státusza és érkezési forrása."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            label="Státusz"
            htmlFor="client-status"
          >
            <select
              id="client-status"
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value
                )
              }
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="Aktív">
                Aktív
              </option>

              <option value="Érdeklődő">
                Érdeklődő
              </option>

              <option value="Kapcsolatfelvétel">
                Kapcsolatfelvétel
              </option>

              <option value="Folyamatban">
                Folyamatban
              </option>

              <option value="Szerződött">
                Szerződött
              </option>

              <option value="Lezárt">
                Lezárt
              </option>

              <option value="Inaktív">
                Inaktív
              </option>
            </select>
          </FormField>

          <FormField
            label="Forrás"
            htmlFor="client-source"
          >
            <select
              id="client-source"
              value={source}
              onChange={(event) =>
                setSource(
                  event.target.value
                )
              }
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">
                Nincs megadva
              </option>

              <option value="Weboldal">
                Weboldal
              </option>

              <option value="Telefon">
                Telefon
              </option>

              <option value="Email">
                Email
              </option>

              <option value="Személyes ajánlás">
                Személyes ajánlás
              </option>

              <option value="Facebook">
                Facebook
              </option>

              <option value="Instagram">
                Instagram
              </option>

              <option value="Ingatlan.com">
                Ingatlan.com
              </option>

              <option value="Hirdetés">
                Hirdetés
              </option>

              <option value="Egyéb">
                Egyéb
              </option>
            </select>
          </FormField>
        </div>
      </FormSection>

      <FormSection
        title="Keresési igények"
        description="Az ügyfél által keresett ingatlan fő paraméterei."
      >
        <FormField
          label="Keresett ingatlan típusa"
          htmlFor="client-property-type"
        >
          <select
            id="client-property-type"
            value={propertyType}
            onChange={(event) =>
              setPropertyType(
                event.target.value
              )
            }
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">
              Nincs megadva
            </option>

            <option value="Lakás">
              Lakás
            </option>

            <option value="Ház">
              Ház
            </option>

            <option value="Ikerház">
              Ikerház
            </option>

            <option value="Sorház">
              Sorház
            </option>

            <option value="Telek">
              Telek
            </option>

            <option value="Iroda">
              Iroda
            </option>

            <option value="Üzlethelyiség">
              Üzlethelyiség
            </option>

            <option value="Garázs">
              Garázs
            </option>

            <option value="Egyéb">
              Egyéb
            </option>
          </select>
        </FormField>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            label="Minimum költségkeret"
            htmlFor="client-budget-min"
            helperText="Összeg forintban."
          >
            <Input
              id="client-budget-min"
              type="number"
              min="0"
              step="1"
              value={budgetMin}
              onChange={(event) =>
                setBudgetMin(
                  event.target.value
                )
              }
              inputMode="numeric"
              placeholder="30000000"
            />
          </FormField>

          <FormField
            label="Maximum költségkeret"
            htmlFor="client-budget-max"
            helperText="Összeg forintban."
          >
            <Input
              id="client-budget-max"
              type="number"
              min="0"
              step="1"
              value={budgetMax}
              onChange={(event) =>
                setBudgetMax(
                  event.target.value
                )
              }
              inputMode="numeric"
              placeholder="60000000"
            />
          </FormField>
        </div>
      </FormSection>

      <FormSection
        title="Megjegyzések"
        description="Az ügyfél igényei, előzményei és fontos információi."
      >
        <FormField
          label="Megjegyzés"
          htmlFor="client-notes"
        >
          <textarea
            id="client-notes"
            rows={6}
            value={notes}
            onChange={(event) =>
              setNotes(
                event.target.value
              )
            }
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="Az ügyfél igényei, megjegyzések, kapcsolatfelvételi információk..."
          />
        </FormField>
      </FormSection>

      <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={loading}
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
              ? "💾 Módosítások mentése"
              : "💾 Ügyfél mentése"}
        </Button>
      </div>
    </form>
  );
}