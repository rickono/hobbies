import {
  CoffeeBeanId,
  FarmId,
  LocationId,
  ProcessId,
  ProducerId,
  RoasterId,
  VarietalId,
} from "../nominal";
import { Location } from "./location";

export interface Roaster {
  id: RoasterId;
  name: string;
  locationId: LocationId;
  location?: Location;
}

export interface Producer {
  id: ProducerId;
  name: string;
}

export interface Farm {
  id: FarmId;
  name: string;
  locationId: LocationId;
  location?: Location;
}

export interface Varietal {
  id: VarietalId;
  name: string;
}

export interface Process {
  id: ProcessId;
  name: string;
}

export interface CoffeeBean {
  id: CoffeeBeanId;
  altitude?: number;
  roastDate?: Date;
  tastingNotes?: string;
  roasterId?: RoasterId;
  producerId?: ProducerId;
  farmId?: FarmId;
  varietalId?: VarietalId;
  processId?: ProcessId;
  roaster?: Roaster;
  producer?: Producer;
  farm?: Farm;
  varietal?: Varietal;
  process?: Process;
}
