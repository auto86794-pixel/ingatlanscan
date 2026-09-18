import {
  caseRepository,
  type CaseFilters,
} from "@/lib/repositories/case-repository";

export class CaseService {
  /**
   * Ügyek lekérdezése opcionális szűrőkkel.
   */
  async getCases(
    filters?: CaseFilters
  ) {
    return caseRepository.getAll(
      filters
    );
  }

  /**
   * Legutóbbi ügyek.
   */
  async getRecentCases(
    limit = 5
  ) {
    return caseRepository.getRecent(
      limit
    );
  }

  /**
   * Egy ügy részletei.
   */
  async getCase(
    id: string
  ) {
    return caseRepository.getWithClient(
      id
    );
  }

  /**
   * Aktív ügyek száma.
   */
  async getActiveCaseCount() {
    return caseRepository.getCount();
  }

  /**
   * Új ügy létrehozása.
   */
  async createCase(
    input: Parameters<
      typeof caseRepository.create
    >[0]
  ) {
    return caseRepository.create(input);
  }

  /**
   * Ügy módosítása.
   */
  async updateCase(
    id: string,
    input: Parameters<
      typeof caseRepository.update
    >[1]
  ) {
    return caseRepository.update(
      id,
      input
    );
  }

  /**
   * Ügy törlése.
   */
  async deleteCase(
    id: string
  ) {
    return caseRepository.delete(id);
  }
}

export const caseService =
  new CaseService();