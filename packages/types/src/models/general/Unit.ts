import { UnitId } from "../../nominal";

export interface Unit {
  id: UnitId;
  name: string;
  abbreviation?: string;
  type?: "volume" | "weight";
}
