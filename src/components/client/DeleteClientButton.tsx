"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { deleteClient } from "@/lib/clients";

import Button from "@/components/ui/Button";

type DeleteClientButtonProps = {
  id: string;
  name: string;
};

export default function DeleteClientButton({
  id,
  name,
}: DeleteClientButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      `Biztosan törölni szeretnéd ezt az ügyfelet?\n\n${name}`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteClient(id);

      router.push("/clients");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Az ügyfél törlése sikertelen.");
    }
  }

  return (
    <Button
      variant="danger"
      onClick={handleDelete}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      Törlés
    </Button>
  );
}