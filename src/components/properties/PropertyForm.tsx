"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createPropertyAction,
  updatePropertyAction,
} from "@/app/properties/actions";

import ClientPicker from "@/components/client/ClientPicker";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import type { Client } from "@/types/client";
import type { Property } from "@/types/property";

type PropertyFormProps = {
  initialData?: Property;
  clients: Client[];
};

export default function PropertyForm({
  initialData,
  clients,
}: PropertyFormProps) {
  const router = useRouter();

  const isEditing = Boolean(initialData);

  const [reference, setReference] = useState(
    initialData?.reference ?? ""
  );

  const [title, setTitle] = useState(
    initialData?.title ?? ""
  );

  const [status, setStatus] = useState(
    initialData?.status ?? "Eladó"
  );

  const [propertyType, setPropertyType] = useState(
    initialData?.property_type ?? ""
  );

  const [city, setCity] = useState(
    initialData?.city ?? ""
  );

  const [district, setDistrict] = useState(
    initialData?.district ?? ""
  );

  const [postalCode, setPostalCode] = useState(
    initialData?.postal_code ?? ""
  );

  const [address, setAddress] = useState(
    initialData?.address ?? ""
  );

  const [price, setPrice] = useState(
    initialData?.price?.toString() ?? ""
  );

  const [area, setArea] = useState(
    initialData?.area?.toString() ?? ""
  );

  const [rooms, setRooms] = useState(
    initialData?.rooms?.toString() ?? ""
  );

  const [floor, setFloor] = useState(
    initialData?.floor ?? ""
  );

  const [condition, setCondition] = useState(
    initialData?.condition ?? ""
  );

  const [heating, setHeating] = useState(
    initialData?.heating ?? ""
  );

  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );

  const [ownerClientId, setOwnerClientId] = useState(
    initialData?.owner_client_id ?? ""
  );

  const [loading, setLoading] = useState(false);

  function toNumberOrNull(value: string) {
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

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      alert("Az ingatlan címének megadása kötelező.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        reference: reference.trim() || null,
        title: trimmedTitle,
        status: status || null,
        property_type: propertyType || null,
        city: city.trim() || null,
        district: district.trim() || null,
        postal_code: postalCode.trim() || null,
        address: address.trim() || null,
        price: toNumberOrNull(price),
        area: toNumberOrNull(area),
        rooms: toNumberOrNull(rooms),
        floor: floor.trim() || null,
        condition: condition.trim() || null,
        heating: heating.trim() || null,
        description: description.trim() || null,
        owner_client_id: ownerClientId || null,
        is_active: true,
      };

      if (isEditing && initialData) {
        await updatePropertyAction(
          initialData.id,
          payload
        );

        return;
      }

      await createPropertyAction(payload);
    } catch (error) {
      console.error(error);

      alert(
        "Hiba történt az ingatlan mentése közben."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    router.push(
      initialData
        ? `/properties/${initialData.id}`
        : "/properties"
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block font-medium text-black">
          Belső azonosító
        </label>

        <Input
          type="text"
          value={reference}
          onChange={(event) =>
            setReference(event.target.value)
          }
          placeholder="HF-P-0001"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Ingatlan címe *
        </label>

        <Input
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          required
          placeholder="Belvárosi lakás erkéllyel"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">
            Státusz
          </label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            className="w-full rounded-lg border border-gray-300 p-3"
          >
            <option>Eladó</option>
            <option>Kiadó</option>
            <option>Foglalva</option>
            <option>Eladva</option>
            <option>Kiadva</option>
            <option>Inaktív</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Ingatlan típusa
          </label>

          <select
            value={propertyType}
            onChange={(event) =>
              setPropertyType(event.target.value)
            }
            className="w-full rounded-lg border border-gray-300 p-3"
          >
            <option value="">
              Nincs megadva
            </option>
            <option>Lakás</option>
            <option>Ház</option>
            <option>Ikerház</option>
            <option>Sorház</option>
            <option>Telek</option>
            <option>Iroda</option>
            <option>Üzlethelyiség</option>
            <option>Garázs</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Tulajdonos / ügyfél
        </label>

        <ClientPicker
          clients={clients}
          value={ownerClientId}
          onChange={(value) =>
            setOwnerClientId(value ?? "")
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">
            Város
          </label>

          <Input
            type="text"
            value={city}
            onChange={(event) =>
              setCity(event.target.value)
            }
            placeholder="Budapest"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Kerület
          </label>

          <Input
            type="text"
            value={district}
            onChange={(event) =>
              setDistrict(event.target.value)
            }
            placeholder="XIII."
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Irányítószám
          </label>

          <Input
            type="text"
            value={postalCode}
            onChange={(event) =>
              setPostalCode(event.target.value)
            }
            placeholder="1137"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Cím / utca
          </label>

          <Input
            type="text"
            value={address}
            onChange={(event) =>
              setAddress(event.target.value)
            }
            placeholder="Pozsonyi út"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block font-medium">
            Ár
          </label>

          <Input
            type="number"
            min="0"
            value={price}
            onChange={(event) =>
              setPrice(event.target.value)
            }
            placeholder="75000000"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Alapterület
          </label>

          <Input
            type="number"
            min="0"
            value={area}
            onChange={(event) =>
              setArea(event.target.value)
            }
            placeholder="68"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Szobák
          </label>

          <Input
            type="number"
            min="0"
            step="0.5"
            value={rooms}
            onChange={(event) =>
              setRooms(event.target.value)
            }
            placeholder="2.5"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block font-medium">
            Emelet
          </label>

          <Input
            type="text"
            value={floor}
            onChange={(event) =>
              setFloor(event.target.value)
            }
            placeholder="2. emelet"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Állapot
          </label>

          <Input
            type="text"
            value={condition}
            onChange={(event) =>
              setCondition(event.target.value)
            }
            placeholder="Felújított"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Fűtés
          </label>

          <Input
            type="text"
            value={heating}
            onChange={(event) =>
              setHeating(event.target.value)
            }
            placeholder="Cirkó"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Leírás
        </label>

        <textarea
          rows={6}
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          className="w-full rounded-lg border border-gray-300 p-3"
          placeholder="Ingatlan részletes leírása..."
        />
      </div>

      <div className="flex justify-end gap-3">
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
              : "💾 Mentés"}
        </Button>
      </div>
    </form>
  );
}