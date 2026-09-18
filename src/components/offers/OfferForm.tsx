"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";

import {
  createOfferAction,
  updateOfferAction,
} from "@/app/offers/actions";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import Input from "@/components/ui/Input";
import Section from "@/components/ui/Section";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

import type { CaseWithClient } from "@/types/case";
import type {
  Offer,
  OfferStatus,
} from "@/types/offer";

type OfferFormProps = {
  initialData?: Offer;
  cases: CaseWithClient[];
};

const offerStatusOptions: {
  value: OfferStatus;
  label: string;
}[] = [
  {
    value: "draft",
    label: "Piszkozat",
  },
  {
    value: "sent",
    label: "Elküldve",
  },
  {
    value: "accepted",
    label: "Elfogadva",
  },
  {
    value: "rejected",
    label: "Elutasítva",
  },
  {
    value: "expired",
    label: "Lejárt",
  },
];

export default function OfferForm({
  initialData,
  cases,
}: OfferFormProps) {
  const router = useRouter();

  const isEditing = Boolean(initialData);

  const [caseId, setCaseId] = useState(
    initialData?.case_id ?? ""
  );

  const [title, setTitle] = useState(
    initialData?.title ?? ""
  );

  const [status, setStatus] =
    useState<OfferStatus>(
      initialData?.status ?? "draft"
    );

  const [validUntil, setValidUntil] =
    useState(
      initialData?.valid_until
        ? initialData.valid_until.slice(0, 10)
        : ""
    );

  const [notes, setNotes] = useState(
    initialData?.notes ?? ""
  );

  const [loading, setLoading] =
    useState(false);

  const [caseError, setCaseError] =
    useState<string>();

  const [titleError, setTitleError] =
    useState<string>();

  function validateForm() {
    const trimmedTitle = title.trim();

    const nextCaseError = caseId
      ? undefined
      : "A kapcsolódó ügy kiválasztása kötelező.";

    const nextTitleError = trimmedTitle
      ? undefined
      : "Az ajánlat címének megadása kötelező.";

    setCaseError(nextCaseError);
    setTitleError(nextTitleError);

    return {
      isValid:
        !nextCaseError &&
        !nextTitleError,
      trimmedTitle,
    };
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const {
      isValid,
      trimmedTitle,
    } = validateForm();

    if (!isValid) {
      return;
    }

    try {
      setLoading(true);

      if (isEditing && initialData) {
        await updateOfferAction(
          initialData.id,
          {
            title: trimmedTitle,
            notes:
              notes.trim() || null,
            status,
            valid_until:
              validUntil || null,
          }
        );

        router.push(
          `/offers/${initialData.id}`
        );

        router.refresh();

        return;
      }

      const offer =
  await createOfferAction({
    case_id: caseId,
    title: trimmedTitle,
    notes:
      notes.trim() || null,
    valid_until:
      validUntil || null,
  });

router.push(
  `/offers/${offer.id}`
);

router.refresh();
} catch (error) {
  console.error(error);

  if (error instanceof Error) {
    alert(error.message);
  } else {
    alert(String(error));
  }
} finally {
  setLoading(false);
};
  }

  

  function handleCaseChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    const nextCaseId =
      event.target.value;

    setCaseId(nextCaseId);

    if (nextCaseId) {
      setCaseError(undefined);
    }
  }

  function handleTitleChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const nextTitle =
      event.target.value;

    setTitle(nextTitle);

    if (nextTitle.trim()) {
      setTitleError(undefined);
    }
  }

  function handleStatusChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    setStatus(
      event.target.value as OfferStatus
    );
  }

  function handleValidUntilChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setValidUntil(
      event.target.value
    );
  }

  function handleNotesChange(
    event: ChangeEvent<HTMLTextAreaElement>
  ) {
    setNotes(event.target.value);
  }

  function handleCancel() {
    router.push(
      initialData
        ? `/offers/${initialData.id}`
        : "/offers"
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
      noValidate
    >
      <Section
        title="Alapadatok"
        description="Add meg az ajánlat alapvető adatait és a kapcsolódó ügyet."
      >
        <div className="space-y-6">
          <FormField
            label="Kapcsolódó ügy"
            htmlFor="offer-case"
            required
            error={caseError}
            helperText={
              isEditing
                ? "A kapcsolódó ügy szerkesztés közben nem módosítható."
                : undefined
            }
          >
            <Select
              id="offer-case"
              value={caseId}
              onChange={
                handleCaseChange
              }
              disabled={
                loading || isEditing
              }
              error={Boolean(
                caseError
              )}
              required
            >
              <option value="">
                Válassz ügyet
              </option>

              {cases.map(
                (caseItem) => (
                  <option
                    key={
                      caseItem.id
                    }
                    value={
                      caseItem.id
                    }
                  >
                    {`#${caseItem.case_number} – ${caseItem.title}`}
                  </option>
                )
              )}
            </Select>
          </FormField>

          <FormField
            label="Ajánlat címe"
            htmlFor="offer-title"
            required
            error={titleError}
          >
            <Input
              id="offer-title"
              type="text"
              value={title}
              onChange={
                handleTitleChange
              }
              placeholder="Például: Lakásértékesítési ajánlat"
              error={Boolean(
                titleError
              )}
              disabled={loading}
              required
            />
          </FormField>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              label="Érvényesség vége"
              htmlFor="offer-valid-until"
              helperText="Az ajánlat eddig a dátumig tekinthető érvényesnek."
            >
              <Input
                id="offer-valid-until"
                type="date"
                value={
                  validUntil
                }
                onChange={
                  handleValidUntilChange
                }
                disabled={loading}
              />
            </FormField>

            {isEditing ? (
              <FormField
                label="Státusz"
                htmlFor="offer-status"
              >
                <Select
                  id="offer-status"
                  value={status}
                  onChange={
                    handleStatusChange
                  }
                  disabled={loading}
                >
                  {offerStatusOptions.map(
                    (option) => (
                      <option
                        key={
                          option.value
                        }
                        value={
                          option.value
                        }
                      >
                        {
                          option.label
                        }
                      </option>
                    )
                  )}
                </Select>
              </FormField>
            ) : (
              <FormField label="Kezdeti státusz">
                <div className="flex min-h-[46px] items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <Badge
                    variant="yellow"
                    size="md"
                  >
                    Piszkozat
                  </Badge>
                </div>
              </FormField>
            )}
          </div>
        </div>
      </Section>

      <Section
        title="Megjegyzések"
        description="Rögzítsd az ajánlathoz kapcsolódó részleteket és belső információkat."
      >
        <FormField
          label="Megjegyzés"
          htmlFor="offer-notes"
          helperText="A megjegyzés belső információkat, feltételeket vagy további részleteket tartalmazhat."
        >
          <Textarea
            id="offer-notes"
            rows={7}
            value={notes}
            onChange={
              handleNotesChange
            }
            placeholder="Az ajánlat részletei, feltételei és egyéb megjegyzések..."
            disabled={loading}
          />
        </FormField>
      </Section>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
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
              ? "Módosítások mentése"
              : "Ajánlat létrehozása"}
        </Button>
      </div>
    </form>
  );
}