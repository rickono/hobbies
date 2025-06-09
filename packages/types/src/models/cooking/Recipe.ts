import { RecipeId } from "../../nominal";
import { RecipePart } from "./RecipePart";
import { Source } from "./Source";

export interface Recipe {
  id: RecipeId;
  name: string;
  englishName?: string;
  description?: string;
  source?: Source;
  parts: RecipePart[];
}
