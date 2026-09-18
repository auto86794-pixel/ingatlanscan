import {
  Download,
  File,
  Trash2,
} from "lucide-react";

import Button from "@/components/ui/Button";

type FileCardProps = {
  title: string;

  subtitle?: string;

  meta?: string;

  icon?: React.ReactNode;

  onDownload?: () => void;

  onDelete?: () => void;

  deleting?: boolean;
};

/**
 * Általános fájlkártya.
 */
export default function FileCard({
  title,
  subtitle,
  meta,
  icon,
  onDownload,
  onDelete,
  deleting = false,
}: FileCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon ?? (
            <File className="h-6 w-6" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-slate-900">
            {title}
          </h3>

          {subtitle && (
            <p className="mt-1 truncate text-sm text-slate-500">
              {subtitle}
            </p>
          )}

          {meta && (
            <p className="mt-2 text-xs text-slate-400">
              {meta}
            </p>
          )}
        </div>
      </div>

      {(onDownload || onDelete) && (
        <div className="flex shrink-0 gap-2">
          {onDownload && (
            <Button
              type="button"
              variant="outline"
              onClick={onDownload}
            >
              <Download className="mr-2 h-4 w-4" />
              Letöltés
            </Button>
          )}

          {onDelete && (
            <Button
              type="button"
              variant="danger"
              onClick={onDelete}
              disabled={deleting}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {deleting
                ? "Törlés..."
                : "Törlés"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}