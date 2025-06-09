import { FormIngredient } from "../../types";

export interface ParsedPart {
  parts: {
    part: string;
    ingredients: FormIngredient[];
  }[];
}
