"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Mail,
  Trash2,
  X,
  Clock3,
} from "lucide-react";

import Button from "@/components/ui/Button";

import {
  acceptOfferAction,
  deleteOfferAction,
  expireOfferAction,
  rejectOfferAction,
  sendOfferAction,
} from "@/app/offers/actions";

import type {
  OfferStatus,
} from "@/types/offer";

type OfferActionsProps = {
  offerId: string;
  status: OfferStatus;
};

export default function OfferActions({
  offerId,
  status,
}: OfferActionsProps) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  function runAction(
    action: () => Promise<void>
  ) {
    startTransition(async () => {
      try {
        await action();

        router.refresh();
      } catch (error) {
        console.error(error);

        alert(
          "Hiba történt a művelet végrehajtása közben."
        );
      }
    });
  }

  return (
    <div className="flex flex-wrap gap-3">
      {status === "draft" && (
        <Button
          disabled={isPending}
          onClick={() =>
            runAction(() =>
              sendOfferAction(
                offerId
              )
            )
          }
        >
          <Mail className="h-4 w-4" />
          Elküldés
        </Button>
      )}

      {status === "sent" && (
        <>
          <Button
            disabled={isPending}
            onClick={() =>
              runAction(() =>
                acceptOfferAction(
                  offerId
                )
              )
            }
          >
            <Check className="h-4 w-4" />
            Elfogadás
          </Button>

          <Button
            variant="outline"
            disabled={isPending}
            onClick={() =>
              runAction(() =>
                rejectOfferAction(
                  offerId
                )
              )
            }
          >
            <X className="h-4 w-4" />
            Elutasítás
          </Button>

          <Button
            variant="outline"
            disabled={isPending}
            onClick={() =>
              runAction(() =>
                expireOfferAction(
                  offerId
                )
              )
            }
          >
            <Clock3 className="h-4 w-4" />
            Lejárttá teszem
          </Button>
        </>
      )}

      <Button
        variant="outline"
        disabled={isPending}
        onClick={() => {
          if (
            window.confirm(
              "Biztosan törölni szeretnéd ezt az ajánlatot?"
            )
          ) {
            runAction(() =>
              deleteOfferAction(
                offerId
              )
            );
          }
        }}
      >
        <Trash2 className="h-4 w-4" />
        Törlés
      </Button>
    </div>
  );
}