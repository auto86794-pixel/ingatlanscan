"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  clientRepository,
} from "@/lib/repositories/client-repository";

export async function createClient(
  formData: FormData
) {
  const first_name =
    formData
      .get("first_name")
      ?.toString()
      .trim() ?? "";

  const last_name =
    formData
      .get("last_name")
      ?.toString()
      .trim() ?? "";

  const phone =
    formData
      .get("phone")
      ?.toString()
      .trim() || undefined;

  const email =
    formData
      .get("email")
      ?.toString()
      .trim() || undefined;

  const city =
    formData
      .get("city")
      ?.toString()
      .trim() || undefined;

  const status =
    formData
      .get("status")
      ?.toString()
      .trim() || undefined;

  const source =
    formData
      .get("source")
      ?.toString()
      .trim() || undefined;

  const property_type =
    formData
      .get("property_type")
      ?.toString()
      .trim() || undefined;

  const budgetMinValue =
    formData.get("budget_min")
      ?.toString()
      .trim();

  const budget_min =
    budgetMinValue
      ? Number(
          budgetMinValue
        )
      : undefined;

  const budgetMaxValue =
    formData.get("budget_max")
      ?.toString()
      .trim();

  const budget_max =
    budgetMaxValue
      ? Number(
          budgetMaxValue
        )
      : undefined;

  const notes =
    formData
      .get("notes")
      ?.toString()
      .trim() || undefined;

  if (
    !first_name ||
    !last_name
  ) {
    throw new Error(
      "A vezetéknév és keresztnév kötelező."
    );
  }

  const client =
    await clientRepository.create({
      first_name,
      last_name,
      phone,
      email,
      city,
      status,
      source,
      property_type,
      budget_min,
      budget_max,
      notes,
    });

  revalidatePath("/clients");

  redirect(
    `/clients/${client.id}`
  );
}