import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SearchInput from "@/components/ui/SearchInput";
import Select from "@/components/ui/Select";
import Toolbar from "@/components/ui/Toolbar";

type ClientsToolbarProps = {
  search?: string;
  city?: string;
  status?: string;
};

export default function ClientsToolbar({
  search = "",
  city = "",
  status = "",
}: ClientsToolbarProps) {
  return (
    <form method="GET">
      <Toolbar>
        <SearchInput
          placeholder="Keresés név, e-mail vagy telefon..."
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
          <option value="Aktív">Aktív</option>
          <option value="Új">Új</option>
          <option value="Lezárt">Lezárt</option>
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
            href="/clients"
            variant="secondary"
          >
            Törlés
          </Button>
        </div>
      </Toolbar>
    </form>
  );
}