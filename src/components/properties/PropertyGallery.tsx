import Image from "next/image";

import PropertyImageCard from "@/components/properties/PropertyImageCard";

import type {
  PropertyImage,
} from "@/types/property-image";

type PropertyGalleryProps = {
  images: PropertyImage[];
};

/**
 * Property Gallery.
 *
 * Maximum 3 kép jelenik meg.
 */
export default function PropertyGallery({
  images,
}: PropertyGalleryProps) {
  if (images.length === 0) {
    return (
      <div className="flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
        <div className="text-center">
          <div className="text-5xl">
            📷
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Ehhez az ingatlanhoz még
            nincs feltöltött kép.
          </p>
        </div>
      </div>
    );
  }

  const displayImages =
    images.slice(0, 3);

  const mainImage =
    displayImages.find(
      (image) =>
        image.is_cover
    ) ?? displayImages[0];

  const secondaryImages =
    displayImages.filter(
      (image) =>
        image.id !==
        mainImage.id
    );

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border bg-white">
        <Image
          src={mainImage.url}
          alt={
            mainImage.file_name ??
            "Ingatlan kép"
          }
          width={1200}
          height={800}
          className="h-80 w-full object-cover"
          priority
        />
      </div>

      {secondaryImages.length >
        0 && (
        <div className="grid grid-cols-2 gap-4">
          {secondaryImages.map(
            (image) => (
              <PropertyImageCard
                key={image.id}
                image={image}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}