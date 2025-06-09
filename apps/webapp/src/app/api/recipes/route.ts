import { dbClient, InsertRecipe } from "@rono/db";
import { isIngredientId, isSourceId, isUnitId } from "@rono/types";
import { z } from "zod";

const insertRecipeIngredientSchema = z.object({
  quantity: z.number(),
  unitId: z.custom(isUnitId),
  rawText: z.string(),
  preparation: z.string().optional(),
  quantifier: z.string().optional(),
  ingredientId: z.custom(isIngredientId),
});

const insertRecipePartSchema = z.object({
  description: z.string(),
  ingredients: z.array(insertRecipeIngredientSchema),
});

const createRecipeSchema: z.ZodType<InsertRecipe> = z.object({
  name: z.string(),
  nativeName: z.string().optional(),
  description: z.string().optional(),
  sourceId: z.custom(isSourceId),
  parts: z.array(insertRecipePartSchema),
});

export const POST = async (request: Request) => {
  const json = await request.json();

  const parseResult = createRecipeSchema.safeParse(json);

  if (!parseResult.success) {
    return new Response(JSON.stringify({ error: parseResult.error.format() }), {
      status: 400,
    });
  }

  const id = await dbClient.cooking.insertRecipe(parseResult.data);

  return Response.json({ id });
};
