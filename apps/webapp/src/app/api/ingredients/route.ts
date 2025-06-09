import { dbClient, InsertIngredient } from "@rono/db";
import { IngredientId, isIngredientId } from "@rono/types";
import { z } from "zod";

export async function GET() {
  const ingredients = await dbClient.cooking.getAllIngredients();

  return Response.json({ ingredients });
}

export const createIngredientSchema: z.ZodType<InsertIngredient> = z.object({
  name: z.string(),
  categoryId: z.custom<IngredientId>(isIngredientId),
});

export async function POST(request: Request) {
  const json = await request.json();

  const parseResult = createIngredientSchema.safeParse(json);

  if (!parseResult.success) {
    return new Response(JSON.stringify({ error: parseResult.error.format() }), {
      status: 400,
    });
  }

  const { name, categoryId } = parseResult.data;
  console.log(name, categoryId);

  const id = await dbClient.cooking.insertIngredient({
    name,
    categoryId,
  });

  return Response.json({ id });
}
