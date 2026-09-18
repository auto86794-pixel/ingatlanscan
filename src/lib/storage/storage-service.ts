import { supabase } from "@/lib/supabase";

/**
 * Feltöltés bemenete.
 */
export type UploadFileInput = {
  /**
   * Bucket neve.
   */
  bucket: string;

  /**
   * Storage útvonal.
   */
  path: string;

  /**
   * Feltöltendő fájl.
   */
  file: File | Blob;

  /**
   * Felülírás engedélyezése.
   */
  upsert?: boolean;
};

/**
 * Storage Service.
 *
 * A Supabase Storage közös
 * kezelőrétege.
 */
export class StorageService {
  /**
   * Fájl feltöltése.
   */
  async upload({
    bucket,
    path,
    file,
    upsert = false,
  }: UploadFileInput): Promise<string> {
    const { error } =
      await supabase.storage
        .from(bucket)
        .upload(path, file, {
          upsert,
        });

    if (error) {
      throw error;
    }

    return this.getPublicUrl(
      bucket,
      path
    );
  }

  /**
   * Nyilvános URL lekérése.
   */
  getPublicUrl(
    bucket: string,
    path: string
  ): string {
    const { data } =
      supabase.storage
        .from(bucket)
        .getPublicUrl(path);

    return data.publicUrl;
  }

  /**
   * Fájl törlése.
   */
  async delete(
    bucket: string,
    path: string
  ): Promise<void> {
    const { error } =
      await supabase.storage
        .from(bucket)
        .remove([path]);

    if (error) {
      throw error;
    }
  }

  /**
   * Fájl áthelyezése.
   */
  async move(
    bucket: string,
    from: string,
    to: string
  ): Promise<void> {
    const { error } =
      await supabase.storage
        .from(bucket)
        .move(from, to);

    if (error) {
      throw error;
    }
  }

  /**
   * Fájl másolása.
   */
  async copy(
    bucket: string,
    from: string,
    to: string
  ): Promise<void> {
    const { error } =
      await supabase.storage
        .from(bucket)
        .copy(from, to);

    if (error) {
      throw error;
    }
  }

  /**
   * Signed URL.
   *
   * Privát bucketekhez.
   */
  async createSignedUrl(
    bucket: string,
    path: string,
    expiresIn = 60 * 60
  ): Promise<string> {
    const { data, error } =
      await supabase.storage
        .from(bucket)
        .createSignedUrl(
          path,
          expiresIn
        );

    if (error) {
      throw error;
    }

    return data.signedUrl;
  }
}

/**
 * Singleton.
 */
export const storageService =
  new StorageService();