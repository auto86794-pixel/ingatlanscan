import PropertyDocumentCard from "@/components/properties/PropertyDocumentCard";

import type {
  PropertyDocument,
} from "@/types/property-document";

type PropertyDocumentListProps = {
  propertyId: string;

  documents: PropertyDocument[];
};

/**
 * Property Document List.
 */
export default function PropertyDocumentList({
  propertyId,
  documents,
}: PropertyDocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
        Ehhez az ingatlanhoz még nincs
        feltöltött dokumentum.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map(
        (document) => (
          <PropertyDocumentCard
            key={document.id}
            propertyId={propertyId}
            document={document}
          />
        )
      )}
    </div>
  );
}