"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

type OffersToolbarProps = {
  search: string;
  status: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

/**
 * Offers Toolbar.
 */
export default function OffersToolbar({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: OffersToolbarProps) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          placeholder="Keresés ügyfélre, ingatlanra vagy ajánlatra..."
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
        />

        <Select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value)
          }
        >
          <option value="all">
            Minden státusz
          </option>

          <option value="draft">
            Piszkozat
          </option>

          <option value="sent">
            Elküldve
          </option>

          <option value="accepted">
            Elfogadva
          </option>

          <option value="rejected">
            Elutasítva
          </option>

          <option value="expired">
            Lejárt
          </option>
        </Select>
      </div>
    </div>
  );
}