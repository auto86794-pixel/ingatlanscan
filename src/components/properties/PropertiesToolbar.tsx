import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SearchInput from "@/components/ui/SearchInput";
import Select from "@/components/ui/Select";
import Toolbar from "@/components/ui/Toolbar";

type PropertiesToolbarProps = {
  search?: string;
  city?: string;
  status?: string;
};

export default function PropertiesToolbar({
  search = "",
  city = "",
  status = "",
}: PropertiesToolbarProps) {
  return (
    <form method="GET">
      <Toolbar>
        <SearchInput
          placeholder="Keresés cím vagy referencia..."
          defaultValue={search}
        />

        <Input
          name="city"
          defaultValue={city}
          placeholder="Város"
        />

        <Select
          name="status"
          defaultValue={status}
        >
          <option value="">Minden státusz</option>
          <option value="Eladó">Eladó</option>
          <option value="Kiadó">Kiadó</option>
          <option value="Eladva">Eladva</option>
          <option value="Kiadva">Kiadva</option>
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
            href="/properties"
            variant="secondary"
          >
            Törlés
          </Button>
        </div>
      </Toolbar>
    </form>
  );
}