"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Check,
  Clock3,
  Copy,
  Download,
  Send,
  Trash2,
  X,
} from "lucide-react";

import {
  acceptOfferAction,
  createOfferVersionAction,
  deleteOfferAction,
  expireOfferAction,
  rejectOfferAction,
  sendOfferAction,
} from "@/app/offers/actions";

import Button from "@/components/ui/Button";

type OfferQuickActionsProps = {
  offerId: string;

  status:
    | "draft"
    | "sent"
    | "accepted"
    | "rejected"
    | "expired";
};

/**
 * Offer Quick Actions.
 */
export default function OfferQuickActions({
  offerId,
  status,
}: OfferQuickActionsProps) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  function execute(
    action: () => Promise<void>
  ) {
    startTransition(async () => {
      try {
        await action();
      } catch (error) {
        console.error(error);

        alert(
          "A művelet végrehajtása sikertelen."
        );
      }
    });
  }

  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="flex flex-wrap gap-3">
        <Link
          href={`/api/offers/${offerId}/pdf`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline">
            <Download className="h-4 w-4" />
            PDF letöltése
          </Button>
        </Link>

        <Button
          variant="outline"
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              try {
                const offer =
                  await createOfferVersionAction(
                    offerId
                  );

                router.push(
                  `/offers/${offer.id}/edit`
                );

                router.refresh();
              } catch (error) {
                console.error(error);

                alert(
                  "Az új verzió létrehozása sikertelen."
                );
              }
            })
          }
        >
          <Copy className="h-4 w-4" />
          Új verzió
        </Button>

        {status === "draft" && (
          <Button
            disabled={isPending}
            onClick={() =>
              execute(() =>
                sendOfferAction(
                  offerId
                )
              )
            }
          >
            <Send className="h-4 w-4" />
            Ajánlat elküldése
          </Button>
        )}

        {status === "sent" && (
          <>
            <Button
              disabled={isPending}
              onClick={() =>
                execute(() =>
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
                execute(() =>
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
                execute(() =>
                  expireOfferAction(
                    offerId
                  )
                )
              }
            >
              <Clock3 className="h-4 w-4" />
              Lejárttá tesz
            </Button>
          </>
        )}

        <Button
          variant="danger"
          disabled={isPending}
          onClick={() => {
            const confirmed =
              window.confirm(
                "Biztosan törölni szeretnéd az ajánlatot?"
              );

            if (!confirmed) {
              return;
            }

            execute(() =>
              deleteOfferAction(
                offerId
              )
            );
          }}
        >
          <Trash2 className="h-4 w-4" />
          Törlés
        </Button>
      </div>
    </div>
  );
}