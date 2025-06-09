import { RecipeId } from "../nominal";

interface RecipeIngredient {
  id: number;
  name: string;
  quantity: string;
  unit?: string;
}

interface RecipePart {
  id: number;
  description: string;
  ingredients: RecipeIngredient[];
}

interface Source {
  id: number;
  name: string;
  description?: string;
  url?: string;
  author?: string;
}

export interface Recipe {
  id: RecipeId;
  name: string;
  parts: RecipePart[];
  source: Source;
}

const nixtamal: Recipe = {
  id: RecipeId(1),
  name: "Nixtamal",
  source: {
    id: 1,
    name: "Tu Casa Mi Casa",
    author: "Enrique Olvera",
  },
  parts: [
    {
      id: 1,
      description: "For the nixtamal",
      ingredients: [
        { id: 1, name: "Dried corn", quantity: "1", unit: "pound" },
        {
          id: 2,
          name: "Calcium hydroxide (lime)",
          quantity: "1",
          unit: "tablespoon",
        },
        { id: 3, name: "Water", quantity: "8", unit: "cups" },
      ],
    },
  ],
};
