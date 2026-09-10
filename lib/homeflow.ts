import type { Intake } from "./model";
export function createHomeFlowPayload(i: Intake) {
  const p=i.property,t=i.technical,s=i.sale;
  return {
    format:"homeflow-property-import", version:2, source:"IngatlanScan", external_id:i.id, exported_at:new Date().toISOString(),
    property:{
      title:p.address||"Új ingatlan", status:"Eladó", property_type:p.type||null, city:p.city||null,
      district:p.district||null, postal_code:p.postalCode||null, address:p.address||null,
      price:s.expectedPriceM?Number(s.expectedPriceM)*1_000_000:null, area:p.floorArea?Number(p.floorArea):null,
      lot_area:p.lotArea?Number(p.lotArea):null, rooms:p.rooms?Number(p.rooms):null, half_rooms:p.halfRooms?Number(p.halfRooms):null,
      floor:p.floor||null, condition:t.condition||null, heating:t.heating||null, parking:p.parking||null,
      description:[
        `HRSZ: ${p.hrsz||"-"}`,`Építés éve: ${p.yearBuilt||"-"}`,`Szintek: ${p.buildingLevels||"-"}`,
        `Tájolás: ${p.orientation||"-"}`,`Erkély/terasz: ${p.balconyArea||"-"} m²`,`Lift: ${p.elevator||"-"}`,
        `Lakottság: ${p.occupancy||"-"}`,`Falazat: ${t.walls||"-"}`,`Szigetelés: ${t.insulation||"-"}`,
        `Tető: ${t.roof||"-"}`,`Nyílászárók: ${t.windows||"-"}`,`Melegvíz: ${t.hotWater||"-"}`,
        `Hűtés: ${t.cooling||"-"}`,`Közművek: ${t.utilities.join(", ")||"-"}`,`Energetika: ${t.energy||"-"}`,
        `Extrák: ${i.extras.join(", ")||"-"}`,`Előnyök: ${i.strengths.filter(Boolean).join("; ")||"-"}`,
        `Értékesítés oka: ${s.reason||"-"}`,`Birtokbaadás: ${s.possession||"-"}`,`Áralku: ${s.negotiation||"-"}`,
        `Megtekinthetőség: ${s.viewing||"-"}`,`Kulcs / bejutás: ${s.keyAccess||"-"}`,`Hirdetési készültség: ${s.marketingReadiness||"-"}`,`Helyiségek: ${i.rooms.map((r,idx)=>`${idx+1}. ${r.name||r.type}${r.area?` (${r.area} m²)`:""}${r.condition?` – ${r.condition}`:""}${r.flooring?` – ${r.flooring}`:""} – ${r.photoIds.length} fotó`).join("; ")||"-"}`,`Megjegyzés: ${i.notes||"-"}`
      ].join("\n"), is_active:true
    },
    owner:{name:i.owner.name||null,phone:i.owner.phone||null,email:i.owner.email||null,contact_preference:i.owner.contactPreference||null},
    intake:i
  };
}
