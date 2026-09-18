type SearchInputProps = {
  name?: string;
  placeholder?: string;
  defaultValue?: string;
};

export default function SearchInput({
  name = "search",
  placeholder = "Keresés...",
  defaultValue = "",
}: SearchInputProps) {
  return (
    <input
      type="text"
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
    />
  );
}