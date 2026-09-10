export const SCHEMA_VERSION = 6 as const;

export type Room = {
  id: string;
  type: string;
  name: string;
  length: string;
  width: string;
  area: string;
  condition: string;
  flooring: string;
  orientation: string;
  features: string[];
  notes: string;
  photoIds: string[];
};

export type Intake = {
  id: string;
  schemaVersion: typeof SCHEMA_VERSION;
  status: "draft" | "ready" | "synced" | "error";
  createdAt: string;
  updatedAt: string;
  syncedAt: string | null;
  property: {
    address: string;
    type: string;
    city: string;
    postalCode: string;
    district: string;
    hrsz: string;
    lotArea: string;
    floorArea: string;
    yearBuilt: string;
    rooms: string;
    halfRooms: string;
    floor: string;
    buildingLevels: string;
    orientation: string;
    balconyArea: string;
    elevator: string;
    parking: string;
    occupancy: string;
  };
  owner: {
    name: string;
    phone: string;
    email: string;
    contactPreference: string;
  };
  technical: {
    walls: string;
    insulation: string;
    roof: string;
    windows: string;
    heating: string;
    hotWater: string;
    cooling: string;
    energy: string;
    utilities: string[];
    condition: string;
    details: string;
  };
  sale: {
    expectedPriceM: string;
    priority: string;
    desiredDate: string;
    reason: string;
    possession: string;
    financing: string;
    negotiation: string;
    viewing: string;
    keyAccess: string;
    marketingReadiness: string;
  };
  rooms: Room[];
  documents: {
    titleDeed: boolean;
    floorPlan: boolean;
    energyCertificate: boolean;
    utilityBills: boolean;
    meterPhotos: boolean;
    keysReceived: boolean;
    otherDocuments: boolean;
    notes: string;
  };
  extras: string[];
  strengths: [string, string, string];
  notes: string;
};

export function createRoom(type = "Nappali"): Room {
  return {
    id: crypto.randomUUID(),
    type,
    name: "",
    length: "",
    width: "",
    area: "",
    condition: "",
    flooring: "",
    orientation: "",
    features: [],
    notes: "",
    photoIds: []
  };
}

export function createIntake(): Intake {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    schemaVersion: SCHEMA_VERSION,
    status: "draft",
    createdAt: now,
    updatedAt: now,
    syncedAt: null,
    property: {
      address: "", type: "", city: "Debrecen", postalCode: "", district: "", hrsz: "",
      lotArea: "", floorArea: "", yearBuilt: "", rooms: "", halfRooms: "", floor: "",
      buildingLevels: "", orientation: "", balconyArea: "", elevator: "", parking: "", occupancy: ""
    },
    owner: { name: "", phone: "", email: "", contactPreference: "Telefon" },
    technical: {
      walls: "", insulation: "", roof: "", windows: "", heating: "", hotWater: "", cooling: "",
      energy: "", utilities: [], condition: "", details: ""
    },
    sale: {
      expectedPriceM: "", priority: "", desiredDate: "", reason: "", possession: "", financing: "",
      negotiation: "", viewing: "", keyAccess: "", marketingReadiness: ""
    },
    rooms: [],
    documents: {
      titleDeed: false, floorPlan: false, energyCertificate: false, utilityBills: false,
      meterPhotos: false, keysReceived: false, otherDocuments: false, notes: ""
    },
    extras: [],
    strengths: ["", "", ""],
    notes: ""
  };
}

export function normalizeIntake(value: unknown): Intake {
  const base = createIntake();
  if (!value || typeof value !== "object") return base;
  const old = value as Partial<Intake> & { property?: Record<string, unknown>; owner?: Record<string, unknown>; technical?: Record<string, unknown>; sale?: Record<string, unknown> };
  const rooms = Array.isArray(old.rooms) ? old.rooms.map(room => ({ ...createRoom(), ...room, id: room?.id || crypto.randomUUID(), features: Array.isArray(room?.features) ? room.features : [], photoIds: Array.isArray(room?.photoIds) ? room.photoIds : [] })) : [];
  return {
    ...base,
    ...old,
    schemaVersion: SCHEMA_VERSION,
    property: { ...base.property, ...(old.property || {}) },
    owner: { ...base.owner, ...(old.owner || {}) },
    technical: { ...base.technical, ...(old.technical || {}), utilities: Array.isArray(old.technical?.utilities) ? old.technical.utilities as string[] : [] },
    sale: { ...base.sale, ...(old.sale || {}) },
    rooms,
    documents: { ...base.documents, ...((old as Partial<Intake>).documents || {}) },
    extras: Array.isArray(old.extras) ? old.extras : [],
    strengths: Array.isArray(old.strengths) ? [String(old.strengths[0] || ""), String(old.strengths[1] || ""), String(old.strengths[2] || "")] : base.strengths,
    notes: typeof old.notes === "string" ? old.notes : ""
  };
}
