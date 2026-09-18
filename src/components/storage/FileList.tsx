import FileCard from "@/components/storage/FileCard";

type FileListItem = {
  id: string;
  title: string;
  subtitle?: string;
};

type FileListProps = {
  items: FileListItem[];

  onDownload?: (
    item: FileListItem
  ) => void;

  onDelete?: (
    item: FileListItem
  ) => void;

  deletingId?: string | null;

  emptyMessage?: string;
};

/**
 * Általános fájllista.
 */
export default function FileList({
  items,
  onDownload,
  onDelete,
  deletingId = null,
  emptyMessage =
    "Még nincs feltöltött fájl.",
}: FileListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <FileCard
          key={item.id}
          title={item.title}
          subtitle={item.subtitle}
          onDownload={
            onDownload
              ? () =>
                  onDownload(item)
              : undefined
          }
          onDelete={
            onDelete
              ? () =>
                  onDelete(item)
              : undefined
          }
          deleting={
            deletingId === item.id
          }
        />
      ))}
    </div>
  );
}