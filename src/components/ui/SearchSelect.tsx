import { useMemo, useState } from "react";
import Input from "./Input";

export interface SearchSelectOption {
  id: string;
  label: string;
  description?: string;
}

interface SearchSelectProps {
  value?: string | null;
  options: SearchSelectOption[];
  placeholder?: string;
  emptyMessage?: string;
  onChange: (value: string | null) => void;
}

export default function SearchSelect({
  value,
  options,
  placeholder = "Keresés...",
  emptyMessage = "Nincs találat.",
  onChange,
}: SearchSelectProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = useMemo(() => {
    return options.find((option) => option.id === value) ?? null;
  }, [options, value]);

  const filteredOptions = useMemo(() => {
    const search = query.toLowerCase().trim();

    if (!search) {
      return options;
    }

    return options.filter((option) => {
      return (
        option.label.toLowerCase().includes(search) ||
        option.description?.toLowerCase().includes(search)
      );
    });
  }, [options, query]);

  return (
    <div className="space-y-2">
      <Input
        type="text"
        placeholder={placeholder}
        value={isOpen ? query : selectedOption?.label ?? ""}
        onFocus={() => {
          setQuery("");
          setIsOpen(true);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
      />

      {isOpen && (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-500">
              {emptyMessage}
            </div>
          ) : (
            filteredOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onChange(option.id);
                  setQuery("");
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-3 text-left hover:bg-slate-50"
              >
                <div className="font-medium text-slate-900">
                  {option.label}
                </div>

                {option.description && (
                  <div className="text-sm text-slate-500">
                    {option.description}
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}