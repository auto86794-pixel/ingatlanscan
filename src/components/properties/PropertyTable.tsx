"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BedDouble,
  Building2,
  Home,
  MapPin,
  Ruler,
  Trash2,
} from "lucide-react";
import {
  useRouter,
} from "next/navigation";
import {
  useState,
  useTransition,
} from "react";

import {
  deletePropertyAction,
} from "@/app/properties/actions";

import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";

type Property = {
  id: string;
  title: string;
  property_type: string | null;
  city: string | null;
  price: number | null;
  area: number | null;
  rooms: number | null;
  status: string | null;
};

type PropertyTableProps = {
  properties: Property[];
};

export default function PropertyTable({
  properties,
}: PropertyTableProps) {
  const router = useRouter();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  const [
    deletingId,
    setDeletingId,
  ] = useState<string | null>(null);

  function handleDelete(
    property: Property
  ) {
    const confirmed = window.confirm(
      `Biztosan törölni szeretnéd ezt az ingatlant?\n\n${property.title}`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(property.id);

    startTransition(async () => {
      try {
        await deletePropertyAction(
          property.id
        );

        router.refresh();
      } catch (error) {
        console.error(
          "Property deletion failed:",
          error
        );

        alert(
          "Hiba történt az ingatlan törlése közben."
        );
      } finally {
        setDeletingId(null);
      }
    });
  }

  if (properties.length === 0) {
    return (
      <DataTable.Empty
        icon={<Home className="h-6 w-6" />}
        title="Nincs ingatlan"
        description="Még nincs rögzített ingatlan."
      />
    );
  }

  return (
    <>
      <div className="hidden lg:block">
        <DataTable>
          <DataTable.Head>
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Ingatlan
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Típus
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Város
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Ár
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Alapterület
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Szobák
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Státusz
              </th>

              <th className="w-28 px-6 py-4">
                <span className="sr-only">
                  Műveletek
                </span>
              </th>
            </tr>
          </DataTable.Head>

          <DataTable.Body>
            {properties.map(
              (property) => {
                const href =
                  `/properties/${property.id}`;

                const isDeleting =
                  isPending &&
                  deletingId ===
                    property.id;

                return (
                  <tr
                    key={property.id}
                    className="group transition-colors duration-200 hover:bg-blue-50/40"
                  >
                    <td className="px-6 py-5">
                      <Link
                        href={href}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Home className="h-5 w-5" />
                        </div>

                        <span className="font-semibold text-slate-900 transition-colors group-hover:text-blue-700">
                          {property.title}
                        </span>
                      </Link>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Building2 className="h-4 w-4 text-slate-400" />

                        {property.property_type ??
                          "-"}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="h-4 w-4 text-slate-400" />

                        {property.city ??
                          "-"}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm font-medium text-slate-900">
                      {formatPrice(
                        property.price
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Ruler className="h-4 w-4 text-slate-400" />

                        {property.area !=
                        null
                          ? `${property.area} m²`
                          : "-"}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <BedDouble className="h-4 w-4 text-slate-400" />

                        {property.rooms ??
                          "-"}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <Badge variant="blue">
                        {property.status ??
                          "-"}
                      </Badge>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={href}
                          aria-label="Ingatlan megnyitása"
                          title="Megnyitás"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-white hover:text-blue-600 hover:shadow-sm"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              property
                            )
                          }
                          disabled={
                            isPending
                          }
                          aria-label="Ingatlan törlése"
                          title="Ingatlan törlése"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {isDeleting && (
                        <span className="sr-only">
                          Törlés folyamatban
                        </span>
                      )}
                    </td>
                  </tr>
                );
              }
            )}
          </DataTable.Body>
        </DataTable>
      </div>

      <div className="space-y-4 lg:hidden">
        {properties.map(
          (property) => {
            const href =
              `/properties/${property.id}`;

            const isDeleting =
              isPending &&
              deletingId === property.id;

            return (
              <div
                key={property.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <Link
                    href={href}
                    className="flex min-w-0 flex-1 items-center gap-3"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Home className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-slate-900">
                        {property.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {property.city ??
                          "Nincs város"}
                      </p>
                    </div>
                  </Link>

                  <div className="flex items-center gap-1">
                    <Link
                      href={href}
                      aria-label="Ingatlan megnyitása"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          property
                        )
                      }
                      disabled={isPending}
                      aria-label="Ingatlan törlése"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <Link
                  href={href}
                  className="mt-5 block space-y-3 border-t border-slate-100 pt-4 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="blue">
                      {property.status ??
                        "-"}
                    </Badge>

                    <span className="text-slate-500">
                      {property.property_type ??
                        "-"}
                    </span>
                  </div>

                  <div className="text-slate-600">
                    <strong>Ár:</strong>{" "}
                    {formatPrice(
                      property.price
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-slate-600">
                    <span>
                      {property.area !=
                      null
                        ? `${property.area} m²`
                        : "-"}
                    </span>

                    <span>
                      {property.rooms !=
                      null
                        ? `${property.rooms} szoba`
                        : "-"}
                    </span>
                  </div>
                </Link>

                {isDeleting && (
                  <p className="mt-4 text-sm font-medium text-red-600">
                    Törlés folyamatban...
                  </p>
                )}
              </div>
            );
          }
        )}
      </div>
    </>
  );
}

function formatPrice(
  price: number | null
): string {
  if (price == null) {
    return "-";
  }

  return `${price.toLocaleString(
    "hu-HU"
  )} Ft`;
}