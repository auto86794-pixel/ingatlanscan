import type { Intake } from "./model";

export function calculateIntakeProgress(intake: Intake): number {
  const values = [
    intake.property.address,
    intake.property.type,
    intake.property.city,
    intake.property.floorArea,
    intake.owner.name,
    intake.owner.phone,
    intake.technical.heating,
    intake.technical.condition,
    intake.sale.expectedPriceM,
    intake.sale.priority,
    intake.rooms.length ? "rooms" : "",
    intake.notes,
  ];

  return Math.round((values.filter(Boolean).length / values.length) * 100);
}
