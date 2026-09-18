"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import {
  deletePropertyImageAction,
} from "@/app/properties/actions";

import Button from "@/components/ui/Button";

import type {
  PropertyImage,
} from "@/types/property-image";

type PropertyImageCardProps = {
  image: PropertyImage;
};

/**
 * Property Image Card.
 */
export default function PropertyImageCard({
  image,
}: PropertyImageCardProps) {
  const router =
    useRouter();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  function handleDelete() {
    const confirmed =
      window.confirm(
        "Biztosan törölni szeretnéd ezt a képet?"
      );

    if (!confirmed) {
      return;
    }

    startTransition(
      async () => {
        try {
          await deletePropertyImageAction(
            image.id
          );

          router.refresh();
        } catch (error) {
          console.error(error);

          alert(
            "A kép törlése sikertelen."
          );
        }
      }
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <Image
        src={image.url}
        alt={
          image.file_name ??
          "Ingatlan kép"
        }
        width={600}
        height={400}
        className="h-44 w-full object-cover"
      />

      <div className="flex items-center justify-between p-3">
        <span className="truncate text-sm text-slate-600">
          {image.file_name ??
            "Névtelen kép"}
        </span>

        <Button
          variant="danger"
          type="button"
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending
            ? "..."
            : "🗑"}
        </Button>
      </div>
    </div>
  );
}