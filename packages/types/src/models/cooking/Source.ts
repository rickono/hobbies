import { SourceId } from "../../nominal";

export interface Source {
  id: SourceId;
  name: string;
  author?: string;
  url?: string;
}
