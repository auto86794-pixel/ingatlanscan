import {
  propertyRepository,
} from "@/lib/repositories/property-repository";

import type {
  Property,
  PropertyWithOwner,
  CreatePropertyInput,
  UpdatePropertyInput,
} from "@/types/property";

/**
 * Régi API kompatibilitási wrapper.
 */

export async function createProperty(
  data: CreatePropertyInput
): Promise<Property> {
  return propertyRepository.create(
    data
  );
}

export async function getProperties(): Promise<
  Property[]
> {
  return propertyRepository.getAll();
}

export async function getProperty(
  id: string
): Promise<Property> {
  return propertyRepository.getById(
    id
  );
}

export async function getPropertyWithOwner(
  id: string
): Promise<PropertyWithOwner> {
  return propertyRepository.getWithOwner(
    id
  );
}

export async function updateProperty(
  id: string,
  data: UpdatePropertyInput
): Promise<Property> {
  return propertyRepository.update(
    id,
    data
  );
}

export async function deleteProperty(
  id: string
): Promise<void> {
  return propertyRepository.delete(
    id
  );
}