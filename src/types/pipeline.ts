import { Case } from "./case";

export const PIPELINE_COLUMNS = [
  "new",
  "contacted",
  "viewing",
  "offer",
  "contract",
  "sold",
] as const;

export type PipelineColumnId =
  (typeof PIPELINE_COLUMNS)[number];

export interface PipelineColumn {
  id: PipelineColumnId;

  title: string;

  color: string;
}

export interface PipelineCard {
  id: string;

  case: Case;

  clientName: string;

  propertyTitle?: string;

  price?: number | null;

  updatedAt?: string | null;
}

export const DEFAULT_PIPELINE_COLUMNS: PipelineColumn[] =
  [
    {
      id: "new",
      title: "Érdeklődő",
      color: "bg-slate-100",
    },
    {
      id: "contacted",
      title: "Kapcsolat",
      color: "bg-sky-100",
    },
    {
      id: "viewing",
      title: "Bemutatás",
      color: "bg-amber-100",
    },
    {
      id: "offer",
      title: "Ajánlat",
      color: "bg-violet-100",
    },
    {
      id: "contract",
      title: "Szerződés",
      color: "bg-emerald-100",
    },
    {
      id: "sold",
      title: "Eladva",
      color: "bg-green-200",
    },
  ];