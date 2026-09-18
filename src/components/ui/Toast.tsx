import type {
  Toast,
} from "@/types/toast";

type ToastProps = {
  toast: Toast;

  onClose: (
    id: string
  ) => void;
};

export default function Toast({
  toast,
  onClose,
}: ToastProps) {
  return (
    <div
      className={`flex items-start justify-between gap-4 rounded-xl border p-4 shadow-lg transition-all ${
        getToastStyles(
          toast.type
        )
      }`}
    >
      <div className="flex gap-3">
        <div className="text-xl">
          {getToastIcon(
            toast.type
          )}
        </div>

        <div>
          <h3 className="font-semibold">
            {toast.title}
          </h3>

          {toast.description && (
            <p className="mt-1 text-sm opacity-80">
              {toast.description}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          onClose(toast.id)
        }
        className="text-lg opacity-60 transition hover:opacity-100"
        aria-label="Bezárás"
      >
        ✕
      </button>
    </div>
  );
}

function getToastIcon(
  type: Toast["type"]
) {
  switch (type) {
    case "success":
      return "✅";

    case "error":
      return "❌";

    case "warning":
      return "⚠️";

    case "info":
      return "ℹ️";

    default:
      return "📌";
  }
}

function getToastStyles(
  type: Toast["type"]
) {
  switch (type) {
    case "success":
      return "border-green-200 bg-green-50 text-green-900";

    case "error":
      return "border-red-200 bg-red-50 text-red-900";

    case "warning":
      return "border-yellow-200 bg-yellow-50 text-yellow-900";

    case "info":
      return "border-blue-200 bg-blue-50 text-blue-900";

    default:
      return "border-slate-200 bg-white text-slate-900";
  }
}