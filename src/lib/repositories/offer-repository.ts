import { supabase } from "@/lib/supabase";

import type {
  Offer,
  OfferWithCase,
  CreateOfferInput,
  UpdateOfferInput,
} from "@/types/offer";

/**
 * Offer Repository.
 */
export class OfferRepository {
  /**
   * Összes ajánlat.
   */
  async getAll(): Promise<Offer[]> {
    const { data, error } =
      await supabase
        .from("offers")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      throw error;
    }

    return (data ?? []) as Offer[];
  }

  /**
   * Összes ajánlat ügy adatokkal.
   */
  async getAllWithCase(): Promise<
    OfferWithCase[]
  > {
    const { data, error } =
      await supabase
        .from("offers")
        .select(`
          *,
          case:cases(
            *,
            clients(*),
            properties(*)
          )
        `)
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      throw error;
    }

    return (data ?? []) as OfferWithCase[];
  }

  /**
   * Ajánlat lekérése.
   */
  async getById(
    id: string
  ): Promise<Offer> {
    const { data, error } =
      await supabase
        .from("offers")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
      throw error;
    }

    return data as Offer;
  }

  /**
   * Ügy ajánlatai.
   */
  async getByCase(
    caseId: string
  ): Promise<Offer[]> {
    const { data, error } =
      await supabase
        .from("offers")
        .select("*")
        .eq("case_id", caseId)
        .order("version", {
          ascending: false,
        });

    if (error) {
      throw error;
    }

    return (data ?? []) as Offer[];
  }

  /**
   * Ajánlat ügy adatokkal.
   */
  async getWithCase(
    id: string
  ): Promise<OfferWithCase> {
    const { data, error } =
      await supabase
        .from("offers")
        .select(`
          *,
          case:cases(
            *,
            clients(*),
            properties(*)
          )
        `)
        .eq("id", id)
        .single();

    if (error) {
      throw error;
    }

    return data as OfferWithCase;
  }

  /**
   * Új ajánlat.
   */
  async create(
    input: CreateOfferInput
  ): Promise<Offer> {
    const { data, error } =
      await supabase
        .from("offers")
        .insert(input)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data as Offer;
  }

  /**
   * Ajánlat módosítása.
   */
  async update(
    id: string,
    input: UpdateOfferInput
  ): Promise<Offer> {
    const { data, error } =
      await supabase
        .from("offers")
        .update({
          ...input,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return data as Offer;
  }

  /**
   * Ajánlat törlése.
   */
  async delete(
    id: string
  ): Promise<void> {
    const { error } =
      await supabase
        .from("offers")
        .delete()
        .eq("id", id);

    if (error) {
      throw error;
    }
  }

  /**
   * Ajánlat elküldve.
   */
  async markSent(
    id: string
  ): Promise<Offer> {
    return this.update(id, {
      status: "sent",
      sent_at:
        new Date().toISOString(),
    });
  }

  /**
   * Ajánlat elfogadva.
   */
  async markAccepted(
    id: string
  ): Promise<Offer> {
    return this.update(id, {
      status: "accepted",
      accepted_at:
        new Date().toISOString(),
    });
  }

  /**
   * Ajánlat elutasítva.
   */
  async markRejected(
    id: string
  ): Promise<Offer> {
    return this.update(id, {
      status: "rejected",
      rejected_at:
        new Date().toISOString(),
    });
  }

  /**
   * Lejárt ajánlat.
   */
  async markExpired(
    id: string
  ): Promise<Offer> {
    return this.update(id, {
      status: "expired",
    });
  }

  /**
   * Következő ajánlat verzió.
   */
  async getNextVersion(
    caseId: string
  ): Promise<number> {
    const { data, error } =
      await supabase
        .from("offers")
        .select("version")
        .eq("case_id", caseId)
        .order("version", {
          ascending: false,
        })
        .limit(1)
        .maybeSingle();

    if (error) {
      throw error;
    }

    return (data?.version ?? 0) + 1;
  }

  /**
   * Ajánlatok száma.
   */
  async getCount(): Promise<number> {
    const {
      count,
      error,
    } = await supabase
      .from("offers")
      .select("*", {
        count: "exact",
        head: true,
      });

    if (error) {
      throw error;
    }

    return count ?? 0;
  }

  /**
   * Függő ajánlatok száma.
   */
  async getPendingCount(): Promise<number> {
    const {
      count,
      error,
    } = await supabase
      .from("offers")
      .select("*", {
        count: "exact",
        head: true,
      })
      .in("status", [
        "draft",
        "sent",
      ]);

    if (error) {
      throw error;
    }

    return count ?? 0;
  }
}

/**
 * Singleton.
 */
export const offerRepository =
  new OfferRepository();