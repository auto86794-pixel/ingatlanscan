import assert from "node:assert/strict";
import test from "node:test";

import { calculateIntakeProgress } from "./progress.ts";
import { createIntake, createRoom } from "./model.ts";

test("empty intake starts with only the default city completed", () => {
  const intake = createIntake();
  assert.equal(calculateIntakeProgress(intake), 8);
});

test("completed core fields produce 100 percent", () => {
  const intake = createIntake();
  intake.property.address = "Debrecen, Minta utca 1.";
  intake.property.type = "Lakás";
  intake.property.floorArea = "60";
  intake.owner.name = "Minta Tulajdonos";
  intake.owner.phone = "+361234567";
  intake.technical.heating = "Gázcirkó";
  intake.technical.condition = "Jó";
  intake.sale.expectedPriceM = "42.5";
  intake.sale.priority = "Piaci ár + ésszerű idő";
  intake.rooms = [createRoom()];
  intake.notes = "Rögzített helyszíni jegyzet.";
  assert.equal(calculateIntakeProgress(intake), 100);
});
