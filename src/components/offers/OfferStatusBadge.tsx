import type {
  OfferStatus,
} from "@/types/offer";

type OfferStatusBadgeProps = {
  status: OfferStatus;
};

const STATUS_MAP: Record<
  OfferStatus,
  {
    label: string;
    className: string;
  }
> = {
  draft: {
    label: "Piszkozat",
    className:
      "bg-yellow-100 text-yellow-800",
  },

  sent: {
    label: "Elküldve",
    className:
      "bg-blue-100 text-blue-800",
  },

  accepted: {
    label: "Elfogadva",
    className:
      "bg-green-100 text-green-800",
  },

  rejected: {
    label: "Elutasítva",
    className:
      "bg-red-100 text-red-800",
  },

  expired: {
    label: "Lejárt",
    className:
      "bg-slate-200 text-slate-700",
  },
};

export default function OfferStatusBadge({
  status,
}: OfferStatusBadgeProps) {
  const item =
    STATUS_MAP[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${item.className}`}
    >
      {item.label}
    </span>
  );
}