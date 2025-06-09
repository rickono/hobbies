import { SourceId } from "@rono/types";
import { InsertRecipePart } from "./InsertRecipePart";

export interface InsertRecipe {
  name: string;
  nativeName?: string;
  description?: string;
  sourceId?: SourceId;
  parts?: Omit<InsertRecipePart, "recipeId">[];
}
