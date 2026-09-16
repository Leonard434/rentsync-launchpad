import { Home, DoorOpen, BedSingle, BedDouble, Building2 } from "lucide-react";

// Falls back to when a listing has no photo yet — shows a shape that hints
// at the actual unit type (bedsitter vs. single room vs. 1BR, etc.) instead
// of a generic house icon, so the type is legible even without a real photo.
export function unitTypeIcon(unitType: string | null | undefined) {
  const t = (unitType || "").toLowerCase();
  if (t.includes("single")) return DoorOpen;
  if (t.includes("bedsitter") || t.includes("studio")) return BedSingle;
  if (t.includes("1 bed") || t.includes("one bed")) return BedDouble;
  if (t.includes("bed") || t.includes("apartment") || t.includes("flat")) return Building2;
  return Home;
}

export default function UnitTypeIcon({
  unitType,
  className = "h-12 w-12",
}: {
  unitType: string | null | undefined;
  className?: string;
}) {
  const Icon = unitTypeIcon(unitType);
  return <Icon className={className} />;
}
