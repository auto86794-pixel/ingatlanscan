"use client";

/**
 * ----------------------------------------
 * HomeFlow CRM
 * Component: LatestPropertiesSection
 * ----------------------------------------
 */

import {
  ArrowRight,
  BedDouble,
  Home,
  MapPin,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

export default function LatestPropertiesSection() {
  const properties = [
    {
      id: 1,
      title: "Debrecen, Vezér utca",
      city: "Debrecen",
      price: "69 900 000 Ft",
      rooms: "3 szoba",
    },
    {
      id: 2,
      title: "Debrecen, Hatvan utcai kert",
      city: "Debrecen",
      price: "54 900 000 Ft",
      rooms: "2 szoba",
    },
    {
      id: 3,
      title: "Ebes, új építésű ház",
      city: "Ebes",
      price: "74 900 000 Ft",
      rooms: "4 szoba",
    },
  ];

  return (
    <Section
      title="Legújabb ingatlanok"
      description="A legutóbb rögzített ingatlanok."
      action={
        <button
          type="button"
          className="group flex items-center gap-2 rounded-xl px-2 py-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
        >
          Összes

          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      }
    >
      <Card
        padding="none"
        className="overflow-hidden border-white/70 bg-white/80 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl"
      >
        <div className="space-y-3 p-3">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)]"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl transition-transform duration-500 group-hover:scale-125" />

              <div className="relative flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25">
                  <Home className="h-7 w-7" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-bold text-slate-900">
                    {property.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600">
                      <MapPin className="h-4 w-4 text-red-500" />
                      {property.city}
                    </div>

                    <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600">
                      <BedDouble className="h-4 w-4 text-blue-600" />
                      {property.rooms}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-extrabold text-slate-900">
                    {property.price}
                  </div>

                  <button
                    type="button"
                    className="mt-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:border-blue-500 hover:bg-blue-600 hover:text-white hover:shadow-[0_10px_24px_rgba(37,99,235,0.25)]"
                    aria-label="Ingatlan megnyitása"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}