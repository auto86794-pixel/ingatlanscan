"use client";

/**
 * ----------------------------------------
 * HomeFlow CRM
 * Component: HomeFlowAssistantSection
 * ----------------------------------------
 *
 * HomeFlow AI Assistant panel.
 */

import {
  ArrowRight,
  BrainCircuit,
  CalendarClock,
  Sparkles,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

export default function HomeFlowAssistantSection() {
  return (
    <Section
      title="HomeFlow AI"
      description="Mai intelligens javaslatok."
    >
      <Card
        className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white"
        padding="lg"
      >
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-white/15 p-3">
            <BrainCircuit className="h-8 w-8" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold">
              Jó reggelt!
            </h3>

            <p className="mt-2 text-sm leading-6 text-blue-100">
              A mai napon 3 találkozód és 7 aktív
              feladatod van. Egy ügy több mint
              10 napja vár visszahívásra.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
                <Sparkles className="h-5 w-5" />

                <span className="text-sm">
                  2 új érdeklődő érkezett ma.
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
                <CalendarClock className="h-5 w-5" />

                <span className="text-sm">
                  14:00-kor ingatlanbemutatás.
                </span>
              </div>
            </div>

            <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50">
              AI Assistant megnyitása

              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>
    </Section>
  );
}