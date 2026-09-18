import Button from "@/components/ui/Button";
import SearchInput from "@/components/ui/SearchInput";
import Select from "@/components/ui/Select";
import Toolbar from "@/components/ui/Toolbar";

type CasesToolbarProps = {
  search?: string;
  status?: string;
  priority?: string;
};

export default function CasesToolbar({
  search = "",
  status = "",
  priority = "",
}: CasesToolbarProps) {
  return (
    <form method="GET">
      <Toolbar>
        <SearchInput
          placeholder="Keresés ügyszám vagy cím..."
          defaultValue={search}
        />

        <Select
          name="status"
          defaultValue={status}
        >
          <option value="">Minden státusz</option>
          <option value="Nyitott">Nyitott</option>
          <option value="Folyamatban">Folyamatban</option>
          <option value="Lezárt">Lezárt</option>
        </Select>

        <Select
          name="priority"
          defaultValue={priority}
        >
          <option value="">Minden prioritás</option>
          <option value="high">Magas</option>
          <option value="medium">Közepes</option>
          <option value="low">Alacsony</option>
        </Select>

        <div className="flex gap-2">
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
          >
            Szűrés
          </Button>

          <Button
            href="/cases"
            variant="secondary"
          >
            Törlés
          </Button>
        </div>
      </Toolbar>
    </form>
  );
}