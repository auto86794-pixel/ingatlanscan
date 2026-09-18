import {
  clientRepository,
  type ClientFilters,
} from "@/lib/repositories/client-repository";

import type {
  Client,
  ClientWithCases,
  CreateClientInput,
  UpdateClientInput,
} from "@/types/client";

class ClientService {
  /**
   * Összes ügyfél.
   */
  async getClients(
    filters?: ClientFilters
  ): Promise<Client[]> {
    return clientRepository.getAll(filters);
  }

  /**
   * Egy ügyfél.
   */
  async getClient(
    id: string
  ): Promise<Client> {
    return clientRepository.getById(id);
  }

  /**
   * Ügyfél ügyekkel.
   */
  async getClientWithCases(
    id: string
  ): Promise<ClientWithCases> {
    return clientRepository.getWithCases(id);
  }

  /**
   * Új ügyfél.
   */
  async createClient(
    input: CreateClientInput
  ): Promise<Client> {
    return clientRepository.create(input);
  }

  /**
   * Ügyfél módosítása.
   */
  async updateClient(
    id: string,
    input: UpdateClientInput
  ): Promise<Client> {
    return clientRepository.update(id, input);
  }

  /**
   * Ügyfél törlése.
   */
  async deleteClient(
    id: string
  ): Promise<void> {
    return clientRepository.delete(id);
  }
}

/**
 * Singleton.
 */
export const clientService =
  new ClientService();