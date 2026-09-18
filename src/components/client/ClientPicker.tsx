"use client";

import SearchSelect, {
  SearchSelectOption,
} from "@/components/ui/SearchSelect";

import { Client } from "@/types/client";

interface ClientPickerProps {
  clients: Client[];
  value?: string | null;
  onChange: (value: string | null) => void;
}

export default function ClientPicker({
  clients,
  value,
  onChange,
}: ClientPickerProps) {
  const options: SearchSelectOption[] = clients.map((client) => ({
    id: client.id,
    label: `${client.last_name} ${client.first_name}`,
    description: client.city ?? "",
  }));

  return (
    <SearchSelect
      value={value}
      options={options}
      placeholder="Ügyfél keresése..."
      emptyMessage="Nincs ügyfél."
      onChange={onChange}
    />
  );
}