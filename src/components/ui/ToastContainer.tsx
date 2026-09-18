import Toast from "@/components/ui/Toast";

import type {
  Toast as ToastItem,
} from "@/types/toast";

type ToastContainerProps = {
  toasts: ToastItem[];

  onClose: (
    id: string
  ) => void;
};

export default function ToastContainer({
  toasts,
  onClose,
}: ToastContainerProps) {
  if (!toasts.length) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-6 top-6 z-50 flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto"
        >
          <Toast
            toast={toast}
            onClose={onClose}
          />
        </div>
      ))}
    </div>
  );
}