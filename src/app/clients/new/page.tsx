import Link from "next/link";

import ClientForm from "@/components/client/ClientForm";

import Card from "@/components/ui/Card";
import PageTitle from "@/components/ui/PageTitle";

export default function NewClientPage() {
  return (
    <div className="space-y-6">
      <PageTitle
        title="Új ügyfél"
        subtitle="Új ügyfél létrehozása"
        action={
          <Link
            href="/clients"
            className="rounded-xl bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-300"
          >
            Vissza
          </Link>
        }
      />

      <Card>
        <ClientForm />
      </Card>
    </div>
  );
}