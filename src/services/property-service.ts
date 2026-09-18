import {
  propertyRepository,
  type PropertyFilters,
} from "@/lib/repositories/property-repository";

import type {
  CreatePropertyInput,
  UpdatePropertyInput,
} from "@/types/property";

export const propertyService = {
  async getProperties(
    filters?: PropertyFilters
  ) {
    return propertyRepository.getAll(filters);
  },

  async getProperty(
    id: string
  ) {
    return propertyRepository.getById(id);
  },

  async getPropertyWithOwner(
    id: string
  ) {
    return propertyRepository.getWithOwner(id);
  },

  async createProperty(
    input: CreatePropertyInput
  ) {
    return propertyRepository.create(input);
  },

  async updateProperty(
    id: string,
    input: UpdatePropertyInput
  ) {
    return propertyRepository.update(
      id,
      input
    );
  },

  async deleteProperty(
    id: string
  ) {
    return propertyRepository.delete(id);
  },
};