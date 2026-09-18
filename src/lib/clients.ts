import {
  clientRepository,
} from "@/lib/repositories/client-repository";

import { createTimelineEvent } from "@/lib/timeline";

import type {
  Client,
  ClientWithCases,
  CreateClientInput,
  UpdateClientInput,
} from "@/types/client";

/**
 * Régi API kompatibilitási wrapper.
 */

export async function createClient(
  data: CreateClientInput
): Promise<Client> {
  const client =
    await clientRepository.create(data);

  await createTimelineEvent({
    client_id: client.id,

    type: "client_created",

    title: "Új ügyfél létrehozva",

    description:
      `${client.first_name} ${client.last_name}`,
  });

  return client;
}

export async function getClients(): Promise<
  Client[]
> {
  return clientRepository.getAll();
}

export async function getClient(
  id: string
): Promise<Client> {
  return clientRepository.getById(
    id
  );
}

export async function getClientWithCases(
  id: string
): Promise<ClientWithCases> {
  return clientRepository.getWithCases(
    id
  );
}

export async function updateClient(
  id: string,
  data: UpdateClientInput
): Promise<Client> {
  return clientRepository.update(
    id,
    data
  );
}

export async function deleteClient(
  id: string
): Promise<void> {
  return clientRepository.delete(
    id
  );
}